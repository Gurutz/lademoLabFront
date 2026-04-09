import { SECTION_TITLE_COLUMN } from "../../../config/sectionContentLayout"
import { valuePillars } from "../../../config/homePageContent"

export const ValuesSection = () => {
  return (
    <section
      className="border-b border-black/8 bg-[#aaf] pb-20 pt-10 md:pb-28 md:pt-30"
      aria-labelledby="values-heading"
    >
      <div className={SECTION_TITLE_COLUMN}>
        <h2
          id="values-heading"
          className="max-w-[20ch] text-4xl font-light leading-[1.02] tracking-[-0.02em] text-black sm:text-5xl md:text-[2.6rem] md:leading-[1.05] lg:text-[4.2rem] lg:leading-none"
        >
          Lo que nos mueve
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-4 lg:gap-6">
          {valuePillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className={`flex min-w-0 flex-col gap-6 ${
                i > 0 ? "lg:border-l lg:border-black/20 lg:pl-6 xl:pl-8" : ""
              }`}
            >
              <h3 className="text-[24px] font-normal leading-7 text-black">
                {pillar.title}
              </h3>
              <p className="text-[20px] leading-8 text-black">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
