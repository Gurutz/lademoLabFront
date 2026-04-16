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
            className="group flex flex-col gap-6 border-t border-black/15 py-8 transition-colors first:border-t-0 first:pt-0 md:flex-row md:items-center md:gap-10 md:py-10 md:hover:bg-black/3 md:px-4 md:-mx-4"
          >
            <div className="relative size-[140px] shrink-0 overflow-hidden bg-neutral-100">
              <img
                src={row.imageSrc}
                alt=""
                className="size-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.06]"
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
              className="group flex h-14 w-14 shrink-0 items-center justify-center gap-0 self-start overflow-hidden rounded-full bg-[#aaf] text-black transition-[width,gap,padding,background-color] duration-300 ease-out hover:bg-[#8888ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 md:self-center md:hover:w-[180px] md:hover:justify-start md:hover:gap-2 md:hover:pl-4 md:hover:pr-5"
            >
              <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
              <span className="hidden text-sm font-medium md:inline-block md:max-w-0 md:overflow-hidden md:whitespace-nowrap md:opacity-0 md:transition-[max-width,opacity] md:duration-300 md:ease-out md:group-hover:max-w-[86px] md:group-hover:opacity-100">
                Apúntate
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
