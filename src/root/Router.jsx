import {Route, Routes} from "react-router-dom";
import {RegistLazy} from "../pages/Regist/RegistLazy.async.jsx";
import {LoginLazy} from "../pages/Login/LoginLazy.async.jsx";
import {ResetLazy} from "../pages/ResetPassword/ResetLazy.async.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Header from "../components/Header/Header.jsx";

const Router = () => {
    const {isAuth, setIsAuth} = useAuth()
    console.log(isAuth)
    return (
        <>
        <Header/>
            <Routes>
                {!isAuth?
                    <>
                        <Route path="/regist" element={<RegistLazy />} />
                        <Route path="/login" element={<LoginLazy />} />
                        <Route path='/reset' element={<ResetLazy/>}/>

                    </> :
                    <>
               </>
                }
           </Routes>
        </>
    );
};

export default Router;