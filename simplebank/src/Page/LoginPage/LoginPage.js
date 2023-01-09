
import SignIn from "./SignIn";
import './LoginPage.css';
import { useSelector, useDispatch } from 'react-redux'


const LoginPage = () => {


    return (
        <div className="login-page">
            <SignIn />
        </div>
    )
}


export default LoginPage;