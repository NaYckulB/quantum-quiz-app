import { useRouter } from 'next/router';
import Link from 'next/link'; // Adăugăm importul corect pentru componenta Link

export default function Results() {
  const router = useRouter();
  const { score, total } = router.query; // Extragem score și total din query string

  // Verificăm dacă valorile score și total sunt disponibile
  if (!score || !total) {
    return <div>Loading...</div>; // Afișăm un mesaj de încărcare până când valorile sunt disponibile
  }

  return (
    <div className="container centered">
      <h1 className="green-title">Your results</h1>
      <p>You answered correctly to{score} from {total} questions.</p>
      
      {score / total >= 0.8 ? (
        <p className="feedback">Congratulations! You are very well prepared!</p>
      ) : (
        <p className="feedback">Not bad, but you still have room for improvements!</p>
      )}

      <Link href="/categories" className="link">
      Back to categories
      </Link>
    </div>
  );
}

