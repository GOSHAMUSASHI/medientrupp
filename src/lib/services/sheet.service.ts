import { google } from "googleapis";
import { TLeadForm } from "../validations/lead.schema";

const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
// Handle literal '\n' escaping inside environment variables for the private key
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Initialize Auth
// Only proceed with a real client if we have all credentials
let sheetsClient: ReturnType<typeof google.sheets> | null = null;

if (CLIENT_EMAIL && PRIVATE_KEY && SHEET_ID) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheetsClient = google.sheets({ version: "v4", auth });
  console.log("[SheetService] Successfully initialized Google Sheets client.");
} else {
  console.warn("[SheetService] Starting in SAFE FALLBACK MODE.");
  if (!CLIENT_EMAIL) console.warn(" -> Missing GOOGLE_SHEETS_CLIENT_EMAIL");
  if (!PRIVATE_KEY) console.warn(" -> Missing GOOGLE_SHEETS_PRIVATE_KEY");
  if (!SHEET_ID) console.warn(" -> Missing GOOGLE_SHEET_ID");
}

/**
 * Sheet (Database) Service
 * 
 * Production-ready implementation integrating Google Sheets API.
 */
export class SheetService {
  
  /**
   * Appends a new incoming lead row to the standard Google Sheet.
   * Keeps the signature identical to support existing architecture.
   * @param lead Validated lead details from our endpoint
   */
  static async appendLeadRow(lead: TLeadForm): Promise<void> {
    console.log(`[SheetService] Preparing to append row for lead: ${lead.email}`);
    
    // Strict Data Mapping (Order matters)
    // 1. Name, 2. Email, 3. Phone, 4. Timestamp, 5. Source
    const values = [
      [
        lead.name,
        lead.email,
        lead.phone || "N/A",
        new Date().toISOString(),
        lead.source || "Website"
      ]
    ];

    try {
      if (!sheetsClient || !SHEET_ID) {
        // Fallback: log to console (mock mode)
        console.warn(`[SheetService - MOCK] Safe fallback mode active. Missing configuration.`);
        console.log(`[SheetService - MOCK] Would have appended row to Google Sheets:`, values[0]);
        return;
      }

      // Append new row to sheet, do not overwrite existing data.
      await sheetsClient.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Leads!A:E", // Set explicitly to "Leads" tab as requested
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });

      console.log(`[SheetService] Successfully appended row to Google Sheet.`);
    } catch (error) {
      console.error(`[SheetService] Failed to append row to Google Sheet:`, error);
      // We log clearly but do not rethrow, ensuring the main lead flow (emails) isn't broken
    }
  }
}
