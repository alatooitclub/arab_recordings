import classes from "./LogOutButton.module.css";
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";



const Button = () => {
    const {isAuth, setIsAuth} = useAuth()
    const navigate = useNavigate()
    
    const logOut = () => {
        localStorage.removeItem('token')
        setIsAuth(null)
        navigate('/login')
    }
    return (
        <section>
            <button className={classes.button} onClick={ () => logOut()}>Log Out</button>
        </section>
    );
};
    
export default Button;