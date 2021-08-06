import React, { useEffect } from "react";
import Intro from "../components/Intro";
import MyTable from "../components/Table";
import { connect } from "react-redux";
import { getRooms } from "../actions/room-actions";
import Loading from "../components/Loading";
import { Container } from "@material-ui/core";
const Home = ({ getRooms, rooms, user }) => {
  //fetching bets
  useEffect(() => {
    getRooms();
  }, [getRooms]);

  if (!rooms) {
    return <Loading />;
  }
  return (
    <>
      <Intro user={user} />
      <Container maxWidth="md">
        <MyTable rooms={rooms} />
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  let newRooms = Object.values(state.room).slice(5);

  return { rooms: newRooms, user: state.user };
};
export default connect(mapStateToProps, { getRooms })(Home);
