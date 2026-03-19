import { ApuntateButton } from "../../../shared/ApuntateButton";

interface Props {
    title: string;
    description: string;
    videoUrl?: string;
    showButton: boolean;
}

export const SectionComponent = ({ title, description, videoUrl, showButton } : Props) => {
  return (
    <section className="bg-white p-0 mb-6">
      {/* contenedor principal con vídeo de fondo y texto encima */}
      <div className="relative w-full max-h-[600px] overflow-hidden">
        {/* vídeo full-width */}
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
        />

        {/* texto encima del vídeo con fondo blanco */}
        <div className="absolute inset-x-0 top-0 bg-white/95 p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>

          {showButton && (
            <ApuntateButton
              isMobile={false}
            />
          )}
        </div>
      </div>
    </section>
  )
}
