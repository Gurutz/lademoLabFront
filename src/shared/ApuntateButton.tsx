
interface ApuntateButtonProps {
    isMobile: boolean;
}

export const ApuntateButton = ({ isMobile } : ApuntateButtonProps) => {

    const mobileStyles = `
        text-black 
        font-normal 
        rounded-2xl 
        h-15 p-2 
        bg-[#AAAAFF] 
        cursor-pointer hover:bg-[#8888FF] transition-colors duration-300 text-2xl
    `;

    const desktopStyles = `p-2 bg-[#AAAAFF] rounded-2xl text-sm px-4 cursor-pointer`

  return (
    <button
        className={isMobile ? mobileStyles : desktopStyles}
    >
        Apúntate
    </button>
  )
}
