import emailjs from '@emailjs/browser';
import type { ContactFormData, EmailServiceResponse } from '../types';

const SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID   = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


export const sendEmail = async (
    { email, message, name } : ContactFormData
) : Promise<EmailServiceResponse> => {
    try {

        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                name: name,
                email: email,
                message: message,
                title: "Nuevo mensaje de contacto",
                time: new Date().toLocaleString()
            },
            PUBLIC_KEY
        );

        return response;
    }catch (error){
        console.error("Error al enviar un mensaje de contacto", error);
        throw new Error("Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.");
    }

}