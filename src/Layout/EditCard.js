import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import NavHome from "./NavHome";
import CardForm from "./CardForm";

// path is `/decks/:deckId/cards/:cardId/edit`
// use readDeck function (contains card to be edited) and readCard function (load the card to edit)
// title "Edit Card"
// breadcrumb at top has '/' link to home, name of deck that card is in, and "Edit Card :cardId"
// displays same form as AddCard screen, except it's prefilled with info for existing card
// Cancel and Save button goes to Deck Screen

function EditCard() {
  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState({});

  const { deckId, cardId } = useParams();
  console.log("Deck ID:", deckId);
  console.log("Card ID:", cardId);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function readCardData() {
      try {
        const readCardAPI = await readCard(cardId, abortController.signal);
        const readDeckAPI = await readDeck(deckId, abortController.signal);
        setCard(readCardAPI);
        setDeck(readDeckAPI);
      } catch (error) {
        console.error(error);
      }
    }
    readCardData();
  }, [cardId, deckId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const updated = await updateCard(
      {
        ...card,
        front: card.front,
        back: card.back,
      },
      abortController.signal
    );
    setCard(updated);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <NavHome deck={deck.name} heading={`Edit Card ${cardId}`}>
      <CardForm
        cardData={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deck={deck}
      />
    </NavHome>
  );
}

export default EditCard;