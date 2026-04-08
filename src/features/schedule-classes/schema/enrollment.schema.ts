import * as yup from "yup";
import type { EnrollmentFormData, EnrollmentMode } from "../types/enrollment";

const phoneRegex = /^[+\d\s()-]{7,20}$/;

export const createEnrollmentSchema = (mode: EnrollmentMode): yup.ObjectSchema<EnrollmentFormData> =>
  yup.object({
    selectedTariff:
      mode === "general"
        ? yup.string().required("Selecciona una tarifa")
        : yup.string().default("").defined(),
    selectedClass:
      mode === "general"
        ? yup.string().required("Selecciona una clase")
        : yup.string().required("Clase seleccionada no válida"),
    selectedDanceType:
      mode === "general"
        ? yup.string().required("Selecciona un tipo de baile")
        : yup.string().default("").defined(),
    firstName: yup.string().required("El nombre es obligatorio"),
    lastName: yup.string().required("Los apellidos son obligatorios"),
    birthDate: yup.string().required("La fecha de nacimiento es obligatoria"),
    age: yup
      .number()
      .typeError("La edad es obligatoria")
      .min(1, "Edad no válida")
      .max(100, "Edad no válida")
      .required("La edad es obligatoria"),
    phone: yup
      .string()
      .matches(phoneRegex, "Introduce un teléfono válido")
      .required("El teléfono es obligatorio"),
    email: yup
      .string()
      .email("Introduce un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    hasExperience: yup
      .mixed<EnrollmentFormData["hasExperience"]>()
      .oneOf(["si", "no"], "Selecciona si tienes experiencia")
      .required("Selecciona si tienes experiencia"),
    experienceLevel: yup
      .string()
      .defined()
      .default("")
      .test("experience-level-required", "Selecciona tu nivel de experiencia", function (value) {
        const { hasExperience } = this.parent as EnrollmentFormData;
        if (hasExperience === "si") {
          return Boolean(value?.trim());
        }
        return true;
      }),
    acceptedTerms: yup
      .boolean()
      .required("Debes aceptar los términos y condiciones")
      .oneOf([true], "Debes aceptar los términos y condiciones"),
  });
