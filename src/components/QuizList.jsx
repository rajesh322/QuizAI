import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/quizlist.css';
import Googleads from './googleads';
import { API_URL } from '../constants';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [sortBy, setSortBy] = useState('quizName');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(API_URL + '/quizzes');
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortedQuizzes = [...quizzes].sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(a.date) - new Date(b.date);
        } else {
            return a[sortBy].localeCompare(b[sortBy]);
        }
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Quizzes</h2>

            <div className="d-flex justify-content-end mb-3">
                <label htmlFor="sortSelect" className="me-2">Sort By:</label>
                <select id="sortSelect" className="form-select" value={sortBy} onChange={handleSortChange}>
                    <option value="quizName">Quiz Name</option>
                    <option value="date">Date</option>
                    <option value="questions">Number of Questions</option>
                    {/* Add more options based on your data structure */}
                </select>
            </div>

            <ul className="list-group">
                {sortedQuizzes.map((quiz) => (
                    <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <Link to={`/quiz/${quiz.id}`} className="text-decoration-none">
                                <h5>{quiz.quizName}</h5>
                                <p>{quiz.description}</p> {/* Add quiz description here */}
                                <span className='badge bg-primary rounded-pill ms-2'>{quiz.questions.length} Questions</span>
                            </Link>
                        </div>
                        <span className='badge bg-primary rounded-pill'>{formatDate(quiz.date)}</span>
                    </li>
                ))}
            </ul>
            {/* <Googleads /> */}
        </div>
    );
};

export default QuizList;
