import { Link } from 'react-router-dom'; // Assuming you are using React Router

const Landing = () => {
    return (
        <div className="landing">
            <header>
                <h1>Welcome to My Awesome Project</h1>
                <p>Your Gateway to Exciting Discoveries</p>
            </header>

            <section>
                <p>
                    Thank you for visiting our website. We're on a mission to redefine possibilities
                    and bring innovation to your fingertips.
                </p>
            </section>

            <section>
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Exceptional User Experience</li>
                    <li>Cutting-edge Technology</li>
                    <li>Community-driven Development</li>
                </ul>
            </section>

            <section>
                <h2>Get Started Today</h2>
                <p>Join us on this exciting journey. Click below to explore and create with us.</p>
                <Link to="/Login">
                    <button>Get Started</button>
                </Link>
            </section>
        </div>
    );
};

export default Landing;
