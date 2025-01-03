import { useState } from 'react';
import axios from 'axios';
import '../css/quizform.css';
//import Googleads from './googleads';
import { API_URL } from '../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const QuizForm = () => {
    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctOption: '' },
    ]);
    const [selectedForm, setSelectedForm] = useState('createQuiz'); // Default to createQuiz form
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const [showModal, setShowModal] = useState(false);
    const [quizId, setQuizId] = useState(''); // State to store quizId

    // useEffect(() => {
    //     try {
    //         // Check if a JWT token exists in cookies
    //         let token = Cookies.get('auth_token');
    //         console.log('Token:', token);
    //         if (!token) {
    //             // If there's no token, redirect the user to the login page
    //             window.location.href = 'https://testmindsai.tech/login';
    //             throw new Error('No valid JWT token found.');
    //         }
    //     } catch (error) {
    //         console.error('Error verifying JWT token:', error);
    //     }
    // }, []);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOptionChange = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = option;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDateAndTime = new Date();
            setIsLoading(true);
            const response = await axios.post(API_URL + '/quizzes', {
                quizName,
                questions,
                date: currentDateAndTime.toISOString(),
            });
            console.log('Quiz created:', response.data);
            setQuizId(response.data.id); // Store the quizId
            setShowModal(true);
            // Handle success
        } catch (error) {
            console.error('Error creating quiz:', error);
            // Handle errors
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);

        const dropdownValue = document.getElementById('dropdown1').value;
        const topicValue = document.getElementById('Topic1').value;
        const questionCount = document.getElementById('questionCount').value;

        try {
            const response = await axios.post(API_URL + '/quizzes/generate', {
                difficulty: dropdownValue,
                topic: topicValue,
                numberOfQuestions: questionCount
            });
            console.log('Quiz generated:', response.data);
            console.log(response.data._id);
            setQuizId(response.data._id); // Store the quizId
            console.log(quizId);
            // Handle success
        } catch (error) {
            console.error('Error generating quiz:', error);
            // Handle errors
        } finally {
            setIsLoading(false);
        }
    };

    const handleAttemptQuiz = () => {
        setShowModal(false); // Close modal before redirecting
        // Redirect or perform actions to start attempting the quiz using the quizId
        console.log("Attempting quiz with quizId:", quizId);
        // Redirect or perform actions to start attempting the quiz using the quizId
        // For example, you can redirect to a route where the quiz is displayed
        window.location.href = '/quiz/' + quizId;
    };
    const renderForm = () => {
        switch (selectedForm) {
            case 'createQuiz':
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="quizName" className="form-label">
                                Quiz Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="quizName"
                                value={quizName}
                                onChange={(e) => setQuizName(e.target.value)}
                                required
                            />
                        </div>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 border p-3">
                                <label htmlFor={`question${index}`} className="form-label">
                                    Question {index + 1}:
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id={`question${index}`}
                                    value={question.question}
                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                    required
                                />

                                <label className="form-label">Options:</label>
                                <div className="row row-cols-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="col mb-2">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={option}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, optionIndex, e.target.value)
                                                    }
                                                    required
                                                />
                                                <div className="input-group-text">
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id={`correctOption${index}-${optionIndex}`}
                                                            name={`correctOption${index}`}
                                                            value={option}
                                                            checked={question.correctOption === option}
                                                            onChange={() =>
                                                                handleCorrectOptionChange(index, option)
                                                            }
                                                            required
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`correctOption${index}-${optionIndex}`}
                                                        ></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-danger mt-3"
                                    onClick={() => removeQuestion(index)}
                                >
                                    Remove Question
                                </button>
                            </div>
                        ))}

                        <button type="button" className="btn btn-primary" onClick={addQuestion}>
                            Add Question
                        </button>

                        <button type="submit" className="btn btn-success mt-3">
                            Create Quiz
                        </button>
                    </form>
                );
            case 'switchForm':
                return (
                    <form>
                        {/* Add fields, dropdowns, or any other controls specific to switchForm */}
                        <div className="mb-3">
                            <label htmlFor="dropdown1" className="form-label">
                                Difficulty Level:
                            </label>
                            <select className="form-select" id="dropdown1">
                                {/* Add options for dropdown 1 */}
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Topic1" className="form-label">
                                Topic
                            </label>
                            <input type="text" className="form-control" id="Topic1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="questionCount" className="form-label">
                                Number of Questions
                            </label>
                            <select className="form-select" id="questionCount">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success" onClick={handleGenerateSubmit}>
                            Submit
                        </button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Create a New Quiz</h2>
            <div className="mb-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <p
                            className={`nav-link ${selectedForm === 'createQuiz' ? 'active' : ''}`}
                            style={{ color: selectedForm === 'createQuiz' ? 'blue' : 'black' }}
                            onClick={() => setSelectedForm('createQuiz')}
                        >
                            Create Quiz
                        </p>
                    </li>
                    <li className="nav-item">
                    <p
                            className={`nav-link ${selectedForm === 'switchForm' ? 'active' : ''}`}
                            style={{ color: selectedForm === 'switchForm' ? 'blue' : 'black' }}
                            onClick={() => setSelectedForm('switchForm')}
                        >
                            Generate a Quiz
                        </p>
                    </li>
                </ul>
            </div>
            {renderForm()}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body>
                    {isLoading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Generating your Quiz...</span>
                            </div>
                            <p>Generating your Quiz...</p>
                        </div>
                    ) : quizId ? (
                            <div className="text-center">
                                <p>Quiz generated successfully! Would you like to attempt the quiz?</p>
                                <Button variant="primary" onClick={handleAttemptQuiz}>
                                    Attempt Quiz
                                </Button>
                            </div>
                    ) : null}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QuizForm;