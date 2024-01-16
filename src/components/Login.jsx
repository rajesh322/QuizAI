import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/auth/google');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const { token } = response.data;
            
            // Store the token in localStorage or use as needed
            localStorage.setItem('authToken', token);

            // Redirect to the desired location or update state as needed
            // Example: history.push('/dashboard');
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    // ... (other code)

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
