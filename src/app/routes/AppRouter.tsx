import { Route, Routes } from "react-router-dom"
import { HomeLayout } from "../../shared/layouts/HomeLayout"
import { App } from "../../App"


export const AppRouter = () => {
  return (
    <Routes>

        <Route element={<HomeLayout/>}>

            <Route path="/" element={<App/>} />
            <Route path="/about" element={<div>About</div>} />

            <Route path="*" element={<div>404 Not Found</div>} />

        </Route>


    </Routes>
  )
}
