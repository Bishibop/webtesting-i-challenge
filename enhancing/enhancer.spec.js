const enhancer = require('./enhancer.js');

describe('test repair()', () => {
  const item = {
    name: 'Great Hammer',
    enhancement: 5,
    durability: 50
  };

  it('sets durability to 100', () => {
    expect(enhancer.repair(item).durability).toBe(100);
  });

  it('doesnt modify the name', () => {
    expect(enhancer.repair(item).name).toBe(item.name);
  });

  it('doesnt modify the enhancement', () => {
    expect(enhancer.repair(item).enhancement).toBe(item.enhancement);
  });
});

describe('test succeed()', () => {
  const item = {
    name: 'Great Hammer',
    enhancement: 5,
    durability: 50
  };

  const perfectItem = {
    name: 'Great Hammer',
    enhancement: 20,
    durability: 50
  };

  // Would it be preferable to create 1 new object and then test that
  // one object repeatedly?
  it('increases the enhancement by 1', () => {
    expect(enhancer.succeed(item).enhancement).toBe(6);
  });

  it('unless the enhancement is already 20', () => {
    expect(enhancer.succeed(perfectItem).enhancement).toBe(20);
  });

  it('doesnt modify the durability', () => {
    expect(enhancer.succeed(item).durability).toBe(50);
  });

  it('doesnt modify the name', () => {
    expect(enhancer.succeed(item).name).toBe('Great Hammer');
  });
});

describe('test fail()', () => {
  const item = {
    name: 'Great Hammer',
    enhancement: 10,
    durability: 50
  };
  const strongerItem = {
    name: 'Great Hammer',
    enhancement: 17,
    durability: 50
  };
  const damagedItem = {
    name: 'Great Hammer',
    enhancement: 17,
    durability: 2
  };

  it('doesnt affect weaker items', () => {
    expect(enhancer.fail(item).enhancement).toBe(10);
  });
  it('weakens highly enhanced items', () => {
    expect(enhancer.fail(strongerItem).enhancement).toBe(16);
  });
  it('damages regular items a little', () => {
    expect(enhancer.fail(item).durability).toBe(45);
  });
  it('damages highly enhanced items a lot', () => {
    expect(enhancer.fail(strongerItem).durability).toBe(40);
  });
  it('durability cannot go below 0', () => {
    expect(enhancer.fail(damagedItem).durability).toBe(0);
  });
});

describe('test get()', () => {
  const item = {
    name: 'Great Hammer',
    enhancement: 5,
    durability: 50
  };
  const boringItem = {
    name: 'Great Hammer',
    enhancement: 0,
    durability: 50
  };
  const modifiedItem = {
    name: '[+5] Great Hammer',
    enhancement: 5,
    durability: 50
  };
  const misnamedItem = {
    name: '[+4] Great Hammer',
    enhancement: 5,
    durability: 50
  };

  it('Adds the modifier if it isnt there', () => {
    expect(enhancer.get(item).name).toBe('[+5] Great Hammer');
  });
  it('Does nothing if enhancement is 0', () => {
    expect(enhancer.get(boringItem).name).toBe('Great Hammer');
  });
  it('Doesnt change if modifier is already there', () => {
    expect(enhancer.get(modifiedItem).name).toBe('[+5] Great Hammer');
  });
  it('Updates modifier if its wrong', () => {
    expect(enhancer.get(misnamedItem).name).toBe('[+5] Great Hammer');
  });
});
