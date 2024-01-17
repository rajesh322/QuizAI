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
                const storedToken = Cookies.get('auth_token');
                // Check if a JWT token exists in cookies
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
                            setUser(res.data);
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err));
                }
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
        Cookies.remove('auth_token');

        // Redirect the user to the login page
        window.location.href = 'https://testmindsai.tech/login' ;
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
                <Link className="navbar-brand" to="/profile">
                    Results
                </Link>
                <div className="ml-auto d-flex align-items-center"> {/* Container for name, image, and logout button */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <div className="d-flex align-items-center">
                            <div className="mr-3">
                                {/* Image placeholder for the user's avatar */}
                                <img
                                    src={ user.picture || 'placeholder.jpg'}
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
                                        <button className="dropdown-item" onClick={() => {window.location.href = 'https://testmindsai.tech/profile'}}>
                                            {user.name}
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
