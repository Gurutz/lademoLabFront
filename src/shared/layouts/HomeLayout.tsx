import { Outlet } from "react-router-dom"

export const HomeLayout = () => {
  return (
    <div>

        <header>Hola soy el navbar</header>


        <main>
            <Outlet/>
        </main>

        <footer>Hola soy el footer</footer>

    </div>
  )
}
