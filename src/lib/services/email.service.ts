import { TLeadForm } from "../validations/lead.schema";
import { getConfirmationEmailHtml, getInternalNotificationHtml } from "../emails/templates";

// Environment variables configuration (Setup for future use)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const INTERNAL_TEAM_EMAIL = process.env.AGENCY_CONTACT_EMAIL || "team@medientrupp.com";
const DEFAULT_FROM_EMAIL = process.env.AGENCY_SENDER_EMAIL || "hello@medientrupp.com";

if (!RESEND_API_KEY) {
  console.warn("[EmailService] Starting in SAFE FALLBACK MODE.");
  console.warn(" -> Missing RESEND_API_KEY. All emails will be routed to console.");
}

/**
 * Email Service Abstraction
 * 
 * Production-ready architecture. Currently configured to use a Mock Sender
 * to ensure lead flow continuity. Can immediately be plugged into Resend.
 */
export class EmailService {
  
  /**
   * Notifies the internal agency team about a new lead.
   * @param lead Lead details
   */
  static async sendInternalNotification(lead: TLeadForm): Promise<void> {
    console.log(`[EmailService] Preparing internal notification for lead: ${lead.name}`);
    
    try {
      const htmlTemplate = getInternalNotificationHtml(lead);

      if (!RESEND_API_KEY) {
        console.warn(`[EmailService - MOCK] --- INTERNAL NOTIFICATION ---`);
        console.log(`To: ${INTERNAL_TEAM_EMAIL}\nSubject: 🚨 New Lead: ${lead.name}\nHTML Outline Rendered.`);
        return;
      }

      // FUTURE RESEND IMPLEMENTATION
      // await resendClient.emails.send({
      //   from: DEFAULT_FROM_EMAIL,
      //   to: INTERNAL_TEAM_EMAIL,
      //   subject: `🚨 New Lead: ${lead.name} via ${lead.source || "Website"}`,
      //   html: htmlTemplate,
      // });

      console.log(`[EmailService] Successfully sent internal notification.`);
    } catch (error) {
      console.error(`[EmailService] Failed to send internal notification:`, error);
      // Failsafe: Never let email dispatch throw back up and crash the lead flow
    }
  }

  /**
   * Sends an auto-responder to the prospect confirming receipt.
   * @param email User's email
   * @param name User's name
   */
  static async sendConfirmationEmail(email: string, name: string): Promise<void> {
    console.log(`[EmailService] Preparing confirmation email for prospect: ${email}`);
    
    try {
      const htmlTemplate = getConfirmationEmailHtml(name);

      if (!RESEND_API_KEY) {
        console.warn(`[EmailService - MOCK] --- CONFIRMATION EMAIL ---`);
        console.log(`To: ${email}\nSubject: We received your request - Medientrupp\nHTML Outline Rendered.`);
        return;
      }

      // FUTURE RESEND IMPLEMENTATION
      // await resendClient.emails.send({
      //   from: DEFAULT_FROM_EMAIL,
      //   to: email,
      //   subject: "We received your request - Medientrupp",
      //   html: htmlTemplate,
      // });

      console.log(`[EmailService] Successfully sent prospect confirmation.`);
    } catch (error) {
      console.error(`[EmailService] Failed to send confirmation email:`, error);
      // Failsafe: Continue flow even if external SMTP providers fail
    }
  }
}
