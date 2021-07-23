import React from "react";
import BetDetails from "./components/BetDetails";
import Header from "./components/Header";
import Intro from "./components/Intro";
import MyTable from "./components/Table";
function App() {
  return (
    <div>
      <Header />
      <Intro />
      <BetDetails />
      <MyTable />
    </div>
  );
}

export default App;
