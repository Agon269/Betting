import React from "react";
import Auth from "./Auth";
import BetDetails from "./components/BetDetails";
import Header from "./components/Header";
import Intro from "./components/Intro";
import MyTable from "./components/Table";
import User from "./pages/User";
import BetPage from "./pages/BetPage";
function App() {
  return (
    <div>
      <Header />

      {/* <User /> */}
      {/* <Intro />
      <BetDetails />
      <MyTable /> */}
      <BetPage />

      <Auth />
    </div>
  );
}

export default App;
