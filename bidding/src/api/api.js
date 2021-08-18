import betty from "./betty";
//api calls
export const getRooms = async () => {
  let response = await betty.get("/rooms/allrooms");

  if (response.status !== 200) {
    throw new Error("Something went wrong.");
  }

  return response.data.rooms;
};

export const getRoom = async ({ queryKey }) => {
  const [, { id }] = queryKey;

  let response = await betty.get(`/rooms/room/${id}`);

  if (response.status !== 200) {
    throw new Error("Something went wrong.");
  }

  return response.data.room;
};

export const getBet = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  let response = await betty.get(`/bets/bet/${id}`);
  if (response.status !== 200) {
    throw new Error("Something went wrong.");
  }
  return response.data.bet;
};

export const createBet = async (data) => {
  data.side = true;
  const response = await betty.post("/bets/createbet", { ...data });
  if (response.status !== 201) {
    throw new Error("Something went wrong.");
  }
  return response.data.bet;
};

export const createSubBet = async ({ id, ...data }) => {
  if (data.side === "For") data.side = true;
  else if (data.side === "Against") data.side = false;

  const response = await betty.post(`/bets/createSubBet/${id}`, {
    data,
  });
  if (response.status !== 201) {
    throw new Error("Something went wrong.");
  }
  return response.data.subBet;
};

export const matchBet = async (id) => {
  let response = await betty.post(`/bets/matchbet/${id}`);
  console.log(response.status);
  if (response.status !== 201) {
    throw new Error("Something went wrong.");
  }
  return response.data;
};

export const editBetCall = async ({ id, params }) => {
  let response = await betty.put(`/bets/bet/${id}`, { ...params });

  if (response.status !== 200) {
    throw new Error("Something went wrong.");
  }
  return response.data;
};
