import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/auth.Schema";
import { motion } from "framer-motion";
import { formVariants } from "../../../shared/animations/variants";
import { InputComponent } from "../../../shared/forms/InputComponent";
import { Link } from "react-router-dom";


export const LoginForm = () => {

    // register -> sirve para registrar los inputs en el formulario
    // handleSubmit -> función que se encarga de manejar el submit del formulario
    // formState -> estado del formulario, contiene información sobre los errores y el estado de envío
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async() => {
        console.log("submit")
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

        <button
            type="submit"
            className="mt-4 bg-[#9191fa] text-white py-2 rounded-lg hover:bg-[#8888FF] transition-colors duration-300 disabled:bg-gray-400 cursor-pointer"
            disabled={isSubmitting}
        >
            {
                isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"
            }
        </button>

    
        <Link to='/auth/register' className="text-sm text-gray-600 mt-4 hover:underline self-end">
            ¿No tienes una cuenta? <span className="text-[#9191fa] hover:underline">Regístrate</span>
        </Link>

    </motion.form>
  )
}
