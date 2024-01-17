import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const login = useGoogleLogin({// Replace with your Google Client ID
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            Cookies.set('auth_token', codeResponse.access_token, { expires: 1 }); // Set cookie to expire in 1 day
            Cookies.set('refresh_token', codeResponse.refresh_token, { expires: 1 }); // Set cookie to expire in 1 day
            Cookies.set('email', codeResponse.email, { expires: 1 }); // Set cookie to expire in 1 day
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        // During component mount, check for stored access token
        const storedToken = Cookies.get('auth_token');

        if (storedToken) {
            // Use the stored token for API requests
            axios
                .get(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${storedToken}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, []); // Empty dependency array for component mount

    // log out function to log the user out of Google and clear the profile and stored token
    const logOut = () => {
        googleLogout();
        setProfile(null);
        Cookies.remove('auth_token');
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}

export default Login;
