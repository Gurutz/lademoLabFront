import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useScrollStore } from "../store/useScrollStore";
import { useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { SECTION_TITLE_COLUMN } from "../../config/sectionContentLayout";

type MobileSectionItem = {
  title?: string;
  descripcion?: string;
  video?: boolean;
  videoUrl?: string;
  image?: string;
  buttonArrowRight?: boolean;
};

interface HorizontalScrollProps {
  id: string;
  items: unknown[];
  renderItem: (item: unknown, index: number) => ReactNode;
  title?: string;
  className?: string;
  /** Altura de scroll vertical por cada “parada” de tarjeta (en unidades dvh) */
  dvhPerCard?: number;
}

export const HorizontalScroll = ({
  id,
  items = [],
  renderItem,
  title,
  className,
  dvhPerCard = 55,
}: HorizontalScrollProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const { setScrollData } = useScrollStore();

  const [stepPx, setStepPx] = useState(432);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row?.firstElementChild) return;

    const measure = () => {
      const first = row.firstElementChild as HTMLElement;
      const styles = getComputedStyle(row);
      const gap = parseFloat(styles.gap || styles.columnGap || "32") || 32;
      setStepPx(first.offsetWidth + gap);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    if (row.firstElementChild) ro.observe(row.firstElementChild as Element);
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 1) {
      setScrollData(latest, id);
    } else if (latest === 0 || latest === 1) {
      setScrollData(latest, null);
    }
  });

  const { inputRange, outputPx } = useMemo(() => {
    const n = items.length;
    if (n <= 1) {
      return { inputRange: [0, 1] as number[], outputPx: [0, 0] as number[] };
    }
    const inputs = Array.from({ length: n }, (_, i) => (n === 1 ? 0 : i / (n - 1)));
    const outputs = Array.from({ length: n }, (_, i) => -i * stepPx);
    return { inputRange: inputs, outputPx: outputs };
  }, [items.length, stepPx]);

  const x = useTransform(smoothProgress, inputRange, outputPx);

  /** Al avanzar el scroll horizontal: opacidad a 0 y ancho a 0 para no reservar espacio ni recortar texto */
  const titleT = [0, 0.055, 0.11] as const;
  const titleOpacity = useTransform(smoothProgress, [...titleT], [1, 0.2, 0]);
  const titleWidthPx = useTransform(smoothProgress, [...titleT], [300, 48, 0]);
  const titleMarginEnd = useTransform(smoothProgress, [...titleT], [24, 8, 0]);

  const [titleHidden, setTitleHidden] = useState(false);
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setTitleHidden(v > 0.08);
  });

  const trackHeight = `${Math.max(items.length, 1) * dvhPerCard}dvh`;

  return (
    <div className="relative z-10 mt-20 isolate">
      {/* Mobile: secciones en columna */}
      <div className={`relative z-10 bg-white md:hidden overflow-x-hidden py-10 ${className ?? ""}`}>
        <div className={SECTION_TITLE_COLUMN}>
          {title ? (
            <h2 className="min-h-22 text-left text-7xl font-extralight leading-[1.05] tracking-tight text-black">
              {title}
            </h2>
          ) : null}
        </div>

        <div className={`space-y-14 pt-6 ${SECTION_TITLE_COLUMN}`}>
          {items.map((rawItem, index) => {
            const item = rawItem as MobileSectionItem;
            const hasKnownShape =
              typeof item === "object" &&
              item !== null &&
              ("title" in item || "descripcion" in item || "videoUrl" in item || "image" in item);

            if (!hasKnownShape) {
              return <div key={index}>{renderItem(rawItem, index)}</div>;
            }

            return (
              <section key={index} className="space-y-6">
                <div className="space-y-4">
                  {item.title ? (
                    <h3 className="text-left text-4xl font-medium leading-tight tracking-tight text-black">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.descripcion ? (
                    <p className="text-left text-lg leading-relaxed text-black/80">
                      {item.descripcion}
                    </p>
                  ) : null}
                  {item.buttonArrowRight ? (
                    <button className="inline-flex items-center rounded-full bg-(--bg-schedule-purple) px-5 py-2 text-base font-medium text-black">
                      Apúntate
                    </button>
                  ) : null}
                </div>

                <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
                  {item.video && item.videoUrl ? (
                    <video
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full aspect-4/5 object-cover"
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.title ?? "Card image"}
                      className="w-full aspect-4/5 object-cover"
                    />
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Desktop: carrusel horizontal */}
      <motion.div
        ref={targetRef}
        style={{ height: trackHeight }}
        className={`relative z-10 hidden bg-white md:block ${className ?? ""}`}
      >
        <div className="sticky top-16 flex w-full items-start md:top-20 md:min-h-[calc(100vh-5rem)]">
          <div
            className={`flex w-full items-start overflow-x-hidden py-8 md:py-10 ${SECTION_TITLE_COLUMN}`}
          >
            {title ? (
              <motion.div
                style={{
                  opacity: titleOpacity,
                  width: titleWidthPx,
                  marginRight: titleMarginEnd,
                  overflow: "hidden",
                }}
                className={`z-20 min-w-0 shrink-0 ${
                  titleHidden ? "pointer-events-none select-none" : ""
                }`}
                aria-hidden={titleHidden}
              >
                <h2 className="line-clamp-2 min-w-0 -mt-1 text-left text-2xl font-light leading-tight tracking-tight text-black md:-mt-2 md:text-5xl">
                  {title}
                </h2>
              </motion.div>
            ) : null}

            <div className="flex flex-1 items-start justify-center gap-8 px-2">
              <motion.div
                ref={rowRef}
                style={{ x }}
                className="flex items-start gap-8 will-change-transform"
              >
                {items.map((item, index) => (
                  <div key={index} className="shrink-0">
                    {renderItem(item, index)}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
