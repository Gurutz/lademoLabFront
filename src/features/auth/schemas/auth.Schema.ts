import * as yup from 'yup';

// regex -> patrones de string

// / -> delimitadores de regex
// ^ -> inicio de la cadena
// (?=.*\d) -> al menos un dígito
// (?=.*[a-z]) -> al menos una letra minúscula
// (?=.*[A-Z]) -> al menos una letra mayúscula
// .{8,} -> al menos 8 caracteres
// $ -> fin de la cadena
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginSchema = yup.object({
    email: yup.string()
        .email("Por favor ingresa un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
    password: yup.string()
        .required("La contraseña es obligatoria")
});

//OneOf -> uno de los campos debe coincidir con el valor de otro campo
// recibe un array de valores, en este caso el valor del campo password

export const registerSchema = yup.object({
    name: yup.string()
        .required("El nombre es obligatorio"),
    apellidos: yup.string()
        .required("Los apellidos son obligatorios"),
    email: yup.string()
        .email("Por favor ingresa un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
    password: yup.string()
        .matches(passwordRules, "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número")
        .required("La contraseña es obligatoria"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Las contraseñas deben coincidir")
        .required("La confirmación de contraseña es obligatoria")
})