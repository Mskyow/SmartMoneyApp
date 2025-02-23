import React, { JSX, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import RegisterPage from "./register/signUp";
import { Box } from "@mui/material";
import SignInSide from "./login/SignInPage";
import { instance } from "../../utils/axios_instance";
import { useAppDispatch } from "../../utils/hook";
import { login } from "../../store/slice/auth";

const AuthRootComponent : React.FC = () : JSX.Element => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(location.pathname === '/login'){
           try {
            const userData = {
                email: email,
                password: password
            }
            const user = await instance.post('auth/login',userData);
            await dispatch(login(user.data))
            navigate('/watchlist');
           } catch (error : any) {
            return error
           }
        } else {
            const userData = {
                username : userName,
                email: email,
                password: password
            }
            const user = await instance.post('auth/register',userData);
        }
      

       
    }
    return (
        <div >
            <div className="form" onSubmit={handleSubmit} >
                <Box
                >
                  { location.pathname === '/login' ? <SignInSide setEmail={setEmail} setPassword={setPassword}/> :
                   location.pathname === '/register' ? <RegisterPage setEmail={setEmail} setUserName={setUserName} setPassword={setPassword}  /> : null }
                </Box>
            </div>
        </div>
    )
    
}

export default AuthRootComponent;