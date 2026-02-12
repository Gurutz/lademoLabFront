import { motion } from "framer-motion";
import { ArrowDown, MoveDown } from "lucide-react";

interface Props {
    backgroundImage: string;
    videoUrl: string;
    title?: string;
}

export const HeroWithVideo = ({ backgroundImage, videoUrl, title }: Props) => {
  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-gray-900 rounded-lg mb-6 -top-20">

        {/* imagen de fondo (HERO IMAGE) */}
        <div className="absolute inset-0 w-full h-full">
            <img
                src={backgroundImage}
                alt="HERO IMAGE"
                className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/30"/>
        </div>

        {/* contenido principal (TEXTO/TITLE) */}
        <div className="relative z-10 flex h-full items-start justify-start px-4 top-25 max-w-md">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tighter text-start">
                {title}
            </h1>
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
            className="absolute bottom-4 left-4 z-20 w-10 h-10 overflow-hidden flex items-center justify-center"
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
