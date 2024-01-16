import { useEffect } from "react";
import Cookies from "js-cookie";

const Login = () => {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Use js-cookie to set the token as a cookie
            Cookies.set('authToken', token, { expires: 1, sameSite:'None', path: '/',secure:true});

            // Redirect to the desired location or update state as needed
            // Example: history.push('/dashboard');
            console.log("Token received:", token);
        }
    }, []);

    const handleGoogleLogin = () => {
        // Redirect the user to the server for Google authentication
        window.location.href = 'https://coral-app-rgl66.ondigitalocean.app/auth/google';
    };

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
