import * as yup from 'yup';


export const ContactSchema = yup.object({

    name: yup.string()
        .required("El nombre es obligatorio"),

    email: yup.string()
        .email("Por favor ingresa un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
    
    message: yup.string()
        .required("El mensaje es obligatorio")
});