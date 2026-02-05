
// spring -> animacion que rebota
// hard -> animacion que va a una velocidad constante
// stiffness -> rigidez de la animacion, cuanto mas alto mas rigida

export const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100
        }
    },
    exit: {
        opacity: 0,
        x: 50,
        transition: {
            duration: 0.3,
        }
    }
}
