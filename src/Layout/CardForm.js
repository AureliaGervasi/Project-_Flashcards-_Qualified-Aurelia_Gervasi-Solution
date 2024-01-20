import React from "react";
import { Link } from "react-router-dom";

function CardForm({ cardData, handleSubmit, handleChange, deck }) {
  return (
    <form name="create" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={cardData.front}
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          placeholder="Back side of card"
          onChange={handleChange}
          value={cardData.back}
          rows="3"
        ></textarea>
      </div>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;