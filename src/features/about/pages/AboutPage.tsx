import { ContactForm } from "../components/ContactForm"


export const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

        {/* info */}
        <div>
            <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae magnam voluptate porro voluptatem sapiente quas qui placeat, explicabo hic ipsa.
            </p>
        </div>

        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
            <ContactForm/>
        </div>
    </div>
  )
}
