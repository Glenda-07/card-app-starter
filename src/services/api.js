/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */
const API_URL = process.env.REACT_APP_API_URL || "";

/**
 * TODO: If your backend routes differ, update the paths here.
 * Required endpoints:
 * - GET    /allcards
 * - POST   /addcard
 * - PUT    /updatecard/:id
 * - DELETE /deletecard/:id
 */

export async function getCards() {
  // GET /allcards (provided as reference)
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function addCard(card) {
  // TODO: implement POST /addcard
}

export async function updateCard(card) {
  const res = await fetch(`${API_URL}/editcard`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      card_id: card.id,          
      card_name: card.card_name,
      card_pic: card.card_pic,
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to update card: ${res.status} ${msg}`);
  }

  return res.json();
}



export function deleteCard(id) {
  // TODO: implement DELETE /deletecard/:id
  return fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
  });
}
