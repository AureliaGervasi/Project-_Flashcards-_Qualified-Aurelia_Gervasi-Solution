import React from "react";
import Card from "./Card";

// title is "Cards"
// map through the cards

function CardList({ deck, cards, setDeck }) {
  if (!cards || cards.length === 0) {
    return (
      <div className="mt-4">
      <h3>Cards </h3>
    <p>There are no cards yet! </p>
    </div>
    );
  }
  const rowOfCards = cards.map((card) => (
    <Card key={card.id} deck={deck} card={card} setDeck={setDeck} />
  ));

  return (
      <div className="mt-4">
        <h3>Cards</h3>
        <div>{rowOfCards}</div>
      </div>
  );
}

export default CardList;