import { useEffect} from 'react';
import { Link } from 'react-router-dom';


function Navbar() {

    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const storedToken = Cookies.get('auth_token');
            //     // Check if a JWT token exists in cookies
            //     if (storedToken) {
            //         // Use the stored token for API requests
            //         axios
            //             .get(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${storedToken}`, {
            //                 headers: {
            //                     Authorization: `Bearer ${storedToken}`,
            //                     Accept: 'application/json'
            //                 }
            //             })
            //             .then((res) => {
            //                 setUser(res.data);
            //                 console.log(res.data);
            //             })
            //             .catch((err) => console.log(err));
            //     }
            // } catch (error) {
            //     console.error('Error fetching user profile:', error);
            //     // Handle error if needed
            // } finally {
            //     setLoading(false);
            // }
        };
        fetchData();
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/quizzes">
                    Home
                </Link>
                <Link className="navbar-brand" to="/create">
                    Create Quiz
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
