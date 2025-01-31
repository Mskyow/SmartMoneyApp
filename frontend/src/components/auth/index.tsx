import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RegisterPage from "./register/signUp";
import { Box } from "@mui/material";
import SignInSide from "./login/SignInPage";

const AuthRootComponent = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
    }
    const location = useLocation();
    return (
        <div >
            <div className="form" onSubmit={handleSubmit} >
                <Box
                >
                  { location.pathname === '/Login' ? <SignInSide setEmail={setEmail} setPassword={setPassword}/> : location.pathname === '/register' ? <RegisterPage /> : null }
                </Box>
            </div>
        </div>
    )
    
}

export default AuthRootComponent;