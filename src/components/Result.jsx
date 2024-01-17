import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import process from 'process';

const Profile = () => {
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

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
                            setEmail(res.data.email);
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
        if (email) {
            fetchQuizResults(email);
        }
    }, [email]);

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
