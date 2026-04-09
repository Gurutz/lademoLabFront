import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";


interface Props {
    carouselItems: any[];
    showControls?: boolean;
}


export const CarouselComponent = ({ carouselItems, showControls = true } : Props) => {

    if (carouselItems.length === 0) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setcontainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const dragX = useMotionValue(0);

    const canGoPrev = currentIndex > 0;
    // si el el indice es menor que la longitud del array - 1, entonces se puede ir a la siguiente
    // ?? por que - 1? porque el indice empieza en 0 y la longitud del array en 4
    const canGoNext = currentIndex < carouselItems.length - 1;

    const handlePrev = () => {
        if (canGoPrev) setCurrentIndex((prev) => prev - 1);
    }

    const handleNext = () => {
        if (canGoNext) setCurrentIndex((prev) => prev + 1);
    }

    const handleDragEnd = (_event : MouseEvent | TouchEvent | PointerEvent, info : PanInfo) => {

        dragX.set(0);

        const draggedDistance = info.offset.x;
        const swipeThreshold = containerWidth * 0.2; // 20% del umbaral para mostrar el siguiente o anterior

        if (draggedDistance > swipeThreshold && canGoPrev){
            handlePrev();
        }else if (draggedDistance < -swipeThreshold && canGoNext){
            handleNext();
        }

    }


    useEffect(() => {
      
        if (containerRef.current){
            setcontainerWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current){
                setcontainerWidth(containerRef.current.offsetWidth);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    const dragContrainLeft = -((carouselItems.length - 1) * (containerWidth || 0));


  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto p-4">
        
        {/* Ventana visible del carousel */}
        <div ref={containerRef} className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-100">
            <motion.div
                className="flex relative z-10"
                animate={{
                    x: -(currentIndex * (containerWidth || 0))
                }}
                transition={{
                    type: "spring", // tipo de animacion -> spring, hard, etc (spring es el mas comun más suave)
                    stiffness: 300, // rigidez de la animacion, cuanto mas alto mas rigida
                    damping: 30, // amortiguacion de la animacion, cuanto mas alto mas amortiguada
                }}
                drag="x"
                dragConstraints={{
                    left: dragContrainLeft,
                    right: 0,
                }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                    x: dragX
                }}
            >
                {
                    carouselItems.map((item) => (
                        <div
                            key={item.id}
                            className={`min-w-full h-100 md:h-120 flex items-center justify-center text-3xl font-bold text-white flex-col`}
                        >
                            <img src={item.image} alt={`Image ${item.id}`} className={`
                                w-full h-full object-cover relative -z-10 rounded-2xl
                                ${
                                    !item.text && !item.videoUrl && !item.buttonText 
                                    ? "min-h-100 md:min-h-120"
                                    : "min-h-64 md:min-h-80"
                                }    
                            `} />

                            <div className="flex flex-col gap-2 w-full h-full p-4">
                                {
                                    item.text && (
                                        <h1 className="text-2xl font-bold text-black text-start">{item.text}</h1>
                                    )
                                }


                                {
                                    item.videoUrl && (
                                        <video src={item.videoUrl} className="w-full h-full object-cover" />
                                    )
                                }
                                {
                                    item.buttonText && (
                                        <button 
                                            onClick={() => item.handleClick && item.handleClick()}
                                            className="text-black 
                                            font-normal 
                                            rounded-2xl 
                                            h-10 p-2 
                                            bg-[#AAAAFF] 
                                            cursor-pointer hover:bg-[#8888FF] transition-colors duration-300 text-xl"
                                        >
                                            {item.buttonText}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </motion.div>

            {/* Controles y paginacion */}
            {
                showControls && (
                        <div className="flex justify-between items-center mt-6">
                            <button 
                                onClick={handlePrev}
                                disabled={!canGoPrev}
                                className={`
                                    px-5 py-2.5 rounded-xl font-semibold transition-all duration-300   
                                    ${
                                        canGoPrev 
                                        ? "bg-slate-800 text-white hover:bg-slate-700 active:scale-95"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"

                                    }
                                `}
                            >
                                <ArrowLeft />
                            </button>

                            {/* indicador de posicion */}
                            <div className="flex gap-2">
                                {
                                    carouselItems.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                h-2.5 rounded-full transition-all duration-300
                                                ${
                                                    currentIndex === index 
                                                    ? "w-6 bg-slate-800"
                                                    : "w-2.5 bg-gray-300"
                                                }
                                            `}
                                        />
                                    ))
                                }

                            </div>

                            <button 
                                onClick={handleNext}
                                disabled={!canGoNext}
                                className={`
                                    px-5 py-2.5 rounded-xl font-semibold transition-all duration-300   
                                    ${
                                        canGoNext 
                                        ? "bg-slate-800 text-white hover:bg-slate-700 active:scale-95"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"

                                    }
                                `}
                            >
                                <ArrowRight />
                            </button>

                        </div>

                )
            }

        </div>

    </div>
  )
}
