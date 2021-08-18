import React from "react";
import MyTable from "../components/Table";

import { useQuery } from "react-query";
import { getRooms } from "../api/api";
import Loading from "../components/Loading";
const Bets = () => {
  const { data, error, isLoading, isError } = useQuery("rooms", getRooms);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return <MyTable rooms={data} />;
};

export default Bets;
