import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import NavHome from "./NavHome";
import CardForm from "./CardForm";

function AddCard() {
  const initialFormState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialFormState);
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();
  console.log(deckId);

  // const deck = decks.find((deck) => deck.id === Number(deckId));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function readDeckData() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
      } catch (error) {
        console.error(error);
      }
    }
    readDeckData();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const newCardData = {
      front: newCard.front,
      back: newCard.back,
    };
    await createCard(deckId, newCardData, abortController.signal);
    setNewCard(initialFormState);
  };

  // if (!deck) {
  //   return <NotFound />;
  // }

  return (
    <NavHome deck={deck.name} heading="Add Card">
      <h3>
        <span>{deck.name}</span>: Add Card
      </h3>
      <CardForm
        cardData={newCard}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deck={deck}
      />
    </NavHome>
  );
}

export default AddCard;