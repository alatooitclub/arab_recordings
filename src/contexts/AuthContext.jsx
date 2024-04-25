import { useState, useContext, createContext} from "react";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider (props) {
    const [isAuth, setIsAuth] =useState (localStorage.getItem ('token') || null)

    const value = {
        isAuth,
        setIsAuth
    }

    return <AuthContext.Provider value= {value}>{props.children}</AuthContext.Provider>
}