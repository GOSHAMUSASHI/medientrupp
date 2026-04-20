import { z } from "zod";

/**
 * Standard schema for Calendly webhooks.
 * Calendly sends a standard payload containing an `event` type and the `payload` object.
 * We are interested in standard booking creation events.
 */
export const CalendlyWebhookSchema = z.object({
  event: z.enum(["invitee.created", "invitee.canceled", "routing_form_submission.created"]).catch("invitee.created"),
  payload: z.object({
    email: z.string().email(),
    name: z.string(),
    status: z.string(),
    event: z.string(), // URI to the event
    questions_and_answers: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    scheduled_event: z.object({
      start_time: z.string().datetime(),
      end_time: z.string().datetime(),
      status: z.string(),
    }).optional() // Will be expanded as Calendly integration deepens
  }).catchall(z.any()) // Allow other Calendly fields to pass through unnoticed
});

export type TCalendlyWebhook = z.infer<typeof CalendlyWebhookSchema>;
