import { useState } from "react"
import { Link } from "react-router-dom"
import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=C%2FMagdalena%207%2C%20Tirso%20de%20Molina%2C%2028005%20Madrid"

/** Sustituye por el número real (E.164 sin + en wa.me). */
const WHATSAPP_URL = "https://wa.me/34600000000"
/** Sustituye por el teléfono real. */
const PHONE_TEL = "tel:+34600000000"

const linkClass =
  "block w-fit text-[20px] leading-8 text-white transition-opacity hover:opacity-80"

const webLinks: { label: string; to: string }[] = [
  { label: "Clases y horarios", to: "/clases/horarios-niveles" },
  { label: "Alquiler de salas", to: "/alquiler-de-salas" },
  { label: "Eventos", to: "/eventos/proximos" },
  { label: "La escuela", to: "/about" },
  { label: "Métodos de pago", to: "/metodos-pago" },
  { label: "Normativa de la escuela", to: "/normativa-escuela" },
  { label: "Código de conducta", to: "/codigo-conducta" },
]

const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Tiktok", href: "https://www.tiktok.com/" },
  { label: "You tube", href: "https://www.youtube.com/" },
]

type AccordionId = "web" | "contact" | "social"

export interface FooterDesktopProps {
  className?: string
}

export const FooterDesktop = ({ className }: FooterDesktopProps) => {
  const [openAccordion, setOpenAccordion] = useState<AccordionId | null>(null)

  const toggleAccordion = (id: AccordionId) => {
    setOpenAccordion((prev) => (prev === id ? null : id))
  }

  return (
    <footer
      className={clsx(
        "relative overflow-hidden border-b border-white/20 bg-[#0f0f0f] text-[#bdbdbd]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light"
        aria-hidden
        style={{
          backgroundImage: "url(/footer-noise.png)",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10">
        {/* Mobile-first (Figma 392:3518) */}
        <div className="px-5 pb-16 pt-9 lg:hidden">
          <Link
            to="/"
            className="inline-flex flex-col gap-[12px]"
            aria-label="LaDemo — inicio"
          >
            <img
              src="/footer-logo-lademo.png"
              alt=""
              width={263}
              height={60}
              className="h-[43.98px] w-[194px] max-w-full object-contain object-left"
            />
            <img
              src="/footer-logo-swinglab.png"
              alt=""
              width={98}
              height={21}
              className="h-[14.97px] w-[72.58px] max-w-full object-contain object-left"
            />
          </Link>

          <div className="mt-16 flex flex-col divide-y divide-white/20">
            <div className="py-1">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={openAccordion === "web"}
                onClick={() => toggleAccordion("web")}
              >
                <span className="text-[24px] font-normal leading-7 text-white">
                  Busca en la web
                </span>
                <ChevronDown
                  className={clsx(
                    "size-6 shrink-0 text-white transition-transform duration-200",
                    openAccordion === "web" && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              {openAccordion === "web" && (
                <nav
                  className="flex flex-col gap-5 pb-5 pt-1"
                  aria-label="Enlaces del sitio"
                >
                  {webLinks.map((item) => (
                    <Link key={item.to} to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            <div className="py-1">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={openAccordion === "contact"}
                onClick={() => toggleAccordion("contact")}
              >
                <span className="text-[24px] font-normal leading-7 text-white">
                  Contáctanos
                </span>
                <ChevronDown
                  className={clsx(
                    "size-6 shrink-0 text-white transition-transform duration-200",
                    openAccordion === "contact" && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              {openAccordion === "contact" && (
                <nav
                  className="flex flex-col gap-5 pb-5 pt-1"
                  aria-label="Contacto"
                >
                  <a
                    href={WHATSAPP_URL}
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Whatsapp
                  </a>
                  <Link to="/about" className={linkClass}>
                    Email
                  </Link>
                  <a href={PHONE_TEL} className={linkClass}>
                    Llamanos
                  </a>
                </nav>
              )}
            </div>

            <div className="py-1">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={openAccordion === "social"}
                onClick={() => toggleAccordion("social")}
              >
                <span className="text-[24px] font-normal leading-7 text-white">
                  Síguenos
                </span>
                <ChevronDown
                  className={clsx(
                    "size-6 shrink-0 text-white transition-transform duration-200",
                    openAccordion === "social" && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              {openAccordion === "social" && (
                <nav
                  className="flex flex-col gap-5 pb-5 pt-1"
                  aria-label="Redes sociales"
                >
                  {socialLinks.map((item) => (
                    <a
                      key={item.href + item.label}
                      href={item.href}
                      className={linkClass}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>

          <section className="mt-28 flex flex-col gap-5">
            <h2 className="text-[24px] font-normal leading-7 text-white">
              Espacio laDemo
            </h2>
            <div className="text-[20px] leading-8 text-white">
              <p className="mb-0">
                C/Magdalena 7<span> (Tirso de Molina)</span>
              </p>
              <p className="mt-0">
                <span>28005 – Madrid</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative ml-2 inline-block text-[#7b7b7b] transition-opacity hover:opacity-80"
                >
                  Google map
                  <span className="pointer-events-none absolute -bottom-1 left-0 block h-px w-[102px]">
                    <img
                      src="/footer-underline.svg"
                      alt=""
                      className="h-px w-[102px]"
                      width={102}
                      height={1}
                    />
                  </span>
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Desktop */}
        <div className="mx-auto hidden max-w-[1440px] px-8 pb-16 pt-14 lg:block lg:px-11 lg:pb-24 lg:pt-16">
          <Link
            to="/"
            className="mb-12 inline-flex flex-col gap-1 lg:mb-29"
            aria-label="LaDemo — inicio"
          >
            <img
              src="/footer-logo-lademo.png"
              alt=""
              width={263}
              height={60}
              className="h-[59.627px] w-[263px] max-w-full object-contain object-left"
            />
            <img
              src="/footer-logo-swinglab.png"
              alt=""
              width={98}
              height={21}
              className="h-[20.294px] w-[98.395px] max-w-full object-contain object-left"
            />
          </Link>

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
            <section className="flex flex-col gap-7 lg:w-[197px] lg:shrink-0 lg:pr-10">
              <h2 className="text-[24px] font-normal leading-7">Espacio laDemo</h2>
              <div className="flex flex-col gap-0 text-[20px] leading-8 text-white">
                <p>C/Magdalena 7</p>
                <p>Tirso de Molina</p>
                <p>28005 – Madrid</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-1 inline-block w-fit text-[#7b7b7b] transition-opacity hover:opacity-80"
                >
                  Google map
                  <span className="pointer-events-none absolute -bottom-1 left-0 block h-px w-[102px]">
                    <img
                      src="/footer-underline.svg"
                      alt=""
                      className="h-px w-[102px]"
                      width={102}
                      height={1}
                    />
                  </span>
                </a>
              </div>
            </section>

            <div
              className="hidden w-px shrink-0 self-stretch bg-white/20 lg:block"
              aria-hidden
            />

            <section className="flex flex-1 flex-col gap-7 lg:min-w-0 lg:pl-10 lg:pr-8">
              <h2 className="text-[24px] font-normal leading-7">Busca en la web</h2>
              <nav className="flex flex-col gap-5" aria-label="Enlaces del sitio">
                {webLinks.map((item) => (
                  <Link key={item.to} to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </section>

            <section className="flex flex-col gap-7 lg:w-[175px] lg:shrink-0">
              <h2 className="text-[24px] font-normal leading-7">Síguenos</h2>
              <nav className="flex flex-col gap-5" aria-label="Redes sociales">
                {socialLinks.map((item) => (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </section>

            <section className="flex flex-col gap-7 lg:w-[167px] lg:shrink-0">
              <h2 className="text-[24px] font-normal leading-7">Contáctanos</h2>
              <nav className="flex flex-col gap-5" aria-label="Contacto">
                <a
                  href={WHATSAPP_URL}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whatsapp
                </a>
                <Link to="/about" className={linkClass}>
                  Email
                </Link>
                <a href={PHONE_TEL} className={linkClass}>
                  Llamanos
                </a>
              </nav>
            </section>
          </div>
        </div>
      </div>
    </footer>
  )
}
