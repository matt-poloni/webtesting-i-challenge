module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return item.enhancement < 20
    ? { ...item, enhancement: ++item.enhancement }
    : item;
}

function fail(item) {
  const res = { ...item }
  if(res.enhancement < 15) {
    return { ...res, durability: res.durability - 5 };
  } else {
    res.durability -= 10;
    return res.enhancement > 16
      ? { ...res, enhancement: --res.enhancement }
      : res;
  }
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
