import { Sparkles } from "lucide-react"
import type { ReactNode } from "react";

interface Element {
    title: string;
    icon: ReactNode;
    opacity?: boolean;
}

interface Price {
    price: number;
    priceTrimestral: number;
}

interface Props {
    bgColor: 'purple' | 'green' | 'yellow' | 'gray' | 'ligth-gray' | 'ligth-purple' | 'ligth-yellow'
    title: string;
    offer: boolean;
    elements: Element[];
    prices: Price;
}

export const PriceCard = ({ bgColor, title, offer, elements, prices }: Props) => {

    let bgColorClass = '';

    switch (bgColor) {
        case 'purple':
            bgColorClass = 'bg-(--purple)';
            break;
        case 'green':
            bgColorClass = 'bg-(--green)';
            break;
        case 'yellow':
            bgColorClass = 'bg-(--yellow)';
            break;
        case 'gray':
            bgColorClass = 'bg-(--gray)';
            break;
        case 'ligth-gray':
            bgColorClass = 'bg-(--bg-card-ligth-gray)';
            break;
        case 'ligth-purple':
            bgColorClass = 'bg-(--bg-card-ligth-purple)';
            break;
        case 'ligth-yellow':
            bgColorClass = 'bg-(--bg-card-ligth-yellow)';
            break;
    
        default:
            break;
    }

  return (
    <div className={`w-[320px] min-h-[450px] ${bgColorClass} p-4 rounded-xl flex flex-col`}>
            
        <div className="flex items-end justify-end">
            
            {
                offer && (
                    <span className="bg-neutral-100 text-black px-2 py-1 rounded-full text-md flex items-center">
                        Oferta iniciación <Sparkles size={16} className="ml-1" />
                    </span>
                )
            }

        </div>

        <header className="flex flex-col gap-2">
            <h3 className="text-xl font-normal mb-3">{title}</h3>

            <ul className="flex flex-col gap-2">
                {
                    elements.map((element, index) => (
                        <li key={index} className={`flex items-center gap-2 ${element.opacity ? 'opacity-60' : ''}`}>
                            {element.icon}
                            {element.title}
                        </li>
                    ))
                }
            </ul>
        </header>

        <div className="h-full flex-1"></div>

        {/* precios */}
        <div className="flex justify-between">

            <div className="w-full flex flex-col border-r border-gray-300 justify-center items-center">
            <span className="text-5xl font-normal">{prices.price}€</span>
            <span className="text-md font-extralight">al mes</span>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
            <span className="text-5xl font-normal">{prices.priceTrimestral}€</span>
            <span className="text-md font-extralight">al trimestre</span>
            </div>

        </div>

    </div>
  )
}
