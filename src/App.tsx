
// interface Clase {
//   title: string;
//   fecha: string;
//   descripcion: string;
//   precio: number;
//   horario: [string, string];
//   profesores: [];
// }

import { ContactForm } from "./features/about/components/ContactForm"
import { HeroWithVideo } from "./features/home/components/HeroWithVideo"
import { SectionComponent } from "./features/home/components/SectionComponent"

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
    <div className="">

      <HeroWithVideo
        backgroundImage="https://res.cloudinary.com/dujplskc9/image/upload/v1770898153/hero-img_m14gda.jpg"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        title={`Baila swing en \n el centro de Madrid`}
      />

      <SectionComponent
        title="test"
        description="esta es una descripcion de prueba"
        showButton={true}
      />
      <SectionComponent
        title="Sebas"
        description="soy sebas"
        showButton={true}
      />

      <ContactForm/>
    </div>
  )
}

