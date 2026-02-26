import { Sparkles } from "lucide-react"

interface Props {
    title: string;
    price: number;
    pricetrimestral: number;
    offer: boolean;
}

export const MobilePriceCard = ({ title, price, pricetrimestral, offer }: Props) => {
  return (
    <>

        <div className="flex flex-col mb-4 border-b border-gray-400 pb-4">
          <header className="flex items-center justify-between mb-6">
            <h4 className="text-xl">{title}</h4>
            {
                offer && (
                    <span className="bg-(--green) p-1 rounded-full text-sm flex items-center gap-1 font-light text-black">
                        Oferta <Sparkles size={16}/> 
                    </span>
                )
            }
          </header>

          <div className="flex items-start gap-10">

            <div className="flex flex-col">
              <span className="text-5xl font-normal">{price}€</span>
              <span className="text-xl font-extralight">al mes</span>
            </div>

            <div className="flex flex-col">
              <span className="text-5xl font-normal">{pricetrimestral}€</span>
              <span className="text-xl font-extralight">al trimestre</span>
            </div>

          </div>
        </div>
    </>
  )
}
