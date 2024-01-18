import { Link } from 'react-router-dom';
import '../css/Landing.css'; // Import your custom CSS file

const Landing = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1 className="landing-title">Welcome to TestMindsAI</h1>
                <p className="landing-subtitle">Your Gateway to Exciting Learning</p>
            </header>

            {/* Add links as Bootstrap buttons */}
            <nav className="landing-nav">
                <ul className="list-unstyled landing-links">
                    <li className="landing-link">
                        <p className="landing-description">
                            <strong>Get started attending quizzes created by other users:</strong>
                        </p>
                        <Link to="/quizzes" className="btn btn-primary">Explore Quiz List</Link>
                    </li>
                    <li className="landing-link">
                        <p className="landing-description">
                            <strong>Create your own Quiz:</strong> Either by adding manual quizzes or generate your own quiz using AI in the Generate Quiz tab.
                        </p>
                        <Link to="/create" className="btn btn-success">Create New Quiz</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Landing;
