import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Welcome to the Quantum Physics Quiz</h1>
      <Link href="/categories" className="link">
        Go to Categories
      </Link>
    </div>
  );
}
