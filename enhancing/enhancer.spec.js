const {
  succeed,
  fail,
  repair,
  get,
  Item,
} = require('./enhancer.js');

describe('enhancer.js', () => {
  describe('Item class', () => {
    describe('name property', () => {
      it('should have a name property', () => {
        const item = new Item();
        expect('name' in item).toBe(true);
      })
    })

    describe('durability property', () => {
      it('should have a durability property', () => {
        const item = new Item();
        expect('durability' in item).toBe(true);
      })

      it('should be no greater than 100', () => {
        const item = new Item('Item', 101, 0);
        expect(item.durability).not.toBeGreaterThan(100);
      })

      it('should be no less than 0', () => {
        const item = new Item('Item', -1, 0);
        expect(item.durability).not.toBeLessThan(0);
      })
    })

    describe('enhancement property', () => {
      it('should have an enhancement property', () => {
        const item = new Item();
        expect('enhancement' in item).toBe(true);
      })

      it('should be no greater than 100', () => {
        const item = new Item('Item', 50, 21);
        expect(item.enhancement).not.toBeGreaterThan(20);
      })

      it('should be no less than 0', () => {
        const item = new Item('Item', 50, -1);
        expect(item.enhancement).not.toBeLessThan(0);
      })
    })
  })

  describe('repair() method', () => {
    it('should restore durability to 100', () => {
      const item = new Item('Item', 0, 0);
      expect(repair(item).durability).toBe(100);
    })
  })

  describe('succeed() method', () => {
    it('should increase enhancement by 1 if < 20', () => {
      const item = new Item('Item', 50, 0);
      expect(succeed(item).enhancement).toBe(1);
    })

    it('should not increase enhancement if already === 20', () => {
      const item = new Item('Item', 50, 20);
      expect(succeed(item).enhancement).toBe(20);
    })

    it("should not change the item's durability", () => {
      const item = new Item('Item', 50, 20);
      expect(succeed(item).durability).toBe(50);
      item.enhancement = 0;
      expect(succeed(item).durability).toBe(50);
    })
  })
  
  describe('fail() method', () => {
    it('should decrease durability by 5 if enhancement < 15', () => {
      const item = new Item('Item', 100, 0);
      expect(fail(item).durability).toBe(95);
    })

    it('should decrease durability by 10 if enhancement >= 15', () => {
      const item = new Item('Item', 100, 16);
      expect(fail(item).durability).toBe(90);
    })

    it('should decrease enhancement by 1 if > 16', () => {
      const item = new Item('Item', 100, 20);
      expect(fail(item).enhancement).toBe(19);
    })
  })

  describe('get() method', () => {
    it('should not modify the name if enhancement === 0', () => {
      const item = new Item('Item', 50, 0);
      expect(get(item).name).toBe('Item');
    })

    it('should properly modify names of items w/ enhancement > 0', () => {
      const item = new Item('Item', 50, 20);
      expect(get(item).name).toBe('[+20] Item');
    })
  })
})