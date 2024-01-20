import { readDeck } from "../utils/api/index";
import {useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";

function Study () {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
  
    useEffect(() => {
      const abortController = new AbortController();
  
      readDeck(deckId, abortController.signal).then(setDeck);//.catch(setError);
  
      return () => abortController.abort();
    }, [deckId]);
  
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" className="btn btn-link">Go Home</Link> /
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}/study`} className="btn btn-link">{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item">
                        / Study
                    </li>
                </ol>
            </nav>
            <Card />
        </>
    );
}

export default Study;