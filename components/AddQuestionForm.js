import { useState } from 'react';

export default function AddQuestionForm({ quizId }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newQuestion = {
      question,
      options,
      answer,
    };

    let storedQuestions = JSON.parse(localStorage.getItem(quizId)) || [];
    storedQuestions.push(newQuestion);
    localStorage.setItem(quizId, JSON.stringify(storedQuestions));

    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Întrebare:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>

      {options.map((option, index) => (
        <div key={index}>
          <label>Opțiunea {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        </div>
      ))}

      <div>
        <label>Răspuns Corect:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>

      <button type="submit">Adaugă Întrebare</button>
    </form>
  );
}
