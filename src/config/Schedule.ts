export interface Item {
    hora: string;
    type: string;
    nivel: string;
    profesor: string;
    color?: string;
    nuevoGrupo?: boolean;
}

export interface DayItem {
    name: string;
    items: Item[];
}

export interface Schedule {
    days: DayItem[];
}

export const schedule : Schedule = {
    days: [
        {
            name: "Lunes",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciacion",
                    profesor: "Julie",
                    color: "bg-(--purple)",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                    color: "bg-(--green)",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Jhon Doe",
                },
                {
                    hora: "19:00",
                    type: "Lindyp Hop",
                    nivel: "Principiante 3",
                    profesor: "Jhon Doe",
                    color: "bg-(--bg-card-ligth-bg)",
                    nuevoGrupo: true,
                },
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 2",
                    profesor: "Gurutz",
                    color: "bg-(--purple)",
                },
            ]
        },
        {
            name: "Martes",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciacion",
                    profesor: "Julie",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 2",
                    profesor: "Julie",
                    color: "bg-(--purple)",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Jhon Doe",
                },
                {
                    hora: "19:00",
                    type: "Lindyp Hop",
                    nivel: "Principiante 3",
                    profesor: "Jhon Doe",
                    color: "bg-(--bg-card-ligth-bg)",
                    nuevoGrupo: true,
                },
            ]
        },
        {
            name: "Miercoles",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciacion",
                    profesor: "Julie",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 2",
                    profesor: "Julie",
                    color: "bg-(--purple)",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Jhon Doe",
                },
                {
                    hora: "19:00",
                    type: "Lindyp Hop",
                    nivel: "Principiante 3",
                    profesor: "Jhon Doe",
                    color: "bg-(--bg-card-ligth-bg)",
                    nuevoGrupo: true,
                },
            ]
        },
        {
            name: "Jueves",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciacion",
                    profesor: "Julie",
                    color: "bg-(--purple)",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                    color: "bg-(--green)",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Jhon Doe",
                },
                {
                    hora: "19:00",
                    type: "Lindyp Hop",
                    nivel: "Principiante 3",
                    profesor: "Jhon Doe",
                    color: "bg-(--bg-card-ligth-bg)",
                    nuevoGrupo: true,
                },
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 2",
                    profesor: "Gurutz",
                    color: "bg-(--purple)",
                },
            ]
        },
        {
            name: "Viernes",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciacion",
                    profesor: "Julie",
                    color: "bg-(--purple)",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                    color: "bg-(--green)",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Jhon Doe",
                },
                {
                    hora: "19:00",
                    type: "Lindyp Hop",
                    nivel: "Principiante 3",
                    profesor: "Jhon Doe",
                    color: "bg-(--bg-card-ligth-blue-bg)",
                    nuevoGrupo: true,
                },
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 2",
                    profesor: "Gurutz",
                    color: "bg-(--purple)",
                },
            ]
        },
        
    ]
}


export const hours = [
    {
        title: "16:00",
        active: true,
    },
    {
        title: "17:00",
        active: true,
    },
    {
        title: "18:00",
        active: true,
    },
    {
        title: "19:00",
        active: false,
    },
    {
        title: "20:00",
        active: false,
    },
    {
        title: "21:00",
        active: false,
    },
    {
        title: "22:00",
        active: false,
    },
]
