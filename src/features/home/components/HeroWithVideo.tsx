import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";
import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout";

interface Props {
    backgroundImage: string;
    videoUrl: string;
    title?: string;
}

export const HeroWithVideo = ({ backgroundImage, videoUrl, title }: Props) => {
  return (
    <section className="relative z-0 w-full h-[102dvh] md:h-screen overflow-hidden rounded-lg bg-gray-900 -mt-20">

        {/* imagen de fondo (HERO IMAGE) */}
        <div className="absolute inset-0 w-full h-full">
            <img
                src={backgroundImage}
                alt="HERO IMAGE"
                className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/30"/>
        </div>

        {/* contenido principal: móvil arriba izq · desktop abajo izq (misma columna que HorizontalScroll) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-start items-start pt-[calc(4rem+env(safe-area-inset-top,0px)+1.75rem)] pb-4 md:top-auto md:bottom-0 md:items-end md:pt-24 md:pb-10">
            <div className={SECTION_TITLE_COLUMN}>
                <h1 className="max-w-[min(92vw,48rem)] text-left text-5xl font-extralight leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl">
                    {title}
                </h1>
            </div>
        </div>

        <motion.div
            className="absolute bottom-4 right-4 z-20 aspect-video w-50 h-70 overflow-hidden border-3 border-white"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
            }}
        >
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoUrl} type="video/mp4"/>
            </video>

        </motion.div>


        <motion.div
            className="absolute bottom-4 left-4 z-20 flex h-10 w-10 items-center justify-center overflow-hidden md:hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
            }}
        >
            <MoveDown color="white" size={40} className="cursor-pointer"/>
        </motion.div>

    </section>
  )
}
