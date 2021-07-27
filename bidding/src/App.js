import React from "react";
import Header from "./components/Header";
import User from "./pages/User";
import BetPage from "./pages/BetPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute exact path="/user" component={User} />
        <Route path="/bet" component={BetPage} />
      </Switch>
    </Router>
  );
}

export default App;
