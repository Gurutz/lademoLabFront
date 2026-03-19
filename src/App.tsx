
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
import { CarouselComponent } from "./shared/components/CarouselComponent"

export const App = () => {

  // const clase : Clase = {
  //   title: "clase de ejemplo",
  //   fecha: "2024-06-10",
  //   descripcion: "esta es una clase de ejemplo",
  //   precio: 100,
  //   horario: ["10:00", "12:00"],
  //   profesores: [],
  // }

  const firstSectionCarousell = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJINvBKDwcjJX39mMMHIDYiVYQOwiII3sLRA&s",
      text: "Hola mundo",
      buttonText: "Apúntate",
      handleClick: () => {
        console.log("Apúntate");
      }
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJINvBKDwcjJX39mMMHIDYiVYQOwiII3sLRA&s"
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJINvBKDwcjJX39mMMHIDYiVYQOwiII3sLRA&s"
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJINvBKDwcjJX39mMMHIDYiVYQOwiII3sLRA&s"
    },
    {
      id: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJINvBKDwcjJX39mMMHIDYiVYQOwiII3sLRA&s"
    },
  ]

  return (
    <div className="">

      <HeroWithVideo
        backgroundImage="https://res.cloudinary.com/dujplskc9/image/upload/v1770898153/hero-img_m14gda.jpg"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        title={`Baila swing en \n el centro de Madrid`}
      />

      <CarouselComponent
        carouselItems={firstSectionCarousell}
        showControls={false}
      />

      <SectionComponent
        title="test"
        description="esta es una descripcion de prueba"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        showButton={true}
      />
      <SectionComponent
        title="Sebas"
        description="soy sebas"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        showButton={true}
      />

      <ContactForm/>
    </div>
  )
}

