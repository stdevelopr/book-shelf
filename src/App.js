import React from "react";
import { useDispatch } from "react-redux";
import { sagaTypes } from "./sagas/books";
import BookCategory from "./pages/BookCategory";
import BookView from "./pages/BookView";
import BookControl from "./pages/BookControl";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  dispatch({ type: sagaTypes.FETCH_STORAGE_BOOKS });
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/category">
        <BookCategory />
      </Route>
      <Route path="/book">
        <BookView />
      </Route>
      <Route path="/control">
        <BookControl />
      </Route>
    </Switch>
  );
}

export default App;
