import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>¿Qué elemento eres tú?</h1>
      <p>(basado en cosas completamente aleatorias)</p>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  );
}
