import { z } from "zod";

/**
 * Base schema for incoming lead forms.
 * Extend or modify this depending on the specific fields on your frontend.
 */
export const LeadFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(150, "Name too long"),
  email: z.string().trim().email("Invalid email address.").max(255, "Email too long"),
  phone: z.string().trim().max(50, "Phone number too long").optional(),
  company: z.string().trim().max(150, "Company name too long").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(3000, "Message too long").optional(),
  // For multi-funnel attribution, you can capture the source
  source: z.string().trim().max(100).optional().default("website_contact_form"),
  // Required bot protection field
  captchaToken: z.string({ required_error: "Security verification token is missing." }).min(1, "Token cannot be empty"),
});

// Infer TypeScript type from the schema
export type TLeadForm = z.infer<typeof LeadFormSchema>;
