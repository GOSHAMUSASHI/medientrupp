import { TLeadForm } from "../validations/lead.schema";

/**
 * Clean, minimal, premium HTML design for internal notifications
 */
export const getInternalNotificationHtml = (lead: TLeadForm): string => {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; background-color: #FAFAFA; color: #111;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <div style="background-color: #111; color: #FFF; padding: 24px 32px; text-align: left;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 500; letter-spacing: -0.5px;">New Inbound Lead</h2>
        </div>
        <div style="padding: 32px; text-align: left;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #444;">A new lead has submitted the contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 12px 0; font-size: 14px; color: #666; width: 30%;">Name</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 500;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 12px 0; font-size: 14px; color: #666;">Email</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 500;"><a href="mailto:${lead.email}" style="color: #0066CC; text-decoration: none;">${lead.email}</a></td>
            </tr>
            ${lead.phone ? `
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 12px 0; font-size: 14px; color: #666;">Phone</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 500;">${lead.phone}</td>
            </tr>` : ''}
            ${lead.company ? `
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 12px 0; font-size: 14px; color: #666;">Company</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 500;">${lead.company}</td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid #EAEAEA;">
              <td style="padding: 12px 0; font-size: 14px; color: #666;">Source</td>
              <td style="padding: 12px 0; font-size: 15px; font-weight: 500;">${lead.source || 'Website'}</td>
            </tr>
          </table>

          ${lead.message ? `
          <div style="margin-top: 32px; background-color: #F9F9F9; padding: 20px; border-radius: 6px; border: 1px solid #EAEAEA;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333; white-space: pre-wrap;">${lead.message}</p>
          </div>` : ''}
          
        </div>
      </div>
    </div>
  `;
};

/**
 * Premium auto-responder confirming receipt for the prospect.
 */
export const getConfirmationEmailHtml = (name: string): string => {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #FAFAFA; color: #111;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <div style="padding: 40px 32px;">
          <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 600; letter-spacing: -0.5px; color: #111;">Request Received.</h2>
          <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #444;">
            Hi ${name},
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            Thank you for reaching out to us. We have received your inquiry and our team is already reviewing it.
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            We strive to provide a premium experience from the very first contact. Expect to hear back from one of our digital strategists within the next 24 business hours to discuss your project in detail.
          </p>
          <div style="margin-top: 40px; border-top: 1px solid #EAEAEA; padding-top: 32px;">
            <p style="margin: 0; font-size: 14px; font-weight: 500; color: #111;">The Medientrupp Team</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #888;">Premium Web Design & Strategy</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

/**
 * 24h Reminder Sequence for unbooked calls
 */
export const getEmailTemplate_24hReminder = (name: string): string => {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #FAFAFA; color: #111;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <div style="padding: 40px 32px;">
          <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #444;">
            Hi ${name},
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            I'm personally reviewing your project inquiry from yesterday and I see a lot of potential. However, I noticed you didn't grab a slot in our calendar yet to discuss the execution.
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            If you're still looking to accelerate your growth this quarter, you can secure a spot directly below. Let's map out a real strategy.
          </p>
          <a href="https://calendly.com/medientrupp/strategy-call" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #FFF; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; margin-bottom: 32px;">Book Strategy Call</a>
          <div style="border-top: 1px solid #EAEAEA; padding-top: 32px;">
            <p style="margin: 0; font-size: 14px; font-weight: 500; color: #111;">Best regards,</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #888;">Lead Strategist, Medientrupp</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

/**
 * 72h Final Follow-up Sequence
 */
export const getEmailTemplate_72hFollowup = (name: string): string => {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #FAFAFA; color: #111;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <div style="padding: 40px 32px;">
          <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #444;">
            Hi ${name},
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            I am closing out my open files for the week and wanted to circle back one last time regarding your inquiry.
          </p>
          <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">
            Often, timing is everything. If now isn't the right time for a revamp, no worries—just reply and let me know. Otherwise, I'd love to chat. Here is my direct link if you'd like to get on the board before we close our calendar for new projects.
          </p>
          <a href="https://calendly.com/medientrupp/strategy-call" style="display: inline-block; padding: 12px 24px; background-color: #111; color: #FFF; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; margin-bottom: 32px;">Grab a Time</a>
          <div style="border-top: 1px solid #EAEAEA; padding-top: 32px;">
            <p style="margin: 0; font-size: 14px; font-weight: 500; color: #111;">Best regards,</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #888;">Lead Strategist, Medientrupp</p>
          </div>
        </div>
      </div>
    </div>
  `;
};
