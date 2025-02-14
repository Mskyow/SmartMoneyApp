import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RegisterPage from "./register/signUp";
import { Box } from "@mui/material";
import SignInSide from "./login/SignInPage";
import { instance } from "../../utils/axios_instance";

const AuthRootComponent = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // console.log(email);
        // console.log(password);

        const userData = {
            email: email,
            password: password
        }

        const user = await instance.post('auth/login',userData);
        // console.log(user.data);
    }
    const location = useLocation();
    return (
        <div >
            <div className="form" onSubmit={handleSubmit} >
                <Box
                >
                  { location.pathname === '/login' ? <SignInSide setEmail={setEmail} setPassword={setPassword}/> : location.pathname === '/register' ? <RegisterPage /> : null }
                </Box>
            </div>
        </div>
    )
    
}

export default AuthRootComponent;