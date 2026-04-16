import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"
import { links } from "../config/Links";
import { ApuntateButton } from "./ApuntateButton";
import { useEffect, useMemo, useState } from "react";

interface NavbarComponentProps {
    toggleMenu: () => void;
}

// { valores } -> desestructuración de props (elementos que mi compomente va a recibir)
// : -> significa que voy a definir el tipo de dato de lo que voy a recibir
// NavbarComponentProps -> es la interfaz que define el tipo de dato de las props que voy a recibir

export const NavbarComponent = ({ toggleMenu } : NavbarComponentProps) => {

    const currentPath = useLocation().pathname;

    const isHome = currentPath === "/";
    const shouldReduceMotion = useReducedMotion();
    const [isScrolled, setIsScrolled] = useState(false);

    const LOGO_DARK = import.meta.env.VITE_IMG_LOGO_URL_DARK;
    const LOGO_LIGHT = import.meta.env.VITE_IMG_LOGO_URL_LIGHT;

    useEffect(() => {
      if (!isHome) return;

      const onScroll = () => {
        setIsScrolled(window.scrollY > 24);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const headerClassName = useMemo(() => {
      if (!isHome) return "relative z-20 h-16 bg-neutral-100 text-black";

      // Mobile en home: blanco sólido (como estaba). Desktop en home:
      // - arriba: transparente sobre hero
      // - al bajar: fondo blanco con blur para legibilidad
      const desktopScrolled =
        "md:bg-white/85 md:text-black md:backdrop-blur-md md:supports-[backdrop-filter]:bg-white/70 md:shadow-[0_1px_0_rgba(0,0,0,0.08)]";
      const desktopTop = "md:bg-transparent md:text-white md:shadow-none";

      return [
        "absolute left-0 right-0 top-0 z-40 h-[108px] bg-white text-black",
        "transition-colors duration-300",
        isScrolled ? desktopScrolled : desktopTop,
      ].join(" ");
    }, [isHome, isScrolled]);

  return (
    <motion.header
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`flex w-full items-center justify-between px-4 md:px-7 ${headerClassName}`}
    >
        
        {/* Logo Container */}
        <div>
            <Link to="/" className="cursor-pointer text-lg font-bold">
                <img
                  src={isHome && !isScrolled ? LOGO_LIGHT : LOGO_DARK}
                  alt="Logo"
                  className={
                    isHome
                      ? "h-8 max-h-[32px] w-auto object-contain"
                      : "h-10 object-contain"
                  }
                />
            </Link>
        </div>

        {/* Links Container */}
        <nav className="flex gap-4">
            <button
              type="button"
              className={`cursor-pointer lg:hidden ${isHome ? "text-black md:text-white" : "text-black"}`}
              onClick={toggleMenu}
            >
                <Menu className="size-6" strokeWidth={2} />
            </button>

            {/* {Links} */}
            <div className="hidden lg:flex lg:items-center lg:gap-7">
                {
                    links.map((link, index) => (
                        link.children.length > 0 ? (
                            <div className="relative group" key={index}>
                                <span className="relative cursor-pointer transition-opacity hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
                                    {link.name}
                                </span>

                                <div className="absolute left-0 top-full z-10 mt-2 w-44 rounded-xl border border-black/10 bg-white/95 p-4 text-black shadow-xl opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                    <ul className="flex flex-col gap-2 w-full">
                                        {
                                            link.children.map((child, childIndex) => (
                                                <li key={childIndex}>
                                                    <Link to={child.path || '/'} className="relative cursor-pointer text-black/90 transition-opacity hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
                                                        {child.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                            </div>
                        )
                        : (
                            <Link to={link.path || '/'} key={index} className="relative cursor-pointer transition-opacity hover:opacity-70 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
                                {link.name}
                            </Link>
                        )
                    ))
                }

                <ApuntateButton isMobile={false} className={isHome ? "md:hover:bg-[#8888FF]" : ""} />
            </div>

        </nav>


    </motion.header>
  )
}
