import emailjs from "@emailjs/browser";
import type { EnrollmentPayload } from "../types/enrollment";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const ENROLLMENT_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_ENROLLMENT_TEMPLATE_ID ?? import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "contacto@lademo.com";

const buildEnrollmentMessage = (payload: EnrollmentPayload): string => {
  return [
    `Fecha de envío: ${payload.submittedAt}`,
    `Modo: ${payload.mode}`,
    `Tarifa: ${payload.selectedTariff || "No aplica"}`,
    `Clase: ${payload.selectedClass}`,
    `Tipo de baile: ${payload.selectedDanceType || "No aplica"}`,
    `Nombre: ${payload.firstName} ${payload.lastName}`,
    `Fecha de nacimiento: ${payload.birthDate}`,
    `Edad: ${payload.age}`,
    `Teléfono: ${payload.phone}`,
    `Correo: ${payload.email}`,
    `Experiencia: ${payload.hasExperience}`,
    `Nivel: ${payload.experienceLevel || "Sin experiencia"}`,
    `Acepta términos: ${payload.acceptedTerms ? "Sí" : "No"}`,
    payload.contactedMessage,
  ].join("\n");
};

const saveToGoogleSheets = async (payload: EnrollmentPayload): Promise<void> => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    throw new Error("Falta VITE_GOOGLE_SHEETS_WEBHOOK_URL en variables de entorno.");
  }

  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: {
      // text/plain evita preflight CORS en Apps Script Web Apps
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar la inscripción en Google Sheets.");
  }

  // Algunos Apps Script devuelven 200 incluso cuando el body indica ok:false.
  const rawBody = await response.text();
  if (!rawBody) return;

  try {
    const parsed = JSON.parse(rawBody) as { ok?: boolean; error?: string };
    if (parsed.ok === false) {
      throw new Error(parsed.error || "Apps Script devolvió un error al guardar.");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Si no es JSON, no bloqueamos por formato inesperado.
      return;
    }
    throw error;
  }
};

const sendEnrollmentEmail = async (payload: EnrollmentPayload): Promise<void> => {
  if (!SERVICE_ID || !ENROLLMENT_TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error("Falta configurar EmailJS para inscripciones.");
  }

  const message = buildEnrollmentMessage(payload);

  await emailjs.send(
    SERVICE_ID,
    ENROLLMENT_TEMPLATE_ID,
    {
      title: "Nueva inscripción de clase",
      name: `${payload.firstName} ${payload.lastName}`,
      message,
      submitted_at: payload.submittedAt,
      mode: payload.mode,
      selected_tariff: payload.selectedTariff,
      selected_class: payload.selectedClass,
      selected_dance_type: payload.selectedDanceType,
      first_name: payload.firstName,
      last_name: payload.lastName,
      birth_date: payload.birthDate,
      age: payload.age,
      phone: payload.phone,
      email: payload.email,
      has_experience: payload.hasExperience,
      experience_level: payload.experienceLevel || "Sin experiencia",
      terms_accepted: payload.acceptedTerms ? "Sí" : "No",
      contact_email: CONTACT_EMAIL,
      contacted_message: payload.contactedMessage,
      to_email: payload.email, // copia al alumno si el template usa este campo
    },
    PUBLIC_KEY,
  );
};

export const submitEnrollment = async (payload: EnrollmentPayload): Promise<void> => {
  await saveToGoogleSheets(payload);
  await sendEnrollmentEmail(payload);
};
