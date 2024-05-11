import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { deleteCard, listDecks, readDeck } from "../utils/api";

function Card({ card, setDeck }) {
  const { url } = useRouteMatch();
  console.log({ url });
  const { deckId } = useParams();

  const handleDelete = async () => {
    console.log(card.id)
    const abortController = new AbortController();
    await listDecks(abortController.signal);
    const result = window.confirm(
      `Do you want to delete this card? \n \nYou will not be able to recover it.`
    );
    if (result) {
      try {
        await deleteCard(card.id, abortController.signal);
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  return (
    <div className="card mx-auto">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p className="w-50 mr-3">{card.front}</p>
              <p className="w-50 text-right">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
              <Link
                to={`${url}/cards/${card.id}/edit`}
                className="btn btn-secondary mr-2"
              >
                <i className="bi bi-pen"></i> Edit
              </Link>

              <button
                type="delete"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"> Delete </i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;