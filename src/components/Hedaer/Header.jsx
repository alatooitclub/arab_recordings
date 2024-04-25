import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import classes from "./Header.module.css";
import Button from "../LogOutButton/LogOutButton";

const Header = () => {
    const { isAuth } = useAuth();
    
    return (
        <header>
            <div className={classes["header-details"]} id="header-details">
                <div className={classes["header-logo"]} id="header-logo">Study</div>
                <ul className={classes.navbar} id="navbar">
                    {isAuth && <li><NavLink to="/form">Form</NavLink></li>}
                </ul>
                <ul className={classes["navbar-log"]} id="navbar-log">
                    {isAuth ? (
                        <Button />
                    ) : (
                        <>
                            <li><NavLink to="/login">Log In</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;