import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
    const [quizResults, setQuizResults] = useState([]);
    const [usermail, setusermail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = Cookies.get('authToken');
                if (!token) {
                    window.location.href = 'https://testmindsai.tech';
                    throw new Error('No valid JWT token found.');
                }
                const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/auth/profile', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setusermail(response.data.user.emails[0].value);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, []);

    const fetchQuizResults = async (email) => {
        try {
            const response = await axios.get(`https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes/result/${encodeURIComponent(email)}`);
            setQuizResults(response.data);
        } catch (error) {
            console.error('Error fetching quiz results:', error);
            // Handle errors here
        }
    };

    useEffect(() => {
        if (usermail) {
            fetchQuizResults(usermail);
        }
    }, [usermail]);

    return (
        <div>
            <h2>Your Quiz Results</h2>
            {quizResults.length === 0 ? (
                <p>No quiz results available.</p>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Correct Answers</th>
                        <th>Incorrect Answers</th>
                        <th>Score</th>
                        {/* Add more table headers as needed */}
                    </tr>
                    </thead>
                    <tbody>
                    {quizResults.map((result) => (
                        <tr key={result.id}>
                            <td>{result.quizName}</td>
                            <td>{result.correctAnswers}</td>
                            <td>{result.incorrectAnswers}</td>
                            <td>{result.score}</td>
                            {/* Add more table data cells as needed */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;
