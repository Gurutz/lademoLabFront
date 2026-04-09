
// interface Clase {
//   title: string;
//   fecha: string;
//   descripcion: string;
//   precio: number;
//   horario: [string, string];
//   profesores: [];
// }

import { HeroWithVideo } from "./features/home/components/HeroWithVideo"
import { ClassesSectionComponent } from "./features/home/components/classesSectionComponent"
import { RentSpacesSection } from "./features/home/components/RentSpacesSection"
import { UpcomingEventsSection } from "./features/home/components/UpcomingEventsSection"
import { ValuesSection } from "./features/home/components/ValuesSection"
import { learnFromScratchItems } from "./config/sectionCarouselItems"

export const App = () => {
  return (
    <div>
      <HeroWithVideo
        backgroundImage="/hero-nightrain.jpg"
        videoUrl="https://res.cloudinary.com/dujplskc9/video/upload/v1770897800/6._Solo_Chill_s5z8ki.mp4"
        title="Baila lindy hop y solo jazz en Madrid"
      />

      <ClassesSectionComponent
        title="Aprende desde cero"
        items={learnFromScratchItems}
        showButton
      />

      <RentSpacesSection />

      <UpcomingEventsSection />

      <ValuesSection />
    </div>
  )
}
