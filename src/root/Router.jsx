import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.jsx";
import Regist from "../pages/Regist/Regist.jsx";
import Login from "../pages/Login/Login.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Form from "../components/Form/Form.jsx";
import UpdateForm from "../pages/UpdateForm/UpdateForm.jsx";
import Header from "../components/Hedaer/Header.jsx";
import PasswordReset from "../pages/PasswordReset/PasswordReset.jsx";
import NewPasswordForm from "../pages/NewPasswordForm/NewPasswordForm.jsx";
import ResetPassword from "../pages/ResetPassword/ResetPassword.jsx";

const Router = () => {
    const { isAuth, setIsAuth } = useAuth();
    console.log(isAuth);
    return (
        <>
            <Header />
            <Routes>
            <Route path="/mainPage" element={<MainPage />} /> 
                {!isAuth ? (
                    <>
                        <Route path="/register" element={<Regist />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/reset" element={<ResetPassword />} />
                    </>
                ) : (
                    <>
                        <Route path="/form" element={<Form />} />
                        <Route path="/updateForm/:formId" element={<UpdateForm />} />
                        
                    </>
                )}
               
            </Routes>
        </>
    );
};

export default Router;