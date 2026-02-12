import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth.Schema";
import { motion } from "framer-motion";
import { formVariants } from "../../../shared/animations/variants";
import { InputComponent } from "../../../shared/forms/InputComponent";
import { Link } from "react-router-dom";


export const RegisterForm = () => {

    // register -> sirve para registrar los inputs en el formulario
    // handleSubmit -> función que se encarga de manejar el submit del formulario
    // formState -> estado del formulario, contiene información sobre los errores y el estado de envío
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async() => {
        
        return new Promise((resolve) => {

            setTimeout(() => {
                console.log("Logueado con exito...")
                resolve("Logueado con exito...")
            }, 2000)

        })

    }

  return (
    <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
    >
        <InputComponent
            label="Nombre"
            placeholder="Jhon"
            error={errors.name}
            {...register("name")}
        />
        <InputComponent
            label="Apellidos"
            placeholder="Doe"
            {...register("apellidos")}
            error={errors.apellidos}
        />

        <InputComponent
            label="Correo Electronico"
            placeholder="jhon.doe@example.com"
            {...register("email")}
            error={errors.email}
        />

        <InputComponent
            label="Contraseña"
            type="password"
            placeholder="********"
            {...register("password")}
            error={errors.password}
        />

        <InputComponent
            label="Confirma Contraseña"
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
        />

        <button
            type="submit"
            className="mt-4 bg-[#9191fa] text-white py-2 rounded-lg hover:bg-[#8888FF] transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
            disabled={true}
        >
            {
                isSubmitting ? "Registrando.." : "Proximamente"
            }
        </button>

        <Link to='/auth/login' className="text-sm text-gray-600 mt-4 hover:underline self-end">
            ¿Ya tienes una cuenta? <span className="text-[#9191fa] hover:underline">Inicia sesión</span>
        </Link>

    </motion.div>
  )
}
