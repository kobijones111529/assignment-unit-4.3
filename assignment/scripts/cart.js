console.log('***** Cart Functions *****');
// Make sure to test all functions here in the JS file!
// We want to see how you are testing your code!!!

/**
 * Utility function for comparing arrays
 * @param {any[]} a First array
 * @param {any[]} b Second array
 * @returns 
 */
function equal(a, b) {
  if (a.length != b.length)
    return false;
  
  for (const i in a) {
    if (a[i] !== b[i])
      return false;
  }

  return true;
}

console.assert(equal([], []), '%o should equal %o', [], []);
console.assert(!equal([], [1, 2]), '%o should not equal %o', [], [1, 2]);
console.assert(equal(['hello', 'there'], ['hello', 'there']), '%o should equal %o', ['hello', 'there'], ['hello', 'there'])
console.assert(!equal([1, 2, 3], [1, 3, 2]), '%o should not equal %o', [1, 2, 3], [1, 3, 2]);

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


/// Tests ///

{
  console.log('-- Testing addItem --');
  basket = [];
  console.log('Basket is', basket);
  const newItem = 'apple';
  console.log('Adding %o to basket', newItem)
  console.log('addItem (should be %o):', !isFull(), addItem(newItem));
  console.assert(equal(basket, [newItem]), 'Basket should be', [newItem]);
  console.log('Basket is', basket);
}

{
  console.log('-- Testing addItem --');
  basket = ['tungsten cube', 'jellyfish', 'water', 'iPhone', 'spaghetti noodle'];
  console.log('Basket is', basket);
  const newItem = 'bread';
  console.log('Adding %o to basket', newItem);
  console.log(`addItem (should be %o):`, false, addItem(newItem));
  const expected = ['tungsten cube', 'jellyfish', 'water', 'iPhone', 'spaghetti noodle'];
  console.assert(equal(basket, expected), 'Basket should be ', expected);
  console.log('Basket is', basket);
}

{
  console.log('-- Testing removeItem --');
  basket = ['Apple M1 Pro laptop', 'pear', 'child'];
  console.log('Basket is', basket);
  const remove = 'pear';
  console.log(`Removing ${remove} from basket`);
  console.log(`Removed ${removeItem(remove)} from basket`);
  const expected = ['Apple M1 Pro laptop', 'child'];
  console.assert(equal(basket, expected), 'Basket should be', expected);
  console.log('Basket is', basket);
}

{
  console.log('-- Testing addItems --');
  basket = ['rice', 'lettuce'];
  console.log('Basket is', basket);
  const newItems = ['worse lettuce', 'purple'];
  console.log('Adding %o to basket', newItems);
  addItems(...newItems);
  console.assert(equal(basket, ['rice', 'lettuce', 'worse lettuce', 'purple']));
  console.log('Basket is', basket);
}

{
  console.log('-- Testing empty --');
  basket = ['modestly sized townhouse', 'granola'];
  console.log('Basket is', basket);
  console.log('Emptying basket');
  empty();
  console.assert(equal(basket, []), 'Basket should be', []);
  console.log('Basket is', basket);
}

{
  console.log('-- Testing removeItem --');
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
}

{
  console.log('-- Testing removeItem --');
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
}
