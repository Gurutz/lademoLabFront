import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createEnrollmentSchema } from "../schema/enrollment.schema";
import { submitEnrollment } from "../services/EnrollmentService";
import type { EnrollmentFormData, EnrollmentMode, EnrollmentPayload } from "../types/enrollment";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: EnrollmentMode;
  preselectedClass?: string;
  classOptions: string[];
  danceTypeOptions: string[];
}

const TARIFF_OPTIONS = ["Empiezo", "Me animo", "Me engancho", "No puedo parar"];
const EXPERIENCE_LEVELS = ["Iniciación", "Principiante", "Intermedio", "Avanzado"];

const getDefaultValues = (mode: EnrollmentMode, preselectedClass?: string): EnrollmentFormData => ({
  selectedTariff: "",
  selectedClass: mode === "class" ? preselectedClass ?? "" : "",
  selectedDanceType: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  age: 0,
  phone: "",
  email: "",
  hasExperience: "",
  experienceLevel: "",
  acceptedTerms: false,
});

const calculateAge = (birthDate: string): number => {
  if (!birthDate) return 0;
  const dob = new Date(`${birthDate}T00:00:00`);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();
  const monthDifference = now.getMonth() - dob.getMonth();
  const hasNotHadBirthdayYet =
    monthDifference < 0 || (monthDifference === 0 && now.getDate() < dob.getDate());

  if (hasNotHadBirthdayYet) {
    age -= 1;
  }

  return age > 0 ? age : 0;
};

export const EnrollmentModal = ({
  isOpen,
  onClose,
  mode,
  preselectedClass,
  classOptions,
  danceTypeOptions,
}: EnrollmentModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const schema = useMemo(() => createEnrollmentSchema(mode), [mode]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormData>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(mode, preselectedClass),
  });

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues(mode, preselectedClass));
      setCurrentStep(0);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [isOpen, mode, preselectedClass, reset]);

  const birthDate = watch("birthDate");
  const hasExperience = watch("hasExperience");

  useEffect(() => {
    const calculatedAge = calculateAge(birthDate);
    setValue("age", calculatedAge, { shouldValidate: true, shouldDirty: true });
  }, [birthDate, setValue]);

  const steps =
    mode === "general"
      ? ["Selecciona tu clase", "Datos personales", "Experiencia y envío"]
      : ["Datos personales", "Experiencia y envío"];

  const fieldsByStep: Array<Array<keyof EnrollmentFormData>> =
    mode === "general"
      ? [
          ["selectedTariff", "selectedClass", "selectedDanceType"],
          ["firstName", "lastName", "birthDate", "age", "phone", "email"],
          ["hasExperience", "experienceLevel", "acceptedTerms"],
        ]
      : [
          ["firstName", "lastName", "birthDate", "age", "phone", "email"],
          ["hasExperience", "experienceLevel", "acceptedTerms"],
        ];

  const onNextStep = async () => {
    const isValidStep = await trigger(fieldsByStep[currentStep]);
    if (!isValidStep) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const onPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (values: EnrollmentFormData) => {
    try {
      setSubmitError(null);
      const payload: EnrollmentPayload = {
        ...values,
        mode,
        contactedMessage: "Te contactaremos en breve para formalizar tu inscripción.",
        submittedAt: new Date().toLocaleString(),
      };
      await submitEnrollment(payload);
      setSubmitSuccess(true);
      reset(getDefaultValues(mode, preselectedClass));
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo enviar tu inscripción.";
      setSubmitError(message);
    }
  };

  const renderSelectionStep = (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Tarifa</label>
        <select
          {...register("selectedTariff")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Selecciona una tarifa</option>
          {TARIFF_OPTIONS.map((tariff) => (
            <option key={tariff} value={tariff}>
              {tariff}
            </option>
          ))}
        </select>
        {errors.selectedTariff && <p className="mt-1 text-sm text-red-500">{errors.selectedTariff.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Clase</label>
        <select
          {...register("selectedClass")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Selecciona una clase</option>
          {classOptions.map((classOption) => (
            <option key={classOption} value={classOption}>
              {classOption}
            </option>
          ))}
        </select>
        {errors.selectedClass && <p className="mt-1 text-sm text-red-500">{errors.selectedClass.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de baile</label>
        <select
          {...register("selectedDanceType")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Selecciona el tipo de baile</option>
          {danceTypeOptions.map((danceType) => (
            <option key={danceType} value={danceType}>
              {danceType}
            </option>
          ))}
        </select>
        {errors.selectedDanceType && <p className="mt-1 text-sm text-red-500">{errors.selectedDanceType.message}</p>}
      </div>
    </div>
  );

  const renderPersonalDataStep = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Nombres</label>
        <input
          {...register("firstName")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="Tu nombre"
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Apellidos</label>
        <input
          {...register("lastName")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="Tus apellidos"
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
        <input
          {...register("birthDate")}
          type="date"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
        {errors.birthDate && <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Edad (automática)</label>
        <input
          {...register("age")}
          type="number"
          readOnly
          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-600 outline-none"
        />
        {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Número de teléfono</label>
        <input
          {...register("phone")}
          type="tel"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="+34 600 000 000"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
    </div>
  );

  const renderExperienceStep = (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">¿Tienes experiencia en este baile?</p>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="radio" value="si" {...register("hasExperience")} />
            Sí
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="radio" value="no" {...register("hasExperience")} />
            No
          </label>
        </div>
        {errors.hasExperience && <p className="mt-1 text-sm text-red-500">{errors.hasExperience.message}</p>}
      </div>

      {hasExperience === "si" && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nivel actual</label>
          <select
            {...register("experienceLevel")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Selecciona tu nivel</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.experienceLevel && <p className="mt-1 text-sm text-red-500">{errors.experienceLevel.message}</p>}
        </div>
      )}

      <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
        Al enviar esta solicitud, te contactaremos en breve para formalizar la inscripción.
      </div>

      <label className="inline-flex items-start gap-2 text-sm">
        <input type="checkbox" className="mt-1" {...register("acceptedTerms")} />
        Acepto los términos y condiciones de inscripción.
      </label>
      {errors.acceptedTerms && <p className="text-sm text-red-500">{errors.acceptedTerms.message}</p>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-3xl rounded-2xl bg-white p-5 md:p-8"
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Formulario de inscripción</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {mode === "general"
                    ? "Completa los pasos para buscar y reservar tu clase."
                    : "Inscripción directa a la clase seleccionada."}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </header>

            <div className="mb-6 grid gap-2 md:grid-cols-3">
              {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div
                    key={step}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      isCurrent
                        ? "border-black bg-black text-white"
                        : isDone
                          ? "border-green-400 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white text-gray-500"
                    }`}
                  >
                    {index + 1}. {step}
                  </div>
                );
              })}
            </div>

            {submitSuccess ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                Inscripción enviada correctamente. Te contactaremos en breve para formalizarla.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {mode === "general" && currentStep === 0 && renderSelectionStep}
                {((mode === "general" && currentStep === 1) || (mode === "class" && currentStep === 0)) &&
                  renderPersonalDataStep}
                {((mode === "general" && currentStep === 2) || (mode === "class" && currentStep === 1)) &&
                  renderExperienceStep}

                {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                <div className="flex flex-col-reverse gap-2 pt-2 md:flex-row md:justify-between">
                  <button
                    type="button"
                    onClick={onPreviousStep}
                    disabled={currentStep === 0 || isSubmitting}
                    className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Atrás
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={onNextStep}
                      className="rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-[#8b8bff] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#7474ff] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
