import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";
import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout";

/** Figma NIGHTRAIN-153 (node 348:2098): angled fade + uniform scrim */
const HERO_IMAGE_OVERLAY_STYLE: CSSProperties = {
  backgroundImage: [
    "linear-gradient(131.65deg, rgba(0, 0, 0, 0) 59.55%, rgba(0, 0, 0, 0.5) 100%)",
    "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)",
  ].join(", "),
};

interface Props {
    backgroundImage: string;
    videoUrl: string;
    title?: string;
}

export const HeroWithVideo = ({ backgroundImage, videoUrl, title }: Props) => {
  return (
    <section className="relative z-0 min-h-[min(900px,100dvh)] w-full overflow-hidden bg-gray-900 md:min-h-[900px]">

        {/* imagen de fondo — recorte Figma + gradientes */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={backgroundImage}
              alt=""
              className="absolute left-0 top-[-6.67%] h-[106.68%] w-full max-w-none object-cover"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
          <div className="absolute inset-0" style={HERO_IMAGE_OVERLAY_STYLE} />
        </div>

        {/* contenido principal: móvil arriba izq · desktop abajo izq (misma columna que HorizontalScroll) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-start items-start pt-[calc(108px+env(safe-area-inset-top,0px)+1.75rem)] pb-4 md:top-auto md:bottom-0 md:items-end md:pt-0 md:pb-10">
            <div className={SECTION_TITLE_COLUMN}>
                <motion.h1
                    className="max-w-[min(92vw,52rem)] whitespace-pre-line text-left text-5xl font-extralight leading-[0.92] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem] lg:leading-[0.95] xl:text-[6.25rem] xl:leading-[0.98] 2xl:text-[6.5625rem] 2xl:leading-none"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
                >
                    {title}
                </motion.h1>
            </div>
        </div>

        <motion.div
            className="absolute bottom-4 right-4 z-20 hidden aspect-video h-70 w-50 overflow-hidden border-3 border-white md:block"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
            }}
            whileHover={{ scale: 1.02 }}
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
