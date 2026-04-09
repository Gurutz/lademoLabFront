
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
        path: "/eventos",
        children: [
        ]
    },
    {
        name: "Alquiler de salas",
        path: "/alquiler-de-salas",
        children: [
        ]
    },
    {
        name: "La escuela",
        path: "/about",
        children: [
        ]
    },
    {
        name: "Contáctanos",
        children: [],
        path: "/about"
    }
];