import React, { useEffect } from "react";
import MyTable from "../components/Table";
import { getBets } from "../actions/bet-actions";
import { connect } from "react-redux";
import _ from "lodash";
const Bets = ({ bets, getBets }) => {
  useEffect(() => {
    getBets();
  }, [getBets]);
  if (_.isEmpty(bets)) {
    return <div>Loading ....</div>;
  }
  return <MyTable bets={bets} />;
};
const mapStateToProps = (state) => {
  let newBets = Object.values(state.bets);
  return { bets: newBets };
};
export default connect(mapStateToProps, { getBets })(Bets);
