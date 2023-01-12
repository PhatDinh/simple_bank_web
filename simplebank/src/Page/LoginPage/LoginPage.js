
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import './LoginPage.css';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";


const LoginPage = () => {

    const [forgot,setForgot] = useState(false)

    const handleForgot = () =>{
        setForgot(true)
    }

    return (
        <div className="login-page">
            {
                forgot == false ? <SignIn forgot={handleForgot} /> : <ForgetPassword/>
            }
        </div>
    )
}


export default LoginPage;