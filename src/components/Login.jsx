import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/Login.css";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";

const Login = () => {
    const history = useHistory();

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

            // Check if the response contains a token
            if (data.token) {
                // Store the token in localStorage or use as needed
                localStorage.setItem('authToken', data.token);

                // Redirect to the desired location or update state as needed
                // Example: history.push('/dashboard');
            } else {
                // Handle the case where the token is not present in the response
                console.error("Token not found in the response");
            }
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
            // Check if a JWT token exists in localStorage
            let token = localStorage.getItem('authToken');
            console.log('Token:', token);
            if (token) {
                // If there's a token, redirect the user to the create page
                redirectToCreatePage();
            }
        } catch (error) {
            console.error('Error checking for JWT token:', error);
        }
    }, []);

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            <button type="button" className="login-button" onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;
