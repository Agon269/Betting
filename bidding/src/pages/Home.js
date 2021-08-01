import React, { useEffect } from "react";
import Intro from "../components/Intro";
import MyTable from "../components/Table";
import { connect } from "react-redux";
import { getBets } from "../actions";
import Loading from "../components/Loading";
const Home = ({ getBets, bets, user }) => {
  //fetching bets
  useEffect(() => {
    getBets();
  }, [getBets]);
  if (!bets) {
    return <Loading />;
  }
  return (
    <>
      <Intro user={user} />
      <MyTable bets={bets} />
    </>
  );
};
const mapStateToProps = (state) => {
  let bets = Object.values(state.bets);
  return { bets, user: state.user };
};
export default connect(mapStateToProps, { getBets })(Home);
