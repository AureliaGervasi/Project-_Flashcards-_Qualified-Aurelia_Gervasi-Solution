import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Deck from "./Deck";

function DeckList({ decks, deleteDeckById }) {
  const { url } = useRouteMatch();
  console.log({ url });

  const rows = decks.map((deck) => (
    <Deck
      key={deck.id}
      deck={deck}
      cards={deck.cards || []}
      deleteDeckById={deleteDeckById}
    />
  ));

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto">
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Link to="/decks/new" className="btn btn-secondary mx-auto">
          <i className="bi bi-plus"></i> Create Deck
          </Link>
        </div>
        <div>{rows}</div>
      </div>
    </div>
    </div>
  );
}

export default DeckList;