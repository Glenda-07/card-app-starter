import { useEffect, useState ,alert } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Load the card to edit
  useEffect(() => {
    async function loadCard() {
      try {
        const cards = await getCards();
        const card = cards.find(card => Number(card.id) === Number(cardId));
        if (!card) throw new Error("Card not found");
        setValues(card);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [cardId]);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(updatedCard) {
    try {
      setBusy(true);
      await updateCard(updatedCard);
      alert("Card updated successfully!"); 
      navigate("/cards");
    } catch (err) {
      console.error(err);
      setError("Failed to edit card");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p>Loading card...</p>;
  if (error) return <p>{error}</p>;
  if (!values) return null;

  return (
    <main>
      <h1>Edit Card</h1>

      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update Card"
      />
    </main>
  );
}
