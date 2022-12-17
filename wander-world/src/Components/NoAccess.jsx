import { AlertIcon , AlertTitle, Alert , AlertDescription } from "@chakra-ui/react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AuthContext from "../Contexts/AuthContext";

const NoAccess = ({children})=>{
    const navigate = useNavigate('/');

    const RedirectHome = ()=>{
        setTimeout(() => {
           navigate('/'); 
        }, 2000);
    }

    const {isAuth} = useContext(AuthContext)

    if(isAuth)
    {
        RedirectHome();
    }

    return (
        isAuth? (
            <>
            <Alert status='warning' variant='left-accent' w='400px' margin="50px auto">
                <AlertIcon />
                <AlertTitle>Access Denied!</AlertTitle>
                <AlertDescription>Redirecting to HomePage. Please Wait!</AlertDescription>
            </Alert>
            </>
        ) : (
            children
        )
    )

}

export default NoAccess