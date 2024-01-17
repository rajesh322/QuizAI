import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/quizlist.css';
import Googleads from './googleads';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [sortBy, setSortBy] = useState('quizName');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                // Handle errors here
            }
        };
        fetchQuizzes();
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const sortedQuizzes = [...quizzes].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Quizzes</h2>

            <div className="d-flex justify-content-end mb-3">
                <label htmlFor="sortSelect" className="me-2">Sort By:</label>
                <select id="sortSelect" className="form-select" value={sortBy} onChange={handleSortChange}>
                    <option value="quizName">Quiz Name</option>
                    {/* Add more options based on your data structure */}
                </select>
            </div>

            <ul className="list-group">
                {sortedQuizzes.map((quiz) => (
                    <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/quiz/${quiz.id}`} className="text-decoration-none">
                            {quiz.quizName}
                        </Link>
                        {/* Add more details or actions if needed */}
                    </li>
                ))}
            </ul>
            {/* <Googleads /> */}
        </div>
    );
};

export default QuizList;