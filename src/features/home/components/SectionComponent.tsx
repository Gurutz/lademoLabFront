import { ApuntateButton } from "../../../shared/ApuntateButton";

interface Props {
    title: string;
    description: string;
    showButton: boolean;
}

export const SectionComponent = ({ title, description, showButton } : Props) => {
  return (
    <div className="bg-white p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        {
            showButton && (
                <ApuntateButton
                    isMobile={false}
                />
            )
        }
    </div>
  )
}
