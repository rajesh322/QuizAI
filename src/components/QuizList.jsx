import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                // Handle errors here
            }
            try {
                // Check if a JWT token exists in cookies
                let token = Cookies.get('authToken');
                console.log('Token:', token);
                if (!token) {
                    // If there's no token, redirect the user to the login page
                    window.location.href = 'https://testmindsai.tech';
                    throw new Error('No valid JWT token found.');
                }
            } catch (error) {
                console.error('Error verifying JWT token:', error);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Quizzes</h2>
            <ul className="list-group">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/quiz/${quiz.id}`} className="text-decoration-none">
                            {quiz.quizName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
