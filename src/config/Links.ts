
export interface LinkItem {
    name: string;
    path?: string;
}

export interface Children extends LinkItem {
    children: Children[];
}


export const links : Children[] = [
    {
        name: "Inicio",
        children: [],
        path: "/"
    },
    {
        name: "Clases",
        children: [
            {
                name: "Horarios y niveles",
                path: "/clases/horarios-niveles",
                children: []
            },
            {
                name: "Tarifas",
                path: "/clases/tarifas",
                children: []
            },
            {
                name: "Que enseñamos",
                path: "/clases/about",
                children: []
            },
            {
                name: "FAQs",
                path: "/clases/faqs",
                children: []
            }
        ]
    },
    {
        name: "Eventos",
        children: [
            {
                name: "Eventos próximos",
                path: "/eventos/proximos",
                children: []
            },
            {
                name: "Tarifas",
                path: "/eventos/tarifas",
                children: []
            },
        ]
    },
    {
        name: "Alquiler de salas",
        children: [
        ]
    },
    {
        name: "La escuela",
        children: [
            {
                name: "Profesores",
                path: "/escuela/profesores",
                children: []
            },
        ]
    },
    {
        name: "Contáctanos",
        children: [],
        path: "/about"
    },
    {
        name: "Ingresar",
        children: [
            {
                name: "Iniciar sesión",
                path: "/auth/login",
                children: []
            },
            {
                name: "Registrarse",
                path: "/auth/register",
                children: []
            }
        ]
    }
];