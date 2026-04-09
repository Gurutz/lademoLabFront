/** Contenido estático de la home (Figma node 348:2369). */

export type RentSpaceItem = {
  id: string
  imageSrc: string
  caption: string
}

export const rentSpaceItems: RentSpaceItem[] = [
  {
    id: "rooms-50",
    imageSrc: "/hero-nightrain.jpg",
    caption: "3 salas de 50m2",
  },
  {
    id: "open-150",
    imageSrc: "/hero-nightrain.jpg",
    caption: "Sala diáfana de 150m2",
  },
  {
    id: "extra",
    imageSrc: "/hero-nightrain.jpg",
    caption: "Espacio polivalente",
  },
]

export const rentSpacesIntro =
  "250 m² pensados para moverse, crear y compartir. Tres salas de 50 m² que pueden transformarse en un solo salón diáfano con equipo de música instalado."

export type UpcomingEventRow = {
  id: string
  dateLabel: string
  title: string
  imageSrc: string
}

export const upcomingEvents: UpcomingEventRow[] = [
  {
    id: "e1",
    dateLabel: "Vie 25 Marzo",
    title: "Práctica de alumnos",
    imageSrc: "/hero-nightrain.jpg",
  },
  {
    id: "e2",
    dateLabel: "23-26 Noviembre",
    title: "Ella Fitzgerald en concierto",
    imageSrc: "/hero-nightrain.jpg",
  },
  {
    id: "e3",
    dateLabel: "13 Diciembre",
    title: "The night train fest",
    imageSrc: "/hero-nightrain.jpg",
  },
  {
    id: "e4",
    dateLabel: "22 Enero",
    title: "Fiesta de fin de curso",
    imageSrc: "/hero-nightrain.jpg",
  },
]

export type ValuePillar = {
  id: string
  title: string
  body: string
}

export const valuePillars: ValuePillar[] = [
  {
    id: "roots",
    title: "Las raíces",
    body:
      "Compromiso por el contexto histórico y cultural en el que surgen estos bailes y su música: comunidad afroamericana en los años 30.",
  },
  {
    id: "quality",
    title: "Calidad y cercanía",
    body:
      "Profes con una larga experiencia y vocación por la enseñanza, creando un ambiente de aprendizaje sano y acogedor durante las clases.",
  },
  {
    id: "roles",
    title: "Sin roles de género",
    body:
      "Cada persona es libre de elegir su rol en el baile: leader, follower o ambas; independientemente de su género u orientación sexual.",
  },
  {
    id: "safe",
    title: "Espacio seguro",
    body:
      "Antirracistas, feministas, LGTBQIA+ friendly, anticapacitistas, y con un compromiso frente cualquier tipo de discriminación, en nuestras clases y eventos.",
  },
]
