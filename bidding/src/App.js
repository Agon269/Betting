import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import Header from "./components/Header";
import User from "./pages/User";
import BetPage from "./pages/BetPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
        <Route path="/bet" component={BetPage} />
      </Switch>
    </Router>
  );
}

export default App;
