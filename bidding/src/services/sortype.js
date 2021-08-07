export const sortProperty = (sortBy) => {
  if (sortBy === "Bet Amount") return "amountBet";
  if (sortBy === "Creater") return "creater";
  if (sortBy === "Category") return "category";
  if (sortBy === "Expire Date") return "expireDate";
};
