import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Categories({ quizCategories }) {
  return (
    <div className="centered">
      <h1 className="green-title">Categories</h1>
      <ul>
        {quizCategories.map((category) => (
          <li key={category}>
            <Link href={`/quiz/${category}`}>
              {category.replace('-', ' ')} {/* Transformăm dash-urile în spații pentru afișare */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Funcția getServerSideProps pentru a încărca categoriile din questions.json
export async function getServerSideProps() {
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

  // Obținem lista de categorii (cheile quiz-urilor)
  const quizCategories = Object.keys(questionsData);

  return {
    props: { quizCategories }, // Transmitem categoriile ca props către componentă
  };
}
