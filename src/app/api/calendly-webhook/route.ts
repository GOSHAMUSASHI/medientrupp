import { NextRequest, NextResponse } from "next/server";
import { CalendlyWebhookSchema } from "../../../lib/validations/calendly.schema";
import { CalendlyService } from "../../../lib/services/calendly.service";

/**
 * POST /api/calendly-webhook
 * Controller for handling incoming webhooks directly from Calendly.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify Calendly Webhook Signature
    // IMPORTANT: In production, verify the `Calendly-Webhook-Signature` header to ensure
    // the request actually came from Calendly.
    // const signature = req.headers.get("calendly-webhook-signature");
    // if (!verifySignature(signature, body, webhookSecret)) { return 401 }

    const body = await req.json();

    // 2. Validate payload shape against our schema
    const validationResult = CalendlyWebhookSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Log carefully - these are third party payloads. Schema might be too strict.
      console.warn(`[Calendly Webhook] Validation failed:`, validationResult.error);
      return NextResponse.json(
        { success: false, error: "Invalid webhook payload shape" },
        { status: 400 }
      );
    }

    // 3. Process via Service
    await CalendlyService.processWebhookEvent(validationResult.data);

    // 4. Return success quickly (Webhooks expect fast 2xx responses)
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error(`[POST /api/calendly-webhook] Unhandled Error:`, error);
    
    // Always return 500 so Calendly knows to retry if something genuinely crashed
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
