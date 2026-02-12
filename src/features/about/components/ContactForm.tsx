import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ContactSchema } from "../schema/schema";
import { InputComponent } from "../../../shared/forms/InputComponent";
import { Link } from "react-router-dom";
import { formVariants } from "../../../shared/animations/variants";
import { TextAreaComponent } from "../../../shared/forms/TextAreaComponent";
import { sendEmail } from "../services/EmailService";
import type { ContactFormData } from "../types";

export const ContactForm = () => {
  // register -> sirve para registrar los inputs en el formulario
    // handleSubmit -> función que se encarga de manejar el submit del formulario
    // formState -> estado del formulario, contiene información sobre los errores y el estado de envío
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
        reset
    } = useForm({
        resolver: yupResolver(ContactSchema),
    });

    const onSubmit = async(event: ContactFormData) => {
        
        try {

            await sendEmail({
                name: event.name,
                email: event.email,
                message: event.message
            })

            reset();
            
        } catch (error) {
            console.error("Error al enviar el formulario de contacto", error);
            throw new Error("Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
        }

    }

  return (
    <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
    >
        <InputComponent
            label="Nombre completo"
            placeholder="Jhon Doe"
            {...register("name")}
            error={errors.name}
        />

        <InputComponent
            label="Correo Electronico"
            placeholder="jhon.doe@example.com"
            {...register("email")}
            error={errors.email}
        />

        <TextAreaComponent
            label="Mensaje"
            type="text"
            rows={10}
            placeholder="Escribe tu mensaje aquí..."
            {...register("message")}
            error={errors.message}
        />

        <button
            type="submit"
            className="mt-4 bg-[#9191fa] text-white py-2 rounded-lg hover:bg-[#8888FF] transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
            disabled={isSubmitting}
        >
            {
                isSubmitting ? "Enviando..." : "Enviar"
            }
        </button>

        {
            isSubmitted && !isSubmitting && !errors.name && !errors.email && !errors.message && (
                <p className="text-green-500 mt-2">
                ¡Mensaje enviado con éxito!
                </p>
            )
        }

    
        <Link to='/' className="text-sm text-gray-600 mt-4 hover:underline self-end">
            Volver al inicio
        </Link>

    </motion.form>
  )
}
