import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  /* TODO: Complete the CardList page
    - display a list of cards (use the Card component to display each card)
    - delete button calling handleDelete with the card object
    - handle loading, busy, and error states
    - style as a grid UI */

const [cards, setCards] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [busy, setBusy] = useState(false);

async function load() {
  try {
    const data = await getCards();
    setCards(data);
  
} catch (error) {
    console.error("Error loading cards:", error);
    setError("Failed to load cards.");
} finally{
  setLoading(false);
}
}



useEffect(() => {
    load();
}, []);


async function handleDelete(card) {

    setBusy(true);
    try {
      //delete from backend
       const res = await deleteCard(card.id);
        if (res.ok) throw new Error(`HTTP ${res.status}`);

      //remove from local state
        setCards(prevCards => prevCards.filter(c => c.id !== card.id));
    } catch (error) {
        console.error("Error deleting card:", error);
        setError("Failed to delete card.");
    } finally {
        setBusy(false);
    }
  }
  return <main>
    <div>
      {
        cards.map(card => (
          <Card 
          key={card.id} 
          card={card} 
          onDelete={async () => {
          await deleteCard(card.id); 
          await load();
          }}
        busy={loading}  
        disabled = {busy}
        />
        ))
      }
    </div>
  </main>;
}