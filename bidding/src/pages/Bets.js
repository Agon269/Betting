import React, { useEffect } from "react";
import MyTable from "../components/Table";
import { getRooms } from "../actions/room-actions";
import { connect } from "react-redux";
import _ from "lodash";
import Loading from "../components/Loading";
const Bets = ({ rooms, getRooms }) => {
  useEffect(() => {
    getRooms();
  }, [getRooms]);
  if (_.isEmpty(rooms)) {
    return <Loading />;
  }

  return <MyTable rooms={rooms} />;
};
const mapStateToProps = (state) => {
  let newRooms = Object.values(state.room);
  return { rooms: newRooms };
};
export default connect(mapStateToProps, { getRooms })(Bets);
