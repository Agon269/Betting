import React from "react";
import Header from "./components/Header";
import User from "./pages/User";
import BetPage from "./pages/BetPage";
import Home from "./pages/Home";
import Bets from "./pages/Bets";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import history from "./history";
import CreateBet from "./pages/CreateBet";
import Room from "./pages/Room";
function App() {
  return (
    <Router history={history}>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/user" component={User} />
        <ProtectedRoute exact path="/createbet" component={CreateBet} />
        <Route exact path="/bets" component={Bets} />
        <Route exact path="/bet/:id" component={BetPage} />
        <Route exact path="/room/:id" component={Room} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
