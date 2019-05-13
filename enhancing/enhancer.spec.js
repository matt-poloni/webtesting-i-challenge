const {
  succeed,
  fail,
  repair,
  get,
} = require('./enhancer.js');
// test away!

describe('enhancer.js', () => {
  describe('repair() method', () => {
    it('restores durability to 100', () => {
      const item = { durability: 0 };
      expect(repair(item).durability).toBe(100);
    })
  })
})