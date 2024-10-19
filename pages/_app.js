// pages/_app.js
import './styles/globals.css'; // Asigură-te că calea este corectă

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
