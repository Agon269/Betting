export const search = (arr, text) => {
  arr = Object.values(arr);

  return arr.filter((arr) => arr.id === text);
};
