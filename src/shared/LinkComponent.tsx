import { ChevronDown, ChevronUp } from "lucide-react"
import type { Children } from "../config/Links";
import { Link } from "react-router-dom";

interface LinkComponentProps {
    index: number;
    link: Children;
    open: {
        indice: number;
        status: boolean;
    },
    toggleOpen: ({ indice }: { indice: number }) => void;
    toggleMenu?: () => void;
}


export const LinkComponent = ({ index, link, open, toggleOpen, toggleMenu } : LinkComponentProps) => {
  return (
    <div className="p-2 cursor-pointer relative hover:bg-gray-200 rounded-md">
                            
        <div className="flex items-center gap-2 justify-between" 
        onClick={
            () => toggleOpen({ indice: index })
        }>
            <h2 className="font-semibold text-4xl">{link.name}</h2>
            {
                link.children.length > 0 && (
                    open.indice == index && open.status ? <ChevronUp/> : <ChevronDown/>
                )
            }
        </div>

        {/* DropdownLinks */}
        {
            link.children.length > 0 
                && open.indice === index 
                    && open.status && (
                <div className="flex flex-col mt-2 pl-4 gap-2">
                    {
                        link.children.map((sublink, subIndex) => (
                            <Link
                                key={subIndex}
                                to={sublink.path!}
                                className="text-xl font-semibold hover:underline text-gray-700 block"
                                onClick={toggleMenu}
                            >
                                {sublink.name}
                            </Link>
                        ))
                    }
                </div>
            )
        }

    </div>
  )
}
