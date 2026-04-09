export type EnrollmentMode = "class" | "general";

export interface EnrollmentFormData {
  selectedTariff: string;
  selectedClass: string;
  selectedDanceType: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  phone: string;
  email: string;
  hasExperience: "si" | "no" | "";
  experienceLevel: string;
  acceptedTerms: boolean;
}

export interface EnrollmentPayload extends EnrollmentFormData {
  mode: EnrollmentMode;
  contactedMessage: string;
  submittedAt: string;
}
