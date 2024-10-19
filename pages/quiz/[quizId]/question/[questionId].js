import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const router = useRouter();
  const { quizId, questionId } = router.query;

  useEffect(() => {
    if (quizId) {
      const fetchQuestions = async () => {
        const response = await fetch(`/api/questions?quizId=${quizId}`);
        const data = await response.json();
        console.log(data); // Verifică datele primite
        setQuestions(data[quizId] || []); // Asigură-te că `questions` este un array
      };
      fetchQuestions();
    }
  }, [quizId]);

  useEffect(() => {
    console.log(questions); // Verifică starea questions
  }, [questions]);

  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
  }, [questionId]);

  if (!quizId || !questionId) {
    return <div>Invalid quiz or question ID</div>;
  }

  const questionIndex = parseInt(questionId) - 1;

  if (!questions || !questions.length) {
    return <div>Loading...</div>;
  }

  if (questionIndex < 0 || questionIndex >= questions.length) {
    return <div>Question not found</div>;
  }

  const currentQuestion = questions[questionIndex] || null;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionId = questionIndex + 2; // +1 pentru zero-indexing, +1 pentru următoarea întrebare
    if (nextQuestionId > questions.length) {
      router.push({
        pathname: `/quiz/${quizId}/results`,
        query: {
          score: correctAnswers, // Transmitem scorul acumulat
          total: questions.length, // Numărul total de întrebări
        },
      });
    } else {
      router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    }
  };

  return (
    <div className="container centered">
      <h1 className="green-title">{currentQuestion.question}</h1>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {selectedOption && (
        <div>
          {isCorrect ? (
            <p className="correct">Correct!</p>
          ) : (
            <p className="incorrect">
              Incorrect! The correct answer is {currentQuestion.answer}.
            </p>
          )}
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}
