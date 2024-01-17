import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import process from 'process';

const QuizResult = () => {
    const id = useParams().id;
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        const fetchQuizResult = async () => {
            try {
                const response = await axios.get(`https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes/${id}/result`);
                setQuizResult(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching quiz result:', error);
                // Handle errors here
            }
            // try {
            //     // Check if a JWT token exists in cookies
            //     let token = Cookies.get('auth_token');
            //     console.log('Token:', token);
            //     if (!token) {
            //         // If there's no token, redirect the user to the login page
            //         window.location.href = process.env.REACT_APP_FRONTEND_URL;
            //         throw new Error('No valid JWT token found.');
            //     }
            // } catch (error) {
            //     console.error('Error verifying JWT token:', error);
            // }
        };
        fetchQuizResult();
    }, [id]);

    if (!quizResult) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Quiz Result</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Total Questions</th>
                        <th>Correct Answers</th>
                        <th>Incorrect Answers</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{quizResult.quizName}</td>
                        <td>{quizResult.totalQuestions}</td>
                        <td>{quizResult.correctAnswers}</td>
                        <td>{quizResult.incorrectAnswers}</td>
                        <td>{quizResult.score}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizResult;
