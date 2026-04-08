import { ArrowRight } from "lucide-react";

interface Props {
    item: any;
}

export const CardsHorizontalScroll = ({ item }: Props) => {
  return (
    <div
      className={`flex w-[400px] flex-col items-start gap-4 p-8 text-white ${item.color}`}
    >
        <div className="relative h-[283px] w-[195px] shrink-0 overflow-hidden bg-black/5">
            {item.video ? (
            <video
                muted
                loop
                autoPlay
                playsInline
                className="h-[283px] w-[195px] object-cover object-left"
            >
                <source
                src={item.videoUrl}
                type="video/mp4"
                />
            </video>
            ) : (
            <img
                src={item.image}
                alt={item.title}
                className="h-[283px] w-[195px] object-cover object-left"
            />
            )}
        </div>
        <h2 className="shrink-0 text-3xl font-bold text-black">{item.title}</h2>
        <p className="line-clamp-4 shrink-0 text-black">{item.descripcion}</p>
        {
            item.buttonArrowRight && (
            <button
                type="button"
                aria-label="Apúntate"
                className="group mt-1 inline-flex h-14 min-w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--bg-schedule-purple) px-4 text-black transition-[min-width,gap,padding] duration-300 ease-out hover:min-w-[142px] hover:justify-start hover:gap-1 hover:px-4"
            >
                <span className="inline-block min-w-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity] duration-300 ease-out group-hover:max-w-[86px] group-hover:opacity-100">
                    Apúntate
                </span>
                <ArrowRight className="-mr-px h-6 w-6 shrink-0 text-black" aria-hidden />
            </button>
            )
        }
    </div>
          
  )
}
