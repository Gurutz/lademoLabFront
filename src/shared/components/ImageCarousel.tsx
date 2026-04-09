import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ImageCarouselItem {
  id: string | number;
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  items: ImageCarouselItem[];
  className?: string;
}

export const ImageCarousel = ({ items, className = "" }: ImageCarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;
  const hasItems = total > 0;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < total - 1;

  const indexes = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;

    track.scrollTo({
      left: child.offsetLeft - 16,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const firstChild = track.children[0] as HTMLElement;
    const cardWidth = firstChild.offsetWidth + 16; // 16px = gap-4
    const nextIndex = Math.round(track.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(nextIndex, total - 1)));
  };

  if (!hasItems) return null;

  return (
    <section className={`w-full bg-neutral-100 py-8 md:py-12 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="shrink-0 snap-center overflow-hidden rounded-none bg-white w-[86%] sm:w-[72%] md:w-[64%] lg:w-[58%]"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-[420px] w-full object-cover md:h-[520px]"
                loading="lazy"
              />
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            {indexes.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? "w-6 bg-black" : "w-2.5 bg-black/25"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(currentIndex - 1)}
              disabled={!canGoPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-black disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(currentIndex + 1)}
              disabled={!canGoNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-black disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
