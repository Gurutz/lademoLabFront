import { ArrowRight, CheckIcon } from "lucide-react"
import { ClassesSectionComponent } from "../../home/components/classesSectionComponent"
import { MobilePriceCard } from "../components/MobilePriceCard"
import { PriceCard } from "../components/PriceCard";
import { learnFromScratchItems } from "../../../config/sectionCarouselItems";
import { hours, schedule } from "../../../config/Schedule";


export const ScheduleClasses = () => {
  return (
    <>
      <ClassesSectionComponent
        title="Aprende desde cero"
        items={learnFromScratchItems}
        showButton={true}
      />

      {/* Horario mobile */}

      <div className="bg-white px-6 md:hidden">
        {
          schedule.days.map((day, index) => (
            <div key={index}>
              <h3 className="text-2xl font-normal">{day.name}</h3>

              <hr className="border-gray-400 my-4" />

              <div className="flex flex-col gap-2">
                {
                  day.items.map((item, itemIndex) =>  (
                    <div key={itemIndex} className={`${item.color} p-2 rounded-lg mb-2`}>
                      <div className="flex items-center justify-between">
                        <div className="w-1/6">
                          <span className="text-sm font-light">{item.hora}</span>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <span className="text-sm font-light">{item.type}</span>
                          <span className="text-sm font-light">{item.nivel}</span>
                          <span className="text-sm font-light">{item.profesor}</span>
                        </div>
                        <div className="flex items-center">
                          {
                            item.nuevoGrupo && (
                              <span className="bg-(--bg-card-ligth-yellow) p-1 rounded-full text-sm flex items-center gap-1 font-light text-black">
                                Nuevo grupo
                              </span>
                            )
                          }
                          <ArrowRight size={16} className="text-gray-800 mr-2" />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>


            </div>
          ))
        }
      </div>


    {/* Horario en desktop */}

      <div className="hidden md:block px-6">
        <div
          className="grid gap-x-3 gap-y-2"
          style={{ gridTemplateColumns: `100px repeat(${schedule.days.length}, 1fr)` }}
        >
          {/* Fila de encabezados: esquina vacía + nombre de cada día */}
          <div />
          {schedule.days.map((day, dIndex) => (
            <div key={dIndex} className="flex justify-center pb-3">
              <h3 className="text-2xl font-normal text-center">{day.name}</h3>
            </div>
          ))}

          {/* Filas por hora */}
          {hours.filter((h) => h.active).map((hour, hIndex) => (
            <>
              {/* Columna izquierda: hora */}
              <div key={`hour-${hIndex}`} className="pt-3">
                <div className="flex items-start justify-start">
                  <span className="text-sm font-light text-gray-500">{hour.title}</span>
                </div>
              </div>

              {/* Columnas: una celda por día */}
              {schedule.days.map((day, dIndex) => {
                const items = day.items.filter((item) => item.hora === hour.title);
                return (
                  <div
                    key={`cell-${hIndex}-${dIndex}`}
                    className="flex min-h-[80px] flex-col gap-2 rounded-xl p-1"
                  >
                    {items.map((item, iIndex) => (
                      <div
                        key={iIndex}
                        className={`${
                          item.color ?? "border border-gray-400 rounded"
                        } flex flex-col gap-0.5 rounded-lg p-3`}
                      >
                        {/* rango horario */}
                        <h3 className="text-sm">
                          {(() => {
                            const startHour = item.hora.split(":")[0].padStart(2, "0");
                            const endHour = String(parseInt(startHour, 10) + 1).padStart(2, "0");
                            return `${startHour}h-${endHour}h`;
                          })()}
                        </h3>

                        <span className="text-sm font-semibold">{item.type}</span>
                        <span className="text-xs font-light text-gray-700">{item.nivel}</span>
                        <span className="text-xs font-light text-gray-500">{item.profesor}</span>
                        {item.nuevoGrupo && (
                          <span className="mt-1 w-fit rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                            Nuevo grupo
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Tarifas */}
      <div className="bg-white px-6 p-3 md:hidden">

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
          <button className="bg-neutral-100 text-black px-4 py-2 rounded-2xl w-full h-12 text-xl">
            Busca el curso para ti
            </button>
        </div>

      </div>

      <div className="hidden md:flex w-full flex-col items-start gap-6 px-6">

        <h1 className="text-6xl font-normal mt-10 mb-10">Tarifas</h1>
        
        {/* cards horizontales */}
        <div className="flex w-full flex-wrap items-stretch justify-between gap-x-6 gap-y-8">
          
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