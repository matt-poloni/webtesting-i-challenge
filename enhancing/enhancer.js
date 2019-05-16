module.exports = {
  succeed,
  fail,
  repair,
  get,
  Item,
};

function succeed(item) {
  return item.enhancement < 20
    ? new Item(item.name, item.durability, ++item.enhancement)
    : item;
}

function fail(item) {
  const res = Object.assign(new Item(), item);
  if(res.enhancement < 15) {
    res.durability = Math.max(0, res.durability - 5);
  } else {
    res.durability = Math.max(0, res.durability - 10);
    if(res.enhancement > 16) {
      --res.enhancement;
    }
  }
  return res;
}

function repair(item) {
  const res = new Item(item.name, 100, item.enhancement);
  return res;
}

function get(item) {
  if(item.enhancement > 0) {
    const res = new Item(`[+${item.enhancement}] ${item.name}`, item.durability, item.enhancement);
    return res;
  }
  return item;
}

function Item(name, dur, enh) {
  this.name = this.nameCoerce(name);
  this.durability = this.numCoerce(dur, 0, 100, 50);
  this.enhancement = this.numCoerce(enh, 0, 20, 0);
}
Item.prototype.nameCoerce = function(name = 'Item') {
  if(typeof name !== 'string') name = 'Item';
  return `${name}`;
}
Item.prototype.numCoerce = function(num, min, max, def) {
  num = Number(num);
  if(`${num}` === 'NaN') num = def;
  if(num < min) return min
  else if(num > max) return max
  else return num;
}
