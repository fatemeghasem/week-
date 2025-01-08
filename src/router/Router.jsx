import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductPages from "../pages/ProductPages"
import Loginform from "../pages/Loginform"
import NotFoundPage from "../pages/404"
import RegisterationForm from "../pages/RegisterationForm"
import Start from "../pages/start"

function Router() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/"  element={<Start/>} />
      <Route path="/registeration" element={<RegisterationForm />} />
      <Route path="/login" element={<Loginform />} />
      <Route path="/products" element={<ProductPages/>}/>
      <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </BrowserRouter>
  )
}

export default Router