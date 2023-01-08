
import SignIn from "./SignIn";
import './LoginPage.css';


const LoginPage = () =>{

    const LoginForm = SignIn();




    

    return (
        <div className="login-page">
            {LoginForm}
        </div>
    )
}


export default LoginPage;