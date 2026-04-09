import { ArrowRight, CheckIcon, ChevronDown } from "lucide-react"
import { useMemo, useState } from "react";
import { PriceCard } from "../components/PriceCard";
import { hours, schedule } from "../../../config/Schedule";
import { EnrollmentModal } from "../components/EnrollmentModal";

type AccordionItem = {
  id: string;
  title: string;
  body?: string;
};

const IMG_GIPHY_LINDY = "https://www.figma.com/api/mcp/asset/1b97ea6c-4ea9-4135-9e25-f1356f725342";
const IMG_GIPHY_SOLO = "https://www.figma.com/api/mcp/asset/a0242be0-d5b6-493b-8dd4-9eec567418f4";
const IMG_BRUNO_SHAG = "https://www.figma.com/api/mcp/asset/9df5f517-2aa3-417c-99a5-814b87427b8c";

function AccordionList({
  items,
  className = "",
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-black/8">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="text-[20px] leading-7 tracking-[-0.02em] text-black md:text-[32px] md:leading-8">
                {item.title}
              </span>
              <ChevronDown
                className={`size-6 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {isOpen && item.body ? (
              <div className="pb-6 pr-10 text-[18px] leading-7 text-black/80 md:text-[20px]">
                {item.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

type MobilePlan = {
  id: string;
  title: string;
  bg: string;
  offer?: boolean;
  prices: { month: number; trimester: number };
  footnotes?: { month?: string; trimester?: string };
  perks: Array<{ title: string; muted?: boolean }>;
  heightClass?: string;
};

function MobilePlanCard({ plan, onEnroll }: { plan: MobilePlan; onEnroll: () => void }) {
  return (
    <button
      type="button"
      onClick={onEnroll}
      className={`relative w-full max-w-[350px] cursor-pointer overflow-hidden rounded-[10px] p-5 text-left ${plan.heightClass ?? "h-[344px]"} ${plan.bg}`}
    >
      {plan.offer ? (
        <div className="absolute right-5 top-[18px] inline-flex items-center gap-1 rounded-full bg-white px-2 py-1">
          <span className="text-[15px] leading-6 text-black">Oferta iniciación</span>
          <span aria-hidden className="text-[14px] leading-none">✦</span>
        </div>
      ) : null}

      <h3 className="text-[24px] font-normal leading-7 text-black">{plan.title}</h3>

      <div className="mt-10 flex flex-col gap-2">
        {plan.perks.map((perk, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-[10px] text-[20px] leading-8 text-black ${perk.muted ? "opacity-50" : ""}`}
          >
            <CheckIcon size={18} className="shrink-0" aria-hidden />
            <span>{perk.title}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <div className="relative flex items-end justify-between pt-6">
          <div className="w-1/2">
            <div className="text-[52px] leading-[48px] tracking-[-1.04px] text-black">{plan.prices.month}€</div>
            <div className="mt-1 text-[20px] leading-8 text-black">al mes</div>
            {plan.footnotes?.month ? (
              <div className="mt-1 text-[9px] leading-4 text-black/50">{plan.footnotes.month}</div>
            ) : null}
          </div>

          <div className="w-px self-stretch bg-black/10" aria-hidden />

          <div className="w-1/2 pl-6">
            <div className="text-[52px] leading-[48px] tracking-[-1.04px] text-black">{plan.prices.trimester}</div>
            <div className="mt-1 text-[20px] leading-8 text-black">al trimestre</div>
            {plan.footnotes?.trimester ? (
              <div className="mt-1 text-[9px] leading-4 text-black/50">{plan.footnotes.trimester}</div>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

function mobileActivityRowStyles(item: (typeof schedule)["days"][number]["items"][number]) {
  const normalizedType = item.type.toLowerCase();
  const isSolo = normalizedType.includes("solo");
  const isLightPurple = item.color?.includes("bg-(--bg-schedule-light-purple)");

  if (isSolo || isLightPurple) {
    return {
      row: "bg-[#F5F5FF] border-[#E3E3FF]",
      typeText: "text-[#4848FF]",
    };
  }
  if (item.color?.includes("bg-(--bg-schedule-light-yellow)")) {
    return {
      row: "bg-[#F9FFE6] border-[#EBEBEB]",
      typeText: "text-black",
    };
  }
  return {
    row: "bg-white border-[#EBEBEB]",
    typeText: "text-black",
  };
}

export const ScheduleClasses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"class" | "general">("general");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);

  const classOptions = useMemo(
    () =>
      schedule.days.flatMap((day) =>
        day.items.map((item) => `${day.name} ${item.hora} - ${item.type} (${item.nivel})`),
      ),
    [],
  );

  const danceTypeOptions = useMemo(
    () => Array.from(new Set(schedule.days.flatMap((day) => day.items.map((item) => item.type)))),
    [],
  );

  const openGeneralModal = () => {
    setModalMode("general");
    setSelectedClass(undefined);
    setIsModalOpen(true);
  };

  const openClassModal = (courseLabel: string) => {
    setModalMode("class");
    setSelectedClass(courseLabel);
    setIsModalOpen(true);
  };

  const guideLevels: AccordionItem[] = [
    { id: "lindy", title: "Lindy hop" },
    { id: "solo", title: "Solo Jazz" },
    { id: "shag", title: "Shag" },
  ];

  const faqs: AccordionItem[] = [
    { id: "pareja", title: "¿Tengo que apuntarme en pareja?" },
    { id: "nivel", title: "¿A qué nivel me apunto?" },
    { id: "birole", title: "¿Qué es el Lindy Hop Bi-rol?" },
    { id: "prueba", title: "¿Puedo hacer una clase de prueba?" },
    { id: "recuperar", title: "Si falto a alguna clase, ¿puedo recuperar esa hora?" },
    { id: "frecuencia", title: "¿Cada cuánto son las clases?" },
    { id: "ropa", title: "¿Qué ropa llevo a clase?" },
    { id: "social", title: "¿Qué es el baile social?" },
    { id: "practica", title: "¿Qué es la práctica social?" },
  ];

  const mobilePlans: MobilePlan[] = [
    {
      id: "empiezo",
      title: "Empiezo",
      bg: "bg-(--bg-card-ligth-yellow)",
      offer: true,
      prices: { month: 50, trimester: 140 },
      footnotes: { month: "* Solo para el primer mes", trimester: "* Solo para el primer trimestre" },
      perks: [
        { title: "1 clase a la semana" },
        { title: "1 Practica del viernes al mes", muted: true },
      ],
    },
    {
      id: "meanimo",
      title: "Me animo",
      bg: "bg-(--bg-card-ligth-gray)",
      prices: { month: 55, trimester: 150 },
      perks: [
        { title: "1 clase a la semana" },
        { title: "1 Practica del viernes al mes", muted: true },
      ],
    },
    {
      id: "meengancho",
      title: "Me engancho",
      bg: "bg-(--bg-card-ligth-purple)",
      prices: { month: 95, trimester: 270 },
      perks: [
        { title: "2 clases a la semana" },
        { title: "1 Practica del viernes al mes", muted: true },
        { title: "1 Taller mañanero al trimestre", muted: true },
      ],
    },
    {
      id: "nopuedoparar",
      title: "No puedo parar",
      bg: "bg-[#AAAAFF]",
      heightClass: "h-[404px]",
      prices: { month: 140, trimester: 395 },
      perks: [
        { title: "Acceso a todas las clases" },
        { title: "1 Practica del viernes al mes", muted: true },
        { title: "1 Taller mañanero al trimestre", muted: true },
        { title: "La camiseta de laDemo", muted: true },
      ],
    },
  ];

  return (
    <>
      <section className="bg-[#FAFAFA] px-5 py-10 md:bg-white md:px-10 md:pt-36 md:pb-0">
        <div className="mx-auto w-full max-w-[1440px]">
          <h1 className="max-w-[980px] text-[40px] font-normal leading-10 tracking-[-0.8px] text-black md:text-[105px] md:leading-[100px] md:tracking-[-2.1px]">
            Clases y horarios
          </h1>
          <p className="mt-1 text-[18px] font-normal leading-7 text-black md:mt-8 md:text-[24px] md:leading-7">
            Selecciona una actividad para apuntarte
          </p>

          <div className="mt-8 md:mt-10">
            <button
              type="button"
              onClick={openGeneralModal}
              className="inline-flex h-14 w-full max-w-[350px] items-center justify-center rounded-full bg-[#AAAAFF] px-8 text-[18px] font-normal tracking-[0.1px] text-black transition-colors hover:bg-[#8888FF]"
            >
              Busca el curso para ti
            </button>
          </div>
        </div>
      </section>

      {/* Horario mobile */}

      <section className="bg-white md:hidden">
        {schedule.days.map((day) => (
          <div key={day.name}>
            <div className="border-b border-[#EBEBEB] px-5 py-8">
              <h2 className="text-[40px] font-normal leading-10 tracking-[-0.8px] text-black">{day.name}</h2>
            </div>

            <div className="flex flex-col">
              {day.items.map((item, itemIndex) => {
                const styles = mobileActivityRowStyles(item);
                return (
                  <button
                    key={itemIndex}
                    type="button"
                    onClick={() => openClassModal(`${day.name} ${item.hora} - ${item.type} (${item.nivel})`)}
                    className={`relative h-[84px] w-full border-b border-solid px-[15px] text-left ${styles.row}`}
                  >
                    <div className="flex h-full items-start gap-5 pt-[10px]">
                      <div className="min-w-[54px] text-[18px] leading-6 tracking-[0.1px] text-black">
                        {item.hora}
                      </div>
                      <div className="flex flex-col">
                        <div className={`text-[18px] leading-6 ${styles.typeText}`}>{item.type}</div>
                        <div className="text-[18px] leading-7 text-black">{item.nivel}</div>
                        <div className="mt-[2px] text-[12px] leading-[18px] tracking-[0.1px] text-[#8F8F8F]">
                          {item.profesor}
                        </div>
                      </div>
                    </div>

                    {item.nuevoGrupo ? (
                      <div className="absolute right-[34px] top-[12px] inline-flex items-center gap-1 rounded-full bg-[#EBFFAA] px-2 py-[2px]">
                        <span className="text-[13px] leading-6 text-black">Nuevo grupo</span>
                      </div>
                    ) : null}

                    <ArrowRight
                      size={16}
                      className="absolute right-4 top-[18px] text-black/70"
                      aria-hidden
                    />
                  </button>
                );
              })}
              <div className="h-[84px] border-b border-t border-[#EBEBEB]" />
            </div>
          </div>
        ))}
      </section>


    {/* Horario en desktop */}

      <section className="hidden bg-white px-10 pb-20 md:block">
        <div className="mx-auto w-full max-w-[1440px]">
          <div
            className="grid gap-x-3 gap-y-2"
            style={{ gridTemplateColumns: `100px repeat(${schedule.days.length}, 1fr)` }}
          >
          {/* Fila de encabezados: esquina vacía + nombre de cada día */}
          <div />
          {schedule.days.map((day, dIndex) => (
            <div key={dIndex} className="flex h-[70px] items-center justify-center">
              <h3 className="text-[24px] font-normal leading-7 text-center">{day.name}</h3>
            </div>
          ))}

          {/* Filas por hora */}
          {hours.filter((h) => h.active).map((hour, hIndex) => (
            <>
              {/* Columna izquierda: hora */}
              <div key={`hour-${hIndex}`} className="flex h-[172px] items-start pt-3">
                <div className="flex items-start justify-start">
                  <span className="text-[24px] font-normal leading-7 text-black">{hour.title}</span>
                </div>
              </div>

              {/* Columnas: una celda por día */}
              {schedule.days.map((day, dIndex) => {
                const items = day.items.filter((item) => item.hora === hour.title);
                return (
                  <div
                    key={`cell-${hIndex}-${dIndex}`}
                    className="flex min-h-[172px] flex-col gap-3 rounded-xl p-1"
                  >
                    {items.map((item, iIndex) => (
                      <button
                        type="button"
                        onClick={() => openClassModal(`${day.name} ${item.hora} - ${item.type} (${item.nivel})`)}
                        key={iIndex}
                        className={`${item.color ?? "border border-gray-400 rounded"} flex cursor-pointer flex-col gap-1 rounded-[12px] p-4 text-left transition hover:scale-[1.01]`}
                      >
                        <span className="text-[14px] leading-5 text-black/80">
                          {(() => {
                            const startHour = item.hora.split(":")[0].padStart(2, "0");
                            const endHour = String(parseInt(startHour, 10) + 1).padStart(2, "0");
                            return `${startHour}h-${endHour}h`;
                          })()}
                        </span>

                        <span className="text-[16px] font-semibold leading-5 text-black">{item.type}</span>
                        <span className="text-[12px] font-light leading-4 text-black/70">{item.nivel}</span>
                        <span className="text-[12px] font-light leading-4 text-black/60">{item.profesor}</span>
                        {item.nuevoGrupo && (
                          <span className="mt-2 w-fit rounded-full bg-[#EBFFAA] px-2 py-1 text-[12px] leading-4 text-black">
                            Nuevo grupo
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
          </div>
        </div>
      </section>

      {/* Tarifas */}
      <section className="bg-white px-5 pb-16 pt-14 md:hidden">
        <div className="mx-auto w-full max-w-[350px]">
          <h2 className="text-[40px] font-normal leading-[48px] tracking-[-0.8px] text-black">Tarifas</h2>
          <div className="mt-6 flex flex-col gap-5">
            {mobilePlans.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} onEnroll={openGeneralModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Guía de niveles (mobile) */}
      <section className="bg-white px-5 py-14 md:hidden">
        <div className="mx-auto w-full max-w-[350px]">
          <h2 className="text-[40px] font-normal leading-[48px] tracking-[-0.8px] text-black">Guía de niveles</h2>
        </div>
      </section>

      <section className="hidden bg-white px-10 py-20 md:block">
        <div className="mx-auto w-full max-w-[1440px]">

        <h2 className="text-[52px] font-normal leading-[48px] tracking-[-1.04px] text-black md:text-[67.402px] md:leading-[65.717px] md:tracking-[-1.348px]">
          Tarifas
        </h2>
        
        {/* cards horizontales */}
        <div className="mt-14 flex w-full flex-wrap items-stretch justify-between gap-x-6 gap-y-8">
          
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
            onEnroll={openGeneralModal}
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
            onEnroll={openGeneralModal}
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
            onEnroll={openGeneralModal}
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
            onEnroll={openGeneralModal}
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-16 gap-y-4 border-b border-black/8 pb-10">
          <a className="text-[20px] leading-8 text-black underline underline-offset-4" href="/metodos-de-pago">
            Métodos de pago
          </a>
          <a className="text-[20px] leading-8 text-black underline underline-offset-4" href="/normativa">
            Consulta la normativa
          </a>
        </div>
        </div>
      </section>

      {/* Guía de niveles */}
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="text-[52px] font-normal leading-[48px] tracking-[-1.04px] text-black md:text-[67.402px] md:leading-[65.717px] md:tracking-[-1.348px]">
            Guía de niveles
          </h2>
          <AccordionList items={guideLevels} className="mt-10" />
        </div>
      </section>

      {/* Impartimos clases de */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="max-w-[600px] whitespace-pre-wrap text-[52px] font-normal leading-[48px] tracking-[-1.04px] text-black md:text-[67.402px] md:leading-[65.717px] md:tracking-[-1.348px]">
            {"Empartimos \nclases de"}
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Lindy hop</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                El baile en pareja más emblemático del swing, nacido en los clubs de Harlem, donde cada noche sonaban
                las mejores bandas de jazz y se bailaba nonstop.{" "}
                <span className="underline underline-offset-4">Descubre más</span>
              </p>
            </div>
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Solo jazz</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                El baile individual del swing, lleno de juegos rítmicos e improvisación. También heredero de las raíces
                afro del swing, ha inspirado a bailes urbanos posteriores como el hip hop.{" "}
                <span className="underline underline-offset-4">Descubre más</span>
              </p>
            </div>
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Shag</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                Otro baile en pareja del swing, muy enérgico e ideal para bailar con ritmos rápidos. Uno de los bailes
                más alegres y juguetones, caracterizado por su agilidad de pies.{" "}
                <span className="underline underline-offset-4">Descubre más</span>
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-10">
            <div className="flex justify-start">
              <img src={IMG_GIPHY_LINDY} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
            <div className="flex justify-start">
              <img src={IMG_GIPHY_SOLO} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
            <div className="flex justify-start">
              <img src={IMG_BRUNO_SHAG} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* También ofrecemos */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="max-w-[600px] text-[52px] font-normal leading-[48px] tracking-[-1.04px] text-black md:text-[67.402px] md:leading-[65.717px] md:tracking-[-1.348px]">
            También ofrecemos
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Clases privadas</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                Si ya llevas un tiempo bailando y quieres trabajar en algo concreto (técnica, musicalidad, conexión),
                pero no sabes cómo dar el siguiente paso, podemos acompañarte en una clase individual totalmente
                personalizada. Pregúntanos disponibilidad y precios a{" "}
                <a className="underline underline-offset-4" href="mailto:hola@lademoswinglab.es" target="_blank" rel="noreferrer">
                  hola@lademoswinglab.es
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Coreografías</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                ¿Tienes una fecha especial y quieres sorprender con una coreografía inolvidable? Ya sea para una boda,
                un evento de empresa o una celebración, nos encargamos de diseñar una coreografía a tu medida y
                enseñártela paso a paso. Pregúntanos más info a{" "}
                <a className="underline underline-offset-4" href="mailto:hola@lademoswinglab.es" target="_blank" rel="noreferrer">
                  hola@lademoswinglab.es
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-[32px] leading-8 tracking-[-0.64px] text-black">Espectáculos</h3>
              <p className="mt-4 text-[20px] leading-7 text-black">
                Si buscas bailarines/coreógrafos para espectáculos en vivo, producciones audiovisuales, o cualquier tipo
                de evento que requiera de un cuerpo de baile, creamos propuestas adaptadas a las necesidades de cada
                proyecto. Pregúntanos disponibilidad y precios a{" "}
                <a className="underline underline-offset-4" href="mailto:hola@lademoswinglab.es" target="_blank" rel="noreferrer">
                  hola@lademoswinglab.es
                </a>
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-10">
            <div className="flex justify-start">
              <img src={IMG_GIPHY_LINDY} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
            <div className="flex justify-start">
              <img src={IMG_GIPHY_SOLO} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
            <div className="flex justify-start">
              <img src={IMG_BRUNO_SHAG} alt="" className="size-[140px] rounded-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="text-[52px] font-normal leading-[48px] tracking-[-1.04px] text-black md:text-[67.402px] md:leading-[65.717px] md:tracking-[-1.348px]">
            FAQS
          </h2>
          <AccordionList items={faqs} className="mt-10" />
        </div>
      </section>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        preselectedClass={selectedClass}
        classOptions={classOptions}
        danceTypeOptions={danceTypeOptions}
      />
    </>
  );
};