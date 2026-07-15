import { Appointment } from "../types";
import { CLINIC_INFO } from "./content";

export interface ConsultationFormData {
  consultationMode?: "Online" | "Offline";
  name?: string;
  mobile?: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  service?: string;
  subService?: string;
  date?: string;
  time?: string;
  message?: string;
  meetingPlatform?: string;
}

/**
 * Builds the raw plain-text message for booking an appointment.
 */
export function buildWhatsAppMessage(formData: ConsultationFormData): string {
  const mode = formData.consultationMode || "Offline";
  const name = formData.name || "Not specified";
  const mobile = formData.mobile || formData.phone || "Not specified";
  const age = formData.age || "Not specified";
  const gender = formData.gender || "Not specified";
  const city = formData.city || "Not specified";
  const date = formData.date || "Not specified";
  const time = formData.time || "Not specified";
  const department = formData.service || "General Consultation";
  const procedure = formData.subService || "General Consultation";
  const message = formData.message || "None";
  const platform = formData.meetingPlatform || "Not specified";

  if (mode === "Online") {
    return `Hello Dr. Imran Shaikh,
I would like to book an ONLINE consultation.

Patient Details:
• Name: ${name}
• Age: ${age}
• Gender: ${gender}
• Mobile: ${mobile}
• City: ${city}

Consultation Details:
• Department: ${department}
• Procedure: ${procedure}
• Platform: ${platform}
• Date: ${date}
• Time: ${time}

Symptoms:
${message}

Thank you.`;
  } else {
    return `Hello Dr. Imran Shaikh,
I would like to book an OFFLINE consultation.

Patient Details:
• Name: ${name}
• Age: ${age}
• Gender: ${gender}
• Mobile: ${mobile}

Consultation Details:
• Department: ${department}
• Procedure: ${procedure}
• Date: ${date}
• Time: ${time}

Thank you.`;
  }
}

/**
 * Builds a URL-encoded WhatsApp click-to-chat link for booking an appointment.
 */
export function buildWhatsAppUrl(formData: ConsultationFormData): string {
  const messageText = buildWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodedMessage}`;
}

/**
 * Builds the raw plain-text message for general contact queries.
 */
export function buildContactWhatsAppMessage(contactData: {
  name: string;
  phone: string;
  message: string;
}): string {
  return `Hello Dr. Imran Shaikh,

I have a general inquiry from the website.

Contact Details:
• Name: ${contactData.name}
• Phone: ${contactData.phone}

Inquiry/Message:
${contactData.message}

Thank you.`;
}

/**
 * Builds a URL-encoded WhatsApp link for general contact queries.
 */
export function buildContactWhatsAppUrl(contactData: {
  name: string;
  phone: string;
  message: string;
}): string {
  const messageText = buildContactWhatsAppMessage(contactData);
  return `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(messageText)}`;
}
