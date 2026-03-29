import { ArrowRight } from "lucide-react";

interface Props {
    item: any;
}

export const CardsHorizontalScroll = ({ item }: Props) => {
  return (
    <div className={`w-[400px] h-[500px] p-8 text-white flex flex-col justify-end ${item.color}`}>
        {
            item.video ? (
            <video
                muted
                loop
                autoPlay
                className="w-full min-h-[450px] max-h[450px] object-cover rounded-2xl"
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
                className="w-full min-h-[450px] max-h[450px] object-cover rounded-2xl"
            />
            )
        }
        <h2 className="text-3xl text-black mt-2 font-bold mb-2">{item.title}</h2>
        <p className="text-black">{item.descripcion}</p>
        {
            item.buttonArrowRight && (
            <button className="text-black bg-(--bg-schedule-purple) rounded-full w-fit p-4 mt-3">
                <ArrowRight className="w-6 h-6 text-black" />
            </button>
            )
        }
    </div>
          
  )
}
