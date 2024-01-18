import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../constants';

const QuizDetail = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(API_URL + `/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                // Handle errors here
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
            console.log('Submitting quiz:', formattedOptions);
            const response = await axios.post(API_URL + `/quizzes/${quiz?.id}/result`, formattedOptions);

            console.log('Quiz submitted:', response.data);

            // Store the result and set the submitted flag
            setResult(response.data);
            setSubmitted(true);
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
                                            className={`form-check-label ${
                                                submitted && option === question.correctOption ? 'text-success' : ''
                                            } ${
                                                submitted && option !== question.correctOption ? 'text-danger' : ''
                                            }`}
                                            htmlFor={`option${index}-${optionIndex}`}
                                        >
                                            {option}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {submitted && (
                            <div>
                                <p className={`mt-2 ${selectedOptions[index] === question.correctOption ? 'text-success' : 'text-danger'}`}>
                                    Your choice: {selectedOptions[index]}
                                </p>
                                <p className="mt-2">Explanation: {question.explanation}</p>
                            </div>
                        )}
                    </div>
                ))}

                {!submitted && (
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                )}

                {submitted && (
                    <div className="mt-3">
                        <h4>Quiz Result</h4>
                        <p>
                            {result.correctAnswers} out of {result.totalQuestions} correct
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default QuizDetail;
