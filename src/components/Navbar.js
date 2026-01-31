import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  /* TODO: Complete the navbar 
    - add links to CardList and AddCard pages 
    - style as a navbar UI */
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header>
      <strong>Card App</strong>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/cards/add">Add Card</NavLink>
        <NavLink to="/cards">All Cards</NavLink>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ): (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
