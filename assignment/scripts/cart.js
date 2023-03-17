console.log('***** Cart Functions *****');
// Make sure to test all functions here in the JS file!
// We want to see how you are testing your code!!!

/**
 * Utility function for doing a strict
 * deep comparison of two values of
 * any type
 * @param {any} a First value
 * @param {any} b Second value
 * @returns {boolean}
 */
const equal = (a, b) => {
  if (typeof a !== typeof b)
    return false;

  // typeof null === 'object'
  if (a === null && b === null)
    return true;
  else if (
    a === null && b !== null ||
    b === null && a !== null
  )
    return false;

  if (typeof a === 'object') {
    if (a instanceof Array) {
      if (a.length !== b.length)
        return false;

      for (const i in a) {
        if (!equal(a[i], b[i]))
          return false;
      }

      return true;
    }

    // Sort and compare defined entries
    const definedEntries = obj =>
      Object.entries(obj).filter(([_, value]) => value !== undefined);
    return equal(definedEntries(a).sort(), definedEntries(b).sort());
  }

  return a === b;
};

console.assert(
  equal(undefined, undefined),
  '%o should equal %o',
  undefined,
  undefined
);
console.assert(equal(null, null), '%o should equal %o', null, null);
console.assert(
  !equal(null, { a: 1 }),
  '%o should not equal %o',
  null,
  { a: 1 }
);
console.assert(!equal({}, null), '%o should not equal %o', {}, null);
console.assert(
  equal({ a: undefined }, {}),
  '%o should equal %o',
  { a: undefined },
  {}
);
console.assert(
  equal({ a: 1, b: 2 }, { b: 2, a: 1 }),
  '%o should equal %o',
  { a: 1, b: 2 },
  { b: 2, a: 1 }
);
console.assert(
  !equal(undefined, false),
  '%o should not equal %o',
  undefined,
  false
);
console.assert(
  equal({ a: [1, 2], b: 'hi' }, { a: [1, 2], b: 'hi' }),
  '%o should equal %o',
  { a: [1, 2], b: 'hi' },
  { a: [1, 2], b: 'hi' }
);
console.assert(equal([], []), '%o should equal %o', [], []);
console.assert(!equal([], [1, 2]), '%o should not equal %o', [], [1, 2]);
console.assert(
  equal(['hello', 'there'], ['hello', 'there']),
  '%o should equal %o',
  ['hello', 'there'],
  ['hello', 'there']
);
console.assert(
  !equal([1, 2, 3], [1, 3, 2]),
  '%o should not equal %o',
  [1, 2, 3],
  [1, 3, 2]
);
console.assert(
  equal([[1, 2], ['hi', 'hello']], [[1, 2], ['hi', 'hello']]),
  '%o should equal %o',
  [[1, 2], ['hi', 'hello']],
  [[1, 2], ['hi', 'hello']]
);


const maxItems = 5;
let basket = [];

function isFull() {
  return basket.length >= maxItems;
}

function addItem(item) {
  if (isFull())
    return false;

  basket.push(item);
  return true;
}

function addItems(...items) {
  basket.push(...items.slice(0, maxItems - basket.length));
}

function listItems() {
  console.group('Items in basket');
  for (const item of basket) {
    console.log(item);
  }
  console.groupEnd();
}

function empty() {
  basket.splice(0);
}

function removeItem(item) {
  const index = basket.indexOf(item);

  if (index === -1)
    return null;

  return basket.splice(index, 1)[0];
}


/// Testing ///

const test = (name, fn) => {
  const css = `
    font-family: 'Courier New';
    font-weight: lighter;
    font-size: 1.2em;
  `;
  console.group('Testing %c%s', css, name);
  fn();
  console.groupEnd();
};

test(addItem.name, () => {
  basket = [];
  console.log('Basket is', basket);
  const newItem = 'apple';
  console.log('Adding %o to basket', newItem);
  console.log('addItem (should be %o):', !isFull(), addItem(newItem));
  console.assert(equal(basket, [newItem]), 'Basket should be', [newItem]);
  console.log('Basket is', basket);
});

test(addItem.name, () => {
  basket =
    ['tungsten cube', 'jellyfish', 'water', 'iPhone', 'spaghetti noodle'];
  console.log('Basket is', basket);
  const newItem = 'bread';
  console.log('Adding %o to basket', newItem);
  console.log(`addItem (should be %o):`, false, addItem(newItem));
  const expected =
    ['tungsten cube', 'jellyfish', 'water', 'iPhone', 'spaghetti noodle'];
  console.assert(equal(basket, expected), 'Basket should be ', expected);
  console.log('Basket is', basket);
});

test(addItems.name, () => {
  basket = ['rice', 'lettuce'];
  console.log('Basket is', basket);
  const newItems = ['worse lettuce', 'purple'];
  console.log('Adding %o to basket', newItems);
  addItems(...newItems);
  const expected = ['rice', 'lettuce', 'worse lettuce', 'purple'];
  console.assert(equal(basket, expected), 'Basket should be', expected);
  console.log('Basket is', basket);
});

test(empty.name, () => {
  basket = ['modestly sized townhouse', 'granola'];
  console.log('Basket is', basket);
  console.log('Emptying basket');
  empty();
  console.assert(equal(basket, []), 'Basket should be', []);
  console.log('Basket is', basket);
});

test(removeItem.name, () => {
  basket = ['green eggs', 'ham', 'Sam I am'];
  console.log('Basket is', basket);
  const remove = 'ham';
  console.log('Removing %o from basket', remove);
  const removed = removeItem(remove);
  console.log(
    `Removed ${removed === null ? '%s' : '%o'} from basket`,
    removed === null ? 'nothing' : removed
  );
  console.assert(equal(basket, ['green eggs', 'Sam I am']));
  console.log('Basket is', basket);
});

test(removeItem.name, () => {
  basket = ['nacho'];
  console.log('Basket is', basket);
  const remove = 'cheese';
  console.log('Removing %o from basket', remove);
  const removed = removeItem(remove);
  console.log(
    `Removed ${removed === null ? '%s' : '%o'} from basket`,
    removed === null ? 'nothing' : removed
  );
  console.assert(equal(basket, ['nacho']), 'Basket should be', ['nacho']);
  console.log('Basket is', basket);
});
