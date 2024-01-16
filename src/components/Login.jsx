import { useEffect } from "react";

const Login = () => {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Store the token in localStorage or use it as needed
            localStorage.setItem('authToken', token);

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
