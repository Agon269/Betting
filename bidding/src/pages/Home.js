import React, { useEffect } from "react";
import Intro from "../components/Intro";
import MyTable from "../components/Table";
import { connect } from "react-redux";
import { getBets } from "../actions";
import Loading from "../components/Loading";
const Home = ({ getBets, bets }) => {
  //fetching bets
  useEffect(() => {
    getBets();
  }, [getBets]);
  if (!bets) {
    return <Loading />;
  }
  return (
    <>
      <Intro />
      <MyTable bets={bets} />
    </>
  );
};
const mapStateToProps = (state) => {
  let bets = Object.values(state.bets);
  return { bets };
};
export default connect(mapStateToProps, { getBets })(Home);
