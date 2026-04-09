import { Outlet } from "react-router-dom"
import { NavbarComponent } from "../NavbarComponent"
import { AsideLinks } from "../AsideLinks"
import { useState } from "react"
import { FooterDesktop } from "../components/FooterDesktop"

export const HomeLayout = () => {
  
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    // lo contrario de su valor actual
    // si es true, pasa a ser false
    // si es false, pasa a ser true
  }

  return (
    <div className="relative min-h-screen bg-white">

      <NavbarComponent
        toggleMenu={toggleMenu}
      />

      <AsideLinks 
        status={openMenu}
        toggleMenu={toggleMenu}
      />

      <main className="bg-white">
          <Outlet/>
      </main>

      <FooterDesktop />

    </div>
  )
}
