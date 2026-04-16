import { useLayoutEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout";
import type { SectionCarouselItem } from "../../../config/sectionCarouselItems";

interface Props {
  title: string;
  /** Texto opcional bajo el título (no aparece en el frame desktop 348:2265). */
  description?: string;
  items: SectionCarouselItem[];
  showButton: boolean;
  className?: string;
}

export const ClassesSectionComponent = ({
  title,
  description,
  items,
  showButton,
  className = "",
}: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [trackHeight, setTrackHeight] = useState("120dvh");

  useLayoutEffect(() => {
    const row = rowRef.current;
    const vp = viewportRef.current;
    if (!row || !vp) return;

    const measure = () => {
      const ms = row.scrollWidth - vp.clientWidth;
      const shift = ms > 0 ? ms : 0;
      setMaxShift(shift);
      const vh = window.innerHeight;
      setTrackHeight(`${Math.max(shift * 0.55, vh * 1.15)}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [items.length]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 32,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -maxShift]);

  const ctaButtonClass =
    "group mt-8 inline-flex h-14 w-14 shrink-0 items-center justify-center gap-0 overflow-hidden rounded-full bg-[#aaf] text-black transition-[width,gap,padding,background-color,transform,box-shadow] duration-300 ease-out hover:w-[180px] hover:justify-start hover:gap-2 hover:bg-[#8888ff] hover:pl-4 hover:pr-5 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 md:mt-auto";

  return (
    <section
      className={`border-b border-black/8 bg-white ${className}`}
      aria-labelledby="section-carousel-heading"
    >
      {/* Móvil: columna apilada (sin scroll horizontal ligado al vertical) */}
      <div className="md:hidden">
        <div
          className={`${SECTION_TITLE_COLUMN} flex shrink-0 flex-col justify-between pb-6 pt-10`}
        >
          <div>
            <h2
              id="section-carousel-heading"
              className="max-w-84 text-4xl font-light leading-[1.02] tracking-[-0.02em] text-black sm:text-5xl"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-md text-lg font-normal text-black/80 md:text-xl">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`${SECTION_TITLE_COLUMN} flex flex-col gap-12 pb-10`}>
          {items.map((item) => (
            <article key={item.id} className="flex flex-col">
              <div className="relative aspect-195/283 w-[min(100%,195px)] overflow-hidden bg-neutral-100">
                <img
                  src={item.imageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-8 text-[28px] font-normal leading-8 tracking-tight text-black">
                {item.cardTitle}
              </h3>
              <p className="mt-4 max-w-[20rem] text-[17px] leading-[1.45] text-black sm:text-[18px]">
                {item.description}
              </p>
              {showButton ? (
                <button
                  type="button"
                  className={ctaButtonClass}
                  aria-label="Apúntate"
                >
                  <ChevronRight className="size-6 shrink-0 text-black" strokeWidth={2} />
                  <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover:max-w-[86px] group-hover:opacity-100">
                    Apúntate
                  </span>
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      {/* Desktop: carril horizontal ligado al scroll vertical de la página */}
      <div className="hidden md:block">
        <motion.div
          ref={targetRef}
          style={{ height: trackHeight }}
          className="relative"
        >
          <div
            className={`sticky top-[108px] z-10 flex min-h-[calc(100dvh-108px)] w-full items-center overflow-hidden py-10 md:py-24 ${SECTION_TITLE_COLUMN}`}
          >
            <div ref={viewportRef} className="w-full overflow-hidden">
              <motion.div
                ref={rowRef}
                style={{ x }}
                className="flex w-max flex-nowrap items-stretch gap-10 will-change-transform md:gap-16 lg:gap-24 xl:gap-[126px]"
              >
                <div className="flex w-[min(90vw,360px)] shrink-0 flex-col justify-between pb-2 md:w-[min(100vw,360px)]">
                  <div>
                    <h2 className="max-w-84 text-4xl font-light leading-[1.02] tracking-[-0.02em] text-black sm:text-5xl md:text-[2.6rem] md:leading-[1.05] lg:text-[4.2rem] lg:leading-none">
                      {title}
                    </h2>
                    {description ? (
                      <p className="mt-4 max-w-md text-lg font-normal text-black/80 md:text-xl">
                        {description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {items.map((item) => (
                  <article
                    key={item.id}
                    className="group flex min-h-[612px] w-[min(316px,calc(100vw-5rem))] shrink-0 flex-col md:w-[316px]"
                  >
                    <div className="relative h-[283px] w-[195px] max-w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.imageSrc}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-[61px] text-[32px] font-normal leading-8 text-black">
                      {item.cardTitle}
                    </h3>
                    <p className="mt-4 max-w-[300px] text-[20px] leading-[1.36] text-black">
                      {item.description}
                    </p>
                    {showButton ? (
                      <button
                        type="button"
                        className={ctaButtonClass}
                        aria-label="Apúntate"
                      >
                        <ChevronRight
                          className="size-6 shrink-0 text-black"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover:max-w-[86px] group-hover:opacity-100">
                          Apúntate
                        </span>
                      </button>
                    ) : null}
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
