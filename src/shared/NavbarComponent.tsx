import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom"
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

    const navigate = useNavigate();

  return (
    <header className="w-full h-16 flex items-center justify-between px-4 text-black">
        
        {/* Logo Container */}
        <div>
            <h1 className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>{APP_NAME}</h1>
        </div>

        {/* Links Container */}
        <nav className="flex gap-4">
            <button className="cursor-pointer lg:hidden" onClick={toggleMenu}>
                <Menu />
            </button>

            {/* {Links} */}
            <div className="hidden lg:flex lg:gap-4 lg:items-center">
                {
                    links.map((link, index) => (
                        <span key={index}>
                            {link.name}
                        </span>
                    ))
                }

                <ApuntateButton isMobile={false}/>
            </div>

        </nav>


    </header>
  )
}
