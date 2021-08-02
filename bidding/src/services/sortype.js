export const sortProperty = (sortBy) => {
  if (sortBy === "Bet Amount") return "betAmount";
  if (sortBy === "Creater") return "creater";
  if (sortBy === "Category") return "category";
  if (sortBy === "Expire Date") return "expireDate";
};
