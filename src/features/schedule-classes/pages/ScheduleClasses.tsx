import { CheckIcon } from "lucide-react"
import { SectionComponent } from "../../home/components/SectionComponent"
import { MobilePriceCard } from "../components/MobilePriceCard"
import { PriceCard } from "../components/PriceCard";


export const ScheduleClasses = () => {
  return (
    <>
      <SectionComponent
        title="Horarios y niveles"
        description="Horarios y niveles de las clases"
        showButton={true}
      />

      {/* Horario */}

      <div className="bg-white px-6">
        <h2>Proximamente</h2>
      </div>

      {/* Tarifas */}
      <div className="bg-(--purple) px-6 p-3 md:hidden">

        <header className="mb-4 border-b border-gray-400 pb-4 pt-5">
          <h3 className="text-4xl font-normal">Tarifas</h3>
        </header>

        <MobilePriceCard
          title="Iniciación 1 clase / semana"
          price={50}
          pricetrimestral={140}
          offer={true}
        />
        <MobilePriceCard
          title="1 clase / semana"
          price={55}
          pricetrimestral={150}
          offer={false}
        />
        <MobilePriceCard
          title="2 clases / semana"
          price={95}
          pricetrimestral={270}
          offer={false}
        />

        <div className="p-5">
          <button className="bg-white text-black px-4 py-2 rounded-2xl w-full h-12 text-xl">
            Busca el curso para ti
            </button>
        </div>

      </div>

      <div className="hidden md:flex justify-start items-start gap-4 px-6 flex-col">

        <h1 className="text-6xl font-normal mt-10 mb-10">Tarifas</h1>
        
        {/* cards horizontales */}
        <div className="flex justify-start items-start gap-4">
          
          <PriceCard
            bgColor="ligth-yellow"
            title="Empiezo"
            offer={true}
            elements={[
              {
                title: "1 clase a la semana",
                icon: <CheckIcon size={16}/>
              },
              {
                title: "1 practica del viernes al mes",
                icon: <CheckIcon size={16}/>,
                opacity: true
              }
            ]}
            prices={{ price: 50, priceTrimestral: 140 }}
          />

          <PriceCard
            bgColor="ligth-gray"
            title="Me animo"
            offer={false}
            elements={[
              {
                title: "1 clase a la semana",
                icon: <CheckIcon size={16}/>
              },
              {
                title: "1 practica del viernes al mes",
                icon: <CheckIcon size={16}/>,
                opacity: true
              }
            ]}
            prices={{ price: 55, priceTrimestral: 150 }}
          />
          <PriceCard
            bgColor="ligth-purple"
            title="Me engancho"
            offer={false}
            elements={[
              {
                title: "2 clase a la semana",
                icon: <CheckIcon size={16}/>
              },
              {
                title: "1 practica del viernes al mes",
                icon: <CheckIcon size={16}/>,
                opacity: true
              },
              {
                title: "1 Taller mañanero al trimestre",
                icon: <CheckIcon size={16}/>,
                opacity: true
              },
            ]}
            prices={{ price: 95, priceTrimestral: 270 }}
          />
          <PriceCard
            bgColor="purple"
            title="No puedo parar"
            offer={false}
            elements={[
              {
                title: "Acceso a todas las clases",
                icon: <CheckIcon size={16}/>
              },
              {
                title: "1 practica del viernes al mes",
                icon: <CheckIcon size={16}/>,
                opacity: true
              },
              {
                title: "1 Taller mañanero al trimestre",
                icon: <CheckIcon size={16}/>,
                opacity: true
              },
              {
                title: "La camiseta de laDemo",
                icon: <CheckIcon size={16}/>,
                opacity: true
              },
            ]}
            prices={{ price: 140, priceTrimestral: 395 }}
          />
        </div>

      </div>
    </>
  );
};