// GoogleOAuthButton.js
import { GoogleLogin } from '@react-oauth/google';

const GoogleOAuthButton = () => {
    const handleSuccess = (response) => {
        console.log('Login success:', response);
        // Add logic to handle successful login
    };

    const handleError = (error) => {
        console.error('Login error:', error);
        // Add logic to handle login error
    };

    return (
        <GoogleLogin
            clientId="654317944738-3vdifm0pk5eue7si4dgt93cg07s37sqa.apps.googleusercontent.com"
            onSuccess={handleSuccess}
            onError={handleError}
            render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    Login with Google
                </button>
            )}
        />
    );
};

export default GoogleOAuthButton;
