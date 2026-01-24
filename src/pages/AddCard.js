import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  /* TODO: Complete the AddCard page
    - display a form for adding a new card (use the CardForm component to display the form)
    - handle form submission to call addCard API
    - handle busy and error states
    - style as a form UI */

  const navigate = useNavigate();
  const [values, setValues] = useState({ card_name: "", card_pic: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  async function handleSubmit(card) {
    setBusy(true);
    setError("");
    try {
      const res = await addCard(card);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Card added successfully!");
      navigate("/cards");
    } catch (err) {
      console.error(err);
      setError("Failed to add card");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Add Card</h1>
      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Add Card"
      />
    </main>)
}
