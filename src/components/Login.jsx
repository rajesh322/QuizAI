import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";


const Login = () => {
    const history = useNavigate();

    const handleGoogleLogin = async () => {
        const httpAgent = new HttpAgent({ keepAlive: true });
        const httpsAgent = new HttpsAgent({ keepAlive: true });

        try {
            const response = await fetch('https://coral-app-rgl66.ondigitalocean.app/auth/google', {
                method: 'GET',
                credentials: 'include',
                agent: (parsedURL) => parsedURL.protocol === 'http:' ? httpAgent : httpsAgent,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Assuming the response is in JSON format
            const data = await response.json();

            // Handle the response as needed
            console.log("Google Login Response:", data);
        } catch (error) {
            // Handle errors
            console.error("Google Login Error:", error);
        }
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
