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
  empty();
  console.assert(equal(basket, []), 'Basket should be empty');
  const newItem = 'apple';
  console.log(`Adding ${newItem} to basket`)
  addItem(newItem);
  console.assert(equal(basket, [newItem]), `Basket should be`, [newItem]);
  listItems();
}

{
  console.log('-- Testing addItem --');
  empty();
  const testItems = ['tungsten cube', 'jellyfish', 'water', 'iPhone'];
  addItems(...testItems);
  console.assert(equal(basket, testItems), 'Basket should be', testItems);
  const newItems = ['pear', 'bread'];
  console.log(`Adding %o to basket`, newItems);
  for (const newItem of newItems) {
    console.log(`addItem (should be %o):`, !isFull(), addItem(newItem));
  }
  const expected = [...testItems, ...newItems].slice(0, maxItems);
  console.assert(equal(basket, expected), 'Basket should be ', expected);
  listItems();
}

{
  console.log('-- Testing removeItem --');
  const remove = 'pear';
  console.log(`Removing ${remove} from basket`);
  console.log(`Removed ${removeItem(remove)} from basket`);
  listItems();
}

{
  console.log('-- Testing addItems --');
  const newItmes = ['rice', 'lettuce', 'basil'];
  console.log(`Adding ${newItmes} to basket`);
  addItems(...newItmes);
  listItems();
}

{
  console.log('-- Testing empty --');
  empty();
  console.assert(equal(basket, []), 'Basket should be', []);
  const newItems = ['green onion', 'green apple', 'green carrots'];
  addItems(...newItems);
  console.assert(equal(basket, newItems), 'Basket should be', newItems);
  console.log('Emptying basket');
  empty();
  listItems();
}

{
  console.log('-- Testing removeItem --');
  const remove = 'rice';
  console.log(`Removing ${remove} from basket`);
  const removed = removeItem(remove);
  console.log(`Removed ${removed === null ? 'nothing' : removed} from basket`);
  listItems();
}

{
  console.log('-- Testing removeItem --');
  const remove = 'cheese';
  console.log(`Removing ${remove} from basket`);
  const removed = removeItem(remove);
  console.log(`Removed ${removed === null ? 'nothing' : removed} from basket`);
  listItems();
}
