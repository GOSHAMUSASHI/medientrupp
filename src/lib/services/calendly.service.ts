import { TCalendlyWebhook } from "../validations/calendly.schema";

/**
 * Calendly Service
 * 
 * Handles incoming Calendly webhooks and processes the booking events.
 */
export class CalendlyService {
  
  /**
   * Main processor for incoming webhooks.
   * Dispatches to specific handlers based on the event type.
   * @param payload Validated calendly webhook payload
   */
  static async processWebhookEvent(payload: TCalendlyWebhook): Promise<void> {
    console.log(`[CalendlyService] Processing webhook event: ${payload.event}`);
    
    switch (payload.event) {
      case "invitee.created":
        await this.handleInviteeCreated(payload.payload);
        break;
      case "invitee.canceled":
        await this.handleInviteeCanceled(payload.payload);
        break;
      default:
        console.log(`[CalendlyService] Unhandled event type: ${payload.event}. Ignoring.`);
    }
  }

  /**
   * Action when a new booking is created.
   * e.g., Update CMS, notify team, match with existing lead.
   */
  private static async handleInviteeCreated(data: any): Promise<void> {
    const { email, name, event } = data;
    console.log(`[CalendlyService] NEW BOOKING: ${name} (${email}) for event ${event}`);
    
    // Stub implementation
    // - Check if lead exists in Google Sheets or DB by email
    // - If exists: update status to 'Call Booked'
    // - Notify Slack / Email team
  }

  /**
   * Action when a booking is canceled.
   */
  private static async handleInviteeCanceled(data: any): Promise<void> {
    const { email, name } = data;
    console.log(`[CalendlyService] BOOKING CANCELED: ${name} (${email})`);
    
    // Stub implementation
    // - Revert status in CRM / Google Sheets
    // - Notify team
  }
}
