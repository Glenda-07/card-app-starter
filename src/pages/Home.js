import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to our Card App!</h1>
      <p>
        This application allows you to view, add, edit, and delete cards.
      </p>

      <div className="home-actions">
        <Link to="/cards" className="btn primary">View Cards</Link>
        <Link to="/cards/add" className="btn secondary" >Add Card</Link>
      </div>
    </main>
  );
}
