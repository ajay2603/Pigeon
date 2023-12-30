const moveIndexFront = (list, item) => {
  const newList = list.filter((val) => val !== item);
  newList.unshift(item);
  return newList;
};

module.exports = moveIndexFront;
