import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import Header from "./Header";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import StudyCard from "./StudyCard";
import ViewDeck from "./ViewDeck";
import EditCard from "./EditCard";
import NotFound from "./NotFound";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function deckData() {
      try {
        const decksAPI = await listDecks(abortController.signal);
        setDecks(decksAPI);
      } catch (error) {
        console.error(error);
      }
    }

    deckData();
  }, []);

  const updateDecks = (newDeck) => {
    setDecks([...decks, newDeck]);
  };

  const deleteDeckById = async (deckId) => {
    const abortController = new AbortController();
    const result = window.confirm(
      `Do you want to delete this deck? \n \nYou will not be able to recover it.`
    );
    if (result) {
      console.log("Deleting deck with ID:", deckId);
      try {
        await deleteDeck(deckId, abortController.signal);
      
        const decksAPI = await listDecks(abortController.signal);
        setDecks(decksAPI);

      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  return (
    <main>
      <Header />
      <div className="container">
        <Switch>
          {/* main routes  */}
          <Route exact path="/">
            <DeckList decks={decks} deleteDeckById={deleteDeckById} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck decks={decks} updateDecks={updateDecks} />
          </Route>

          {/* deck routes */}
          <Route exact path="/decks/:deckId">
            <ViewDeck deleteDeckById={deleteDeckById} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck decks={decks} />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          {/* card routes */}
          <Route exact path="/decks/:deckId/study">
            <StudyCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Layout;