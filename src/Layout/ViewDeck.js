import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "./CardList";
import NavHome from "./NavHome";

function ViewDeck({ deleteDeckById }) {
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  console.log({ url });

  useEffect(() => {
    async function loadDeckData() {
      try {
        const abortController = new AbortController();
        const deckAPI = await readDeck(deckId, abortController.signal);
        setDeck(deckAPI);
      } catch (error) {
        console.error(error);
      }
    }
    loadDeckData();
  }, [deckId]);

  const handleDelete = () => {
    deleteDeckById(deck.id);
    history.push(`/`);
  };

  console.log("current deck", deck);

  return (
    <NavHome deck={deck.name}>
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div className="deck d-flex justify-content-between">
        <div>
          <Link to={`${url}/edit`} className="btn btn-secondary mr-2">
            <i className="bi bi-pen"></i> Edit
          </Link>

          <Link to={`${url}/study`} className="btn btn-primary mr-2">
            <i className="bi bi-eyeglasses"></i> Study
          </Link>

          <Link to={`${url}/cards/new`} className="btn btn-secondary">
            <i className="bi bi-plus"></i> Add Cards
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="delete"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <CardList cards={deck.cards} deck={deck} setDeck={setDeck} />
    </NavHome>
  );
}

export default ViewDeck;