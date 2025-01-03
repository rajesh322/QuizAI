import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import QuizDetail from './components/QuizDetail';
import QuizResult from './components/QuizResult'; // Import the QuizResult component
//import  Login from './components/Login';
import Navbar from "./components/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
// import Result from "./components/Result.jsx";
import Landing from './components/landing.jsx';
import Stats from './components/Stats.jsx';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <div className="container mt-4">
                    <h1 className="text-center">TestMindsAI</h1>
                    <Routes>
                        <Route path="/quiz/:id" element={<QuizDetail />} />
                        <Route path="/quizzes" element={<QuizList />} />
                        <Route path="/quiz/:id/result" element={<QuizResult />} />
                        <Route path="/create" element={<QuizForm />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        {/* <Route path="/profile" element={<Result />} /> */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </div>
                <Analytics />
            </div>
        </Router>
    );
};

export default App;
