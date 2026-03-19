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
                    nivel: "Iniciación",
                    profesor: "Julie",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Principiante 1",
                    profesor: "Aiala",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "19:00",
                    type: "Lindy Hop",
                    nivel: "Intermedio 1",
                    profesor: "Ross & Julie",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Intermedio 2 - Classic",
                    profesor: "Ross & Gurutz",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Julie & Aiala",
                },
                {
                    hora: "21:00",
                    type: "Solo Jazz",
                    nivel: "Principiantes 3",
                    profesor: "Ross",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Iniciación",
                    profesor: "Ross & Gurutz",
                    color: "bg-(--bg-schedule-light-yellow)",
                    nuevoGrupo: true,
                },
            ]
        },
        {
            name: "Martes",
            items: [
                {
                    hora: "19:00",
                    type: "Solo Jazz",
                    nivel: "Avanzado",
                    profesor: "Gurutz",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "19:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Ross & Julie",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Avanzado +",
                    profesor: "Aiala & Gurutz",
                },
                {
                    hora: "20:00",
                    type: "Solo Jazz",
                    nivel: "Principiante 1",
                    profesor: "Ross",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Avanzado",
                    profesor: "Aiala & Gurutz",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor: "Julie & Javi",
                },
            ]
        },
        {
            name: "Miercoles",
            items: [
                {
                    hora: "18:00",
                    type: "Solo Jazz",
                    nivel: "Iniciación",
                    profesor: "Gurutz",
                    color: "bg-(--bg-schedule-light-purple)",
                },
                {
                    hora: "19:00",
                    type: "Lindy Hop",
                    nivel: "Intermedio/Avanzado",
                    profesor: "Aiala & Gurutz",
                },
                {
                    hora: "19:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 1",
                    profesor:"Ross & Xulia",
                },
                {
                    hora: "20:00",
                    type: "Lindy Hop",
                    nivel: "Intermedio 1 - Classic",
                    profesor: "Aiala & Gurutz",
                },
                {
                    hora: "21:00",
                    type: "Lindy Hop",
                    nivel: "Principiante 2",
                    profesor: "Aiala & Ross",
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
        active: false,
    },
    {
        title: "17:00",
        active: false,
    },
    {
        title: "18:00",
        active: true,
    },
    {
        title: "19:00",
        active: true,
    },
    {
        title: "20:00",
        active: true,
    },
    {
        title: "21:00",
        active: true,
    },
    {
        title: "22:00",
        active: false,
    },
]
