import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout"
import { rentSpaceItems, rentSpacesIntro } from "../../../config/homePageContent"

export const RentSpacesSection = () => {
  const items = rentSpaceItems
  const targetRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [maxShift, setMaxShift] = useState(0)
  const [trackHeight, setTrackHeight] = useState("120dvh")

  useLayoutEffect(() => {
    const row = rowRef.current
    const vp = viewportRef.current
    if (!row || !vp) return

    const measure = () => {
      const ms = row.scrollWidth - vp.clientWidth
      const shift = ms > 0 ? ms : 0
      setMaxShift(shift)
      const vh = window.innerHeight
      setTrackHeight(`${Math.max(shift * 0.55, vh * 1.15)}px`)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    ro.observe(vp)
    return () => ro.disconnect()
  }, [items.length])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 32,
    mass: 0.35,
    restDelta: 0.0005,
  })

  const x = useTransform(smoothProgress, [0, 1], [0, -maxShift])

  return (
    <section
      className="border-b border-black/8 bg-white"
      aria-labelledby="rent-spaces-heading"
    >
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
              className="flex w-max flex-nowrap gap-8 will-change-transform md:gap-10 lg:gap-12"
            >
              <div className="flex w-[min(90vw,400px)] shrink-0 flex-col justify-between gap-10 pb-2 md:w-[min(100vw,360px)]">
                <div>
                  <h2
                    id="rent-spaces-heading"
                    className="max-w-[22rem] text-4xl font-light leading-[1.02] tracking-[-0.02em] text-black sm:text-5xl md:text-[2.6rem] md:leading-[1.05] lg:text-[4.2rem] lg:leading-none"
                  >
                    Alquila salas y espacios
                  </h2>
                  <p className="mt-8 max-w-[22rem] text-[17px] leading-[1.45] text-black sm:text-[18px] md:text-[20px] md:leading-[1.36]">
                    {rentSpacesIntro}
                  </p>
                  <Link
                    to="/alquiler-de-salas"
                    className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#aaf] px-8 text-[18px] font-medium text-black transition hover:bg-[#8888ff]"
                  >
                    Más info
                  </Link>
                </div>
              </div>

              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex w-[min(90vw,432px)] shrink-0 flex-col gap-8 md:w-[min(432px,70vw)] lg:w-[432px]"
                >
                  <div className="relative aspect-[432/556] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={item.imageSrc}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[20px] leading-[1.36] text-black">
                    {item.caption}
                  </p>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
