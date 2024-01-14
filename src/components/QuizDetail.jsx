import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";

const QuizDetail = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                // Handle errors here
            }
            try {
                // Check if a JWT token exists in cookies
                let token = Cookies.get('authToken');
                console.log('Token:', token);
                if (!token) {
                    // If there's no token, redirect the user to the login page
                    window.location.href = 'https://testmindsai.tech/';
                    throw new Error('No valid JWT token found.');
                }
            } catch (error) {
                console.error('Error verifying JWT token:', error);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleOptionChange = (questionIndex, selectedOption) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [questionIndex]: selectedOption,
        }));
    };

    const handleSubmit = async () => {
        try {

            // Convert selectedOptions to the desired format
            let formattedOptions = Object.keys(selectedOptions).reduce((acc, key) => {
                acc[key] = selectedOptions[key];
                return acc;
            }, {});
            try {
                let token = Cookies.get('authToken');
                const response = await axios.get('https://coral-app-rgl66.ondigitalocean.app/auth/profile', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('User profile:', response.data.user.emails[0].value);
                formattedOptions['email'] = response.data.user.emails[0].value;
            }
            catch (error) {
                console.error('Error fetching user profile:', error);
            }
            console.log('Submitting quiz:', formattedOptions);
            const response = await axios.post(`https://lets-quiz-09de6b417d2a.herokuapp.com/api/quizzes/${quiz?.id}/result`, formattedOptions);

            console.log('Quiz submitted:', response.data);

            // Redirect to the results page using the new quizid
            navigate(`/quiz/${response.data.id}/result`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            // Handle errors here
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{quiz.quizName}</h2>
            <form>
                {quiz.questions.map((question, index) => (
                    <div key={index} className="mb-4 border p-3">
                        <p className="lead">{`Question ${index + 1}: ${question.question}`}</p>
                        <div className="row row-cols-2">
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="col mb-2">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id={`option${index}-${optionIndex}`}
                                            name={`question${index}`}
                                            value={option}
                                            checked={selectedOptions[index] === option}
                                            onChange={() => handleOptionChange(index, option)}
                                            disabled={submitted}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`option${index}-${optionIndex}`}
                                        >
                                            {option}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {!submitted && (
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                )}
            </form>
        </div>
    );
};

export default QuizDetail;
