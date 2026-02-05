
// interface Clase {
//   title: string;
//   fecha: string;
//   descripcion: string;
//   precio: number;
//   horario: [string, string];
//   profesores: [];
// }

import { ContactForm } from "./features/about/components/ContactForm"

export const App = () => {

  // const clase : Clase = {
  //   title: "clase de ejemplo",
  //   fecha: "2024-06-10",
  //   descripcion: "esta es una clase de ejemplo",
  //   precio: 100,
  //   horario: ["10:00", "12:00"],
  //   profesores: [],
  // }

  return (
    <div className="container px-4 py-2">
      <ContactForm/>
    </div>
  )
}

