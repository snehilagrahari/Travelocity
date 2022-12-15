import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [isAuth, setAuth] = useState(false);

    const [loading , setLoading] = useState(false);

    const login = ()=>{
        setAuth(true);
    }

    const logout = ()=>{
        setAuth(false);
    }

    const toggleAuth = ()=>{
        setAuth(!isAuth);
    }

    const toggleLoading = (val)=>{
        setLoading(val);
    }

    const value={
        isAuth,
        login,
        logout,
        toggleAuth,
        loading,
        toggleLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext