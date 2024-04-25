import React from "react";
import classes from "./LogOutButton.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogInButton = () => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    
    const handleLogIn = () => {
        navigate('/login');
    };

    return (
        <section>
            <button className={classes.button} onClick={handleLogIn}>Log In</button>
        </section>
    );
};

export default LogInButton;
