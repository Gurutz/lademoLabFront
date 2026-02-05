import { AnimatePresence } from "framer-motion"
import { RegisterForm } from "../components/RegisterForm"


export const RegisterPage = () => {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <AnimatePresence mode="wait">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-4">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Crea tu cuenta
          </h2>

          <RegisterForm/>
        </div>
        
      </AnimatePresence>
    </div>
  )
}
