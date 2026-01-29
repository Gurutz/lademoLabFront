import { Route, Routes } from "react-router-dom"
import { HomeLayout } from "../../shared/layouts/HomeLayout"
import { App } from "../../App"
import { LoginPage } from "../../features/auth/pages/LoginPage"
import { RegisterPage } from "../../features/auth/pages/RegisterPage"


export const AppRouter = () => {
  return (
    <Routes>

        <Route element={<HomeLayout/>}>

          <Route path="/" element={<App/>} />


          {/* AuthRoutes */}
          <Route path="/auth/login" element={<LoginPage/>} />
          <Route path="/auth/register" element={<RegisterPage/>} />

          <Route path="/about" element={<div>About</div>} />

          <Route path="*" element={<div>404 Not Found</div>} />

        </Route>


    </Routes>
  )
}
