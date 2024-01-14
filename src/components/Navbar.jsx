import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Navbar() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if a JWT token exists in cookies
                let token = Cookies.get('authToken');
                console.log('Token:', token);
                if (!token) {
                    // If there's no token, no need to fetch user data
                    setLoading(false);
                    return;
                }

                // Validate the JWT token on the server
                const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/auth/profile', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.user);
                console.log("pic url: ",response.data.user.photos[0].value)
                console.log('Profile data received:', response.data.user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle error if needed
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Clear the JWT token from cookies
        Cookies.remove('authToken');

        // Redirect the user to the login page
        window.location.href = 'https://testmindsai.tech';
    };

    const handleToggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/quizzes">
                    Home
                </Link>
                <Link className="navbar-brand" to="/create">
                    Create Quiz
                </Link>
                <div className="ml-auto d-flex align-items-center"> {/* Container for name, image, and logout button */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <div className="d-flex align-items-center">
                            <div className="mr-3">
                                {/* Image placeholder for the user's avatar */}
                                <img
                                    src={ user.photos[0].value || 'placeholder.jpg'}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    style={{ width: '40px', height: '40px' }}
                                    onClick={handleToggleUserMenu}
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            {showUserMenu && (
                                <div className="dropdown">
                                    <div className={`dropdown-menu ${showUserMenu ? 'show' : ''}`} aria-labelledby="userDropdown">
                                        <button className="dropdown-item" onClick={() => {window.location.href = 'https://testmindsai.techprofile'}}>
                                            {user.displayName}
                                        </button>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link className="navbar-brand" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
