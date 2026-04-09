import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout"
import { upcomingEvents } from "../../../config/homePageContent"

export const UpcomingEventsSection = () => {
  return (
    <section
      className="border-b border-black/8 bg-white pb-16 pt-10 md:pb-24 md:pt-30"
      aria-labelledby="events-heading"
    >
      <div className={`${SECTION_TITLE_COLUMN} mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between`}>
        <h2
          id="events-heading"
          className="max-w-4xl text-4xl font-light leading-[1.02] tracking-[-0.02em] text-black sm:text-5xl md:text-[2.6rem] md:leading-[1.05] lg:text-[4.2rem] lg:leading-none"
        >
          Próximos eventos
        </h2>
        <Link
          to="/eventos/proximos"
          className="w-fit shrink-0 text-[28px] font-normal leading-[30px] text-black transition hover:opacity-70"
        >
          Ver todos
        </Link>
      </div>

      <div className={`${SECTION_TITLE_COLUMN} flex flex-col`}>
        {upcomingEvents.map((row) => (
          <div
            key={row.id}
            className="flex flex-col gap-6 border-t border-black/15 py-8 first:border-t-0 first:pt-0 md:flex-row md:items-center md:gap-10 md:py-10"
          >
            <div className="relative size-[140px] shrink-0 overflow-hidden bg-neutral-100">
              <img
                src={row.imageSrc}
                alt=""
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="min-w-0 shrink-0 text-[28px] leading-[30px] text-black md:w-[200px]">
              {row.dateLabel}
            </p>
            <p className="min-w-0 flex-1 text-[28px] leading-[30px] text-black">
              {row.title}
            </p>
            <button
              type="button"
              aria-label={`Apúntate — ${row.title}`}
              className="flex size-14 shrink-0 items-center justify-center self-start rounded-full bg-[#aaf] text-black transition hover:bg-[#8888ff] md:self-center"
            >
              <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
