const {
  succeed,
  fail,
  repair,
  get,
} = require('./enhancer.js');

describe('enhancer.js', () => {
  describe('repair() method', () => {
    it('should restore durability to 100', () => {
      const item = { durability: 0 };
      expect(repair(item).durability).toBe(100);
    })
  })

  describe('succeed() method', () => {
    it('should increase enhancement by 1 if < 20', () => {
      const item = { enhancement: 0 };
      expect(succeed(item).enhancement).toBe(1);
    })

    it('should not increase enhancement if already === 20', () => {
      const item = { enhancement: 20 };
      expect(succeed(item).enhancement).toBe(20);
    })

    it("should not change the item's durability", () => {
      const item = { enhancement: 20, durability: 50 };
      expect(succeed(item).durability).toBe(50);
      item.enhancement = 0;
      expect(succeed(item).durability).toBe(50);
    })
  })
  
  describe('fail() method', () => {
    it('should decrease durability by 5 if enhancement < 15', () => {
      const item = { durability: 100, enhancement: 0 };
      expect(fail(item).durability).toBe(95);
    })

    it('should decrease durability by 10 if enhancement >= 15', () => {
      const item = { durability: 100, enhancement: 16 };
      expect(fail(item).durability).toBe(90);
    })

    it('should decrease enhancement by 1 if > 16', () => {
      const item = { durability: 100, enhancement: 20 };
      expect(fail(item).enhancement).toBe(19);
    })
  })
})