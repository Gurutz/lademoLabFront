import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useScrollStore } from "../store/useScrollStore";
import { useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";

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
    <motion.div
      ref={targetRef}
      style={{ height: trackHeight }}
      className={`relative z-50 bg-neutral-100 ${className ?? ""}`}
    >
      <div className="sticky top-0 flex h-screen min-h-dvh items-center overflow-hidden">
        <div className="flex w-full max-w-[100vw] px-6 md:px-10">
          {title ? (
            <motion.div
              style={{
                opacity: titleOpacity,
                width: titleWidthPx,
                marginRight: titleMarginEnd,
                overflow: "hidden",
              }}
              className={`z-20 min-w-0 shrink-0 -mt-50 ${
                titleHidden ? "pointer-events-none select-none" : ""
              }`}
              aria-hidden={titleHidden}
            >
              <h2 className="line-clamp-2 min-w-0 text-left text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl lg:text-4xl">
                {title}
              </h2>
            </motion.div>
          ) : null}

          <div className="flex gap-8 px-2 flex-1">
            <motion.div
              ref={rowRef}
              style={{ x }}
              className="flex items-center gap-8 will-change-transform"
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
  );
};
