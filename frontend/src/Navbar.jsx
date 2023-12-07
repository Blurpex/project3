import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Tenant from "./components/Tenant"
import Maintenance from "./components/Maintenance"
import Manager from "./components/Manager"

const Navbar = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="tenants" element={<Tenant/>}/>
                <Route path="maintenance" element={<Maintenance/>}/>
                <Route path="manager" element={<Manager/>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navbar
