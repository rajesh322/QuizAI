import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    const history = useNavigate();

    // Create HTTP and HTTPS agents with connection pooling
    const httpAgent = new HttpAgent({ keepAlive: true });
    const httpsAgent = new HttpsAgent({ keepAlive: true });

    const handleGoogleLogin = () => {
        axios.get('https://coral-app-rgl66.ondigitalocean.app/auth/google', {
            withCredentials: true,
            credentials: 'include',
            httpAgent, // Include the HTTP agent for connection pooling
            httpsAgent, // Include the HTTPS agent for connection pooling
        })
            .then(response => {
                // Handle the response as needed
                console.log("Google Login Response:", response.data);
            })
            .catch(error => {
                // Handle errors
                console.error("Google Login Error:", error);
            });
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
