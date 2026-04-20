import { TLeadForm } from "../validations/lead.schema";
import { EmailService } from "./email.service";
import { SheetService } from "./sheet.service";

/**
 * Lead Service
 *
 * Orchestrates the processing of new leads.
 * Connects various actions (DB storage, Email notifications) into a cohesive workflow.
 */
export class LeadService {
  /**
   * Processes a new inbound lead.
   * @param lead Validated lead payload
   */
  static async processNewLead(lead: TLeadForm): Promise<{ success: boolean; message?: string }> {
    console.log(`[LeadService] Processing new lead from ${lead.email}`);

    try {
      // 0. Normalize input
      const normalizedLead: TLeadForm = {
        ...lead,
        name: lead.name.trim(),
        email: lead.email.toLowerCase().trim(),
        phone: lead.phone?.trim(),
        company: lead.company?.trim(),
        message: lead.message?.trim(),
      };

      // 1. Fire all integrations concurrently for maximum performance and reliability
      // Promise.allSettled ensures that if Sheets crashes, Emails still send, and vice versa.
      const [sheetResult, internalEmailResult, confirmationEmailResult, makeResult] =
        await Promise.allSettled([
          SheetService.appendLeadRow(normalizedLead),
          EmailService.sendInternalNotification(normalizedLead),
          EmailService.sendConfirmationEmail(normalizedLead.email, normalizedLead.name),
          LeadService.sendToMake(normalizedLead),
        ]);

      // 2. Log any critical silent failures
      if (sheetResult.status === "rejected") {
        console.error(
          `[LeadService - CRITICAL] SheetService threw an unhanded exception:`,
          sheetResult.reason
        );
      }
      if (makeResult.status === "rejected") {
        console.warn(`[LeadService] Make.com webhook failed (non-critical):`, makeResult.reason);
      }

      // As long as the lead entered the processing pipeline, we return success to the user
      // External service degradation (Sheets down, Resend down, Make down) should not throw a 500
      // because we have parallel redundancies in place.
      console.log(
        `[LeadService] Lead processing pipeline concluded for: ${normalizedLead.email}`
      );
      return { success: true };
    } catch (error) {
      console.error(`[LeadService] Error processing lead:`, error);

      // Depending on severity, you might want to report this to Sentry/LogRocket
      return {
        success: false,
        message: "An internal error occurred while processing the lead.",
      };
    }
  }

  /**
   * Forwards the lead payload to the Make.com webhook.
   * Fire-and-forget — failures are logged but never block the pipeline.
   */
  private static async sendToMake(lead: TLeadForm): Promise<void> {
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("[LeadService] MAKE_WEBHOOK_URL not set — skipping Make.com webhook.");
      return;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "medientrupp-contact-form",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Make webhook responded with status ${response.status}`);
    }

    console.log(`[LeadService] Make.com webhook triggered successfully.`);
  }
}
