module.exports = {
  succeed,
  fail,
  repair,
  get,
  Item,
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
  return item.enhancement > 0
    ? { ...item, name: `[+${item.enhancement}] ${item.name}` }
    : item;
}

function Item(name, dur, enh) {
  this.name = this.nameCoerce(name);
  this.durability = this.durCoerce(dur);
  this.enhancement = this.enhCoerce(enh);
}
Item.prototype.nameCoerce = function(name = 'Item') {
  if(typeof name !== 'string') name = 'Item';
  return `${name}`;
}
Item.prototype.durCoerce = function(dur = 50) {
  dur = Number(dur);
  if(`${dur}` === 'NaN') dur = 50;
  if(dur < 0) return 0
  else if(dur > 100) return 100
  else return dur;
}
Item.prototype.enhCoerce = function(enh = 0) {
  enh = Number(enh);
  if(`${enh}` === 'NaN') enh = 0;
  if(enh < 0) return 0
  else if(enh > 20) return 20
  else return enh;
}
