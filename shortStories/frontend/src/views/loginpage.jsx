import { useState } from "react";
import LoginForm from "../components/Login&Register/LoginForm";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/Login&Register/RegisterForm";

export default function LoginPage() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    function onClickToggle(event) {
        setIsLoginPage(!isLoginPage);
        event.preventDefault();
      }

    return (
        <>
        <Navbar/>
        
            {isLoginPage 
            ? 
                <LoginForm onClickToggle={onClickToggle}/> 
            : 
                <RegisterForm onClickToggle={onClickToggle}/>
            }
        
        
        </>
    )
}