// src/components/Login.js


import {useEffect} from "react";
import Cookies from "js-cookie";

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };
    useEffect(() => {
        try {
            // Check if a JWT token exists in cookies
            let token = Cookies.get('authToken');
            console.log('Token:', token);
            if (token) {
                // If there's no token, redirect the user to the login page
                window.location.href = 'http://localhost:5173/create';
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
