import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";
import Regist from "../pages/Regist/Regist.jsx";
import Login from "../pages/Login/Login.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Header from "../components/Header/Header.jsx";
import ResetPassword from "../pages/ResetPassword/ResetPassword.jsx";
import SuperAdmin from '../pages/SuperAdmin/SuperAdmin.jsx';
import Footer from "../components/Footer/Footer.jsx";
import Admin from "../pages/Admin/pages/mainPageAdmin/Admin.jsx";

const Router = () => {
    const { isAuth, setIsAuth } = useAuth();
    console.log(isAuth);
    return (
        <>
            <Header />
            <Routes>
                <Route path="/mainPage" element={<MainPage />} /> 
                <Route path="/register" element={<Regist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/superAdmin" element={<SuperAdmin />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer/>

        </>
    );
};

export default Router;