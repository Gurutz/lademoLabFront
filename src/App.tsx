
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
import { HorizontalScroll } from "./shared/components/HorizontalScroll"
import { CardsHorizontalScroll } from "./shared/components/CardsHorizontalScroll"
import { CARDS_DATA } from "./config/CardsHorizontalScrollHome"
import { ImageCarousel } from "./shared/components/ImageCarousel"
import { HOME_IMAGE_CAROUSEL } from "./config/HomeImageCarousel"

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

      <HorizontalScroll
        id="Aprende-Desde-Cero"
        title="Aprende desde cero"
        items={CARDS_DATA}
        className="-top-20"
        renderItem={ (item : any) => (
          <CardsHorizontalScroll item={item} />
        )
        }
      />

      <ImageCarousel items={HOME_IMAGE_CAROUSEL} className="-top-20 relative" />

      {/* <CarouselComponent
        carouselItems={firstSectionCarousell}
        showControls={false}
      /> */}

      <SectionComponent
        title="test"
        description="esta es una descripcion de prueba"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        showButton={true}
        className="-top-20"
      />
      <SectionComponent
        title="Sebas"
        description="soy sebas"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        showButton={true}
        className="-top-20"
      />

      <ContactForm/>
    </div>
  )
}

