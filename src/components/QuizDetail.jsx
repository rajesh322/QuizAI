import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import Markdown from 'markdown-to-jsx';

const QuizDetail = () => {
    const id = useParams().id;
    const [quiz, setQuiz] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [submitted, setSubmitted] = useState(false);
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
    const sanitizeOptions = {
      allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'pre'],
      disallowedTagsMode: 'discard'
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }
    const getResultMessage = () => {
        if (result.correctAnswers === result.totalQuestions) {
            return 'Congratulations! You got a perfect score!';
        } else if (result.correctAnswers >= result.totalQuestions / 2) {
            return 'Well done! You did a good job!';
        } else {
            return 'Keep practicing! You\'ll improve!';
        }
    };
    return (
      <div className="container mt-4">
        {submitted && result && (
          <div className="text-center mb-4">
            <div className="quiz-result">
              <h4 className="text-center mb-4">Your Quiz Result</h4>
              <p className="lead">
                <h1 className="display-6">
                  Score: {result.correctAnswers} / {result.totalQuestions}
                </h1>
              </p>
              <p>{getResultMessage()}</p>
            </div>
          </div>
        )}
  
        <form>
          {quiz.questions.map((question, index) => (
            <div key={index} className={`mb-4 border p-3 ${submitted ? 'options' : ''}`}>
              <p className="lead">{`Question ${index + 1}:`}</p>
              {/* Render Markdown content with sanitization */}
              <Markdown options={sanitizeOptions}>
                {question.question.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </Markdown>
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
                        {/* Use <pre> tag to display HTML tags as text */}
                        <pre>{option}</pre>
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
                  {/* Render Markdown content with sanitization */}
                  <p className="mt-2">
                    Explanation: <Markdown options={sanitizeOptions}>{question.explanation}</Markdown>
                  </p>
                </div>
              )}
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
  }
export default QuizDetail;
