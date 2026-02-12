import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { links } from "../config/Links";
import { ApuntateButton } from "./ApuntateButton";

const APP_NAME = import.meta.env.VITE_APP_NAME || "miApp";
const IMG_LOGO_URL = import.meta.env.VITE_IMG_LOGO_URL || "https://res.cloudinary.com/dujplskc9/image/upload/v1770897695/Logo_Blanco_hydnze.png";

interface NavbarComponentProps {
    toggleMenu: () => void;
}

// { valores } -> desestructuración de props (elementos que mi compomente va a recibir)
// : -> significa que voy a definir el tipo de dato de lo que voy a recibir
// NavbarComponentProps -> es la interfaz que define el tipo de dato de las props que voy a recibir

export const NavbarComponent = ({ toggleMenu } : NavbarComponentProps) => {

    const navigate = useNavigate();

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 text-black bg-inherit relative z-20">
        
        {/* Logo Container */}
        <div>
            {/* <h1 className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>{APP_NAME}</h1> */}
            <Link to="/" className="font-bold text-lg cursor-pointer">
                <img
                    src={IMG_LOGO_URL}
                    alt="Logo"
                    className="h-10 object-contain"
                />
            </Link>
        </div>

        {/* Links Container */}
        <nav className="flex gap-4">
            <button className="cursor-pointer lg:hidden" onClick={toggleMenu}>
                <Menu color="white" />
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

                                <div className="absolute w-40 top-full left-0 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-2 p-4 z-10">
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
