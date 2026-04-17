
interface ApuntateButtonProps {
    isMobile: boolean;
    onClick?: () => void;
    className?: string;
}

export const ApuntateButton = ({ isMobile, onClick, className = "" } : ApuntateButtonProps) => {

    const mobileStyles = `
        text-black 
        font-normal 
        rounded-2xl 
        h-15 p-2 
        bg-[#AAAAFF] 
        cursor-pointer text-2xl
    `;

    const desktopStyles = `
        inline-flex items-center justify-center
        h-10 px-5
        rounded-full
        bg-[#AAAAFF] text-black
        text-[15px] font-medium
        cursor-pointer
        hover:bg-[#9999FF]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30
    `;

  return (
    <button
        className={`${isMobile ? mobileStyles : desktopStyles} ${className}`}
        onClick={onClick}
        type="button"
    >
        Apúntate
    </button>
  )
}
