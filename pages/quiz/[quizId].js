import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// Un obiect de quiz-uri, unde "quantum-physics" este un exemplu de quiz
const quizzes = {
  'quantum-physics': {
    title: 'Quantum Physics Quiz',
    description: 'Test your knowledge of quantum physics.',
  },
  // Poți adăuga mai multe quiz-uri aici
  'general-science': {
    title: 'General Science Quiz',
    description: 'Explore various scientific concepts and test your knowledge.',
  },
};

export default function Quiz({ quizId, questions }) {
  const quiz = quizzes[quizId]; // Obținem informațiile despre quiz bazate pe quizId

  // Debugging info
  console.log('quizId:', quizId);
  console.log('quiz:', quiz);
  console.log('questions:', questions); // Verificăm întrebările încărcate

  // Dacă quizId-ul nu este găsit în lista de quiz-uri, afișăm un mesaj de eroare
  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="container centered">
      <h1 className="green-title">{quiz.title}</h1>
      <p>{quiz.description}</p>
      {/* Afișăm o listă cu întrebările disponibile în quiz */}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question.question}
          </li>
        ))}
      </ul>
      {/* Link către prima întrebare din quiz */}
      <Link href={`/quiz/${quizId}/question/1`} className="link">
        Start Quiz
      </Link>
    </div>
  );
}

// Funcția getServerSideProps pentru a obține parametrii dinamic din URL și a încărca întrebările
export async function getServerSideProps(context) {
  const { quizId } = context.params; // Extragem quizId din parametrii URL

  // Citim fișierul questions.json
  const filePath = path.join(process.cwd(), 'public', 'data', 'questions.json'); // Calea corectă către fișierul JSON
  let jsonData;

  try {
    jsonData = fs.readFileSync(filePath, 'utf-8'); // Citim fișierul JSON
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      props: {
        error: 'File not found',
      },
    };
  }

  const questionsData = JSON.parse(jsonData);

  // Obținem întrebările pentru quiz-ul specificat (quantum-physics sau general-science)
  const questions = questionsData[quizId] || [];

  // Debugging info pentru server-side
  console.log('Server-side props - quizId:', quizId);
  console.log('Server-side props - questions:', questions);

  return {
    props: { quizId, questions }, // Transmitem quizId și întrebările ca props către componenta Quiz
  };
}
