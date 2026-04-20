import { NextRequest, NextResponse } from "next/server";
import { LeadFormSchema } from "../../../lib/validations/lead.schema";
import { LeadService } from "../../../lib/services/lead.service";

// ==========================================
// IN-MEMORY PROTECTION LAYERS
// ==========================================

// Rate Limiting Cache: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

// Deduplication Cache: Hash -> ExpiryTimestamp
const dedupeCache = new Map<string, number>();
const DEDUPE_WINDOW_MS = 5000; // 5 seconds

/**
 * Sweeps stale entries from memory to prevent leaks
 */
function cleanupCaches() {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetAt) rateLimitMap.delete(ip);
  }
  for (const [hash, expiry] of dedupeCache.entries()) {
    if (now > expiry) dedupeCache.delete(hash);
  }
}

/**
 * POST /api/submit-lead
 * Controller for handling incoming lead submissions.
 */
export async function POST(req: NextRequest) {
  try {
    cleanupCaches();

    // ----------------------------------------
    // LAYER 1: RATE LIMITING (IP BASED)
    // ----------------------------------------
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";
    const now = Date.now();

    let rateData = rateLimitMap.get(ip);
    if (!rateData || now > rateData.resetAt) {
      rateData = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    }

    rateData.count += 1;
    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      console.warn(`[Protection] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Parse Body
    const body = await req.json();

    // ----------------------------------------
    // LAYER 2: DEDUPLICATION (IDEMPOTENCY)
    // ----------------------------------------
    // Generate a hash based on email + phone + timestamp (rounded to nearest 10 seconds)
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const timeBucket = Math.floor(now / 10000); // 10 second buckets

    const dedupeHash = `${email}|${phone}|${timeBucket}`;

    if (dedupeCache.has(dedupeHash)) {
      console.warn(`[Protection] Deduplicated identical submission from: ${email}`);
      return NextResponse.json(
        { success: false, error: "Duplicate submission detected. Please wait." },
        { status: 409 }
      );
    }

    // Lock the hash for the next 5 seconds
    dedupeCache.set(dedupeHash, now + DEDUPE_WINDOW_MS);


    // ----------------------------------------
    // LAYER 3: PAYLOAD & BOT VALIDATION
    // ----------------------------------------
    const validationResult = LeadFormSchema.safeParse(body);

    if (!validationResult.success) {
      // Map Zod errors for frontend consumption
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message
      }));

      return NextResponse.json(
        { success: false, error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Note: The schema enforces presence of captchaToken.
    // Future Turnstile API validation goes here:
    // const isCaptchaValid = await verifyTurnstile(validationResult.data.captchaToken);
    // if (!isCaptchaValid) return 400;

    // ----------------------------------------
    // LAYER 4: BUSINESS LOGIC EXECUTION
    // ----------------------------------------
    const serviceResult = await LeadService.processNewLead(validationResult.data);

    if (!serviceResult.success) {
      return NextResponse.json(
        { success: false, error: serviceResult.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Lead submitted successfully." }, { status: 200 });

  } catch (error) {
    console.error(`[POST /api/submit-lead] Unhandled Error:`, error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
