import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom"
import { links } from "../config/Links";
import { ApuntateButton } from "./ApuntateButton";

const APP_NAME = import.meta.env.VITE_APP_NAME || "miApp";

interface NavbarComponentProps {
    toggleMenu: () => void;
}

// { valores } -> desestructuración de props (elementos que mi compomente va a recibir)
// : -> significa que voy a definir el tipo de dato de lo que voy a recibir
// NavbarComponentProps -> es la interfaz que define el tipo de dato de las props que voy a recibir

export const NavbarComponent = ({ toggleMenu } : NavbarComponentProps) => {

    const currentPath = useLocation().pathname;

    const isHome = currentPath === "/";

    const LOGO_DARK = import.meta.env.VITE_IMG_LOGO_URL_DARK;
    const LOGO_LIGHT = import.meta.env.VITE_IMG_LOGO_URL_LIGHT;

  return (
    <header
      className={`relative z-20 flex h-16 w-full items-center justify-between px-4 ${
        isHome
          ? "bg-transparent text-white md:bg-neutral-100 md:text-black"
          : "bg-neutral-100 text-black"
      }`}
    >
        
        {/* Logo Container */}
        <div>
            <Link to="/" className="cursor-pointer text-lg font-bold">
                {isHome ? (
                  <>
                    <img
                      src={LOGO_DARK}
                      alt="Logo"
                      className="h-10 object-contain md:hidden"
                    />
                    <img
                      src={LOGO_DARK}
                      alt="Logo"
                      className="hidden h-10 object-contain md:block"
                    />
                  </>
                ) : (
                  <img
                    src={LOGO_DARK}
                    alt="Logo"
                    className="h-10 object-contain"
                  />
                )}
            </Link>
        </div>

        {/* Links Container */}
        <nav className="flex gap-4">
            <button
              type="button"
              className={`cursor-pointer lg:hidden ${
                isHome ? "text-white md:text-black" : "text-white"
              }`}
              onClick={toggleMenu}
            >
                <Menu className="size-6" strokeWidth={2} />
            </button>

            {/* {Links} */}
            <div className="hidden lg:flex lg:gap-4 lg:items-center">
                {
                    links.map((link, index) => (
                        link.children.length > 0 ? (
                            <div className="relative group" key={index}>
                                <span className="hover:text-gray-500 transition-colors cursor-pointer">
                                    {link.name}
                                </span>

                                <div className="absolute w-40 top-full left-0 bg-neutral-100 shadow-xl rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-2 p-4 z-10">
                                    <ul className="flex flex-col gap-2 w-full">
                                        {
                                            link.children.map((child, childIndex) => (
                                                <li key={childIndex}>
                                                    <Link to={child.path || '/'} className="hover:text-gray-500 transition-colors cursor-pointer">
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
                            <Link to={link.path || '/'} key={index} className="hover:text-gray-500 transition-colors cursor-pointer">
                                {link.name}
                            </Link>
                        )
                    ))
                }

                <ApuntateButton isMobile={false}/>
            </div>

        </nav>


    </header>
  )
}
