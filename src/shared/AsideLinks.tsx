import { X } from "lucide-react"
import { links } from "../config/Links"
import { useState } from "react"
import { LinkComponent } from "./LinkComponent";
import { ApuntateButton } from "./ApuntateButton";

export interface OpenState {
    indice: number;
}

interface AsideLinksProps {
    status: boolean;
    toggleMenu: () => void;
}

export const AsideLinks = ({ status, toggleMenu }: AsideLinksProps) => {

    const [open, setOpen] = useState({
        indice: -1,
        status: false
    });

    const toggleOpen = ({ indice } : OpenState) => {
        setOpen(prevState => ({
            indice: indice,
            status: !prevState.status
        }));
    }

    if (!status) return null;

  return (
    <div className="flex flex-col gap-2 p-4 bg-white h-screen">
        <header>
            <button className="text-black font-normal cursor-pointer" onClick={toggleMenu}>
                <X />
            </button>
        </header>

        {/* links */}
        <div className="flex justify-center items-center w-full h-3/4">
            <nav className="flex flex-col gap-2 overflow-y-auto w-full">
                {
                    links.map((link, index) => (
                        <LinkComponent 
                            key={index}
                            index={index}
                            link={link}
                            open={open}
                            toggleOpen={toggleOpen}
                            toggleMenu={toggleMenu}
                        />
                    ))
                }            
            </nav>
        </div>

        <ApuntateButton isMobile={true}/>


    </div>
  )
}
