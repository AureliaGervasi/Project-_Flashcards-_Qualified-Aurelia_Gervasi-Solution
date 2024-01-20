import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavHome from "./NavHome";

function StudyCard() {
  const [cardIndex, setCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [deck, setDeck] = useState({ cards: [] });

  const history = useHistory();

  const { deckId } = useParams();

  useEffect(() => {
    async function readDeckData() {
      const abortController = new AbortController();
      const deckAPI = await readDeck(deckId, abortController.signal);
      setDeck(deckAPI);
    }
    readDeckData();
  }, [deckId])

  
  const card = deck.cards[cardIndex];

  const totalCards = deck.cards.length;

  const flipCard = () => {
    setShowFront(!showFront);
  };

  const clickHandler = () => {
    if (cardIndex < totalCards - 1) {
      setCardIndex(cardIndex + 1);
      setShowFront(true);
    } else {
      const restartConfirmed = window.confirm(
        `Restart cards? \n \nClick 'OK' to restart or 'Cancel' to return to the home page.`
      );
      if (restartConfirmed) {
        setCardIndex(0);
        setShowFront(true);
      } else {
        history.push("/");
      }
    }
  };

  if (totalCards > 2) {
    return (
     
        <NavHome deck={deck.name} heading="Study">
        <h1>Study: {deck.name}</h1>

        <div className="card mx-auto">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {totalCards}{" "}
            </h5>

            <p className="card-text">{showFront ? card.front : card.back}</p>

            <div style={{ display: "flex", justifyContent: "start" }}>
              <button
                className="btn btn-secondary mr-2"
                type="button"
                onClick={flipCard}
              >
                Flip
              </button>
              {!showFront && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={clickHandler}
              >
                Next
              </button>
              )}
            </div>
          </div>
        </div>
      
      </NavHome>
    );
  }
  return (
    <div>
      <NavHome deck={deck.name} heading="Study" />
      <h1>Study: {deck.name}</h1>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {totalCards} cards in this
        deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
        <i className="bi bi-plus"></i> Add Cards
      </Link>
    </div>
  );
}

export default StudyCard;