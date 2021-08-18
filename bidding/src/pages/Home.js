import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import Intro from "../components/Intro";
import MyTable from "../components/Table";

// import { getRooms } from "../actions/room-actions";
import Loading from "../components/Loading";
import { Container } from "@material-ui/core";
import { useQuery } from "react-query";
import { getRooms } from "../api/api";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { data, error, isLoading, isError } = useQuery("rooms", getRooms);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <>
      <Intro user={user} />
      <Container maxWidth="md">
        <MyTable rooms={data} />
      </Container>
    </>
  );
};

export default Home;
