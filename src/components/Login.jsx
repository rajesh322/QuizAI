import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    const history = useNavigate();  

    const handleGoogleLogin = () => {
        window.location.href = 'https://coral-app-rgl66.ondigitalocean.app/auth/google';
    };

    const redirectToCreatePage = () => {
        history.push('/create');
    };

    useEffect(() => {
        try {
            // Check if a JWT token exists in cookies
            let token = Cookies.get('authToken');
            console.log('Token:', token);
            if (token) {
                // If there's no token, redirect the user to the create page
                redirectToCreatePage();
            }
        } catch (error) {
            console.error('Error verifying JWT token:', error);
        }
    }, []);

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            <button className="login-button" onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;
