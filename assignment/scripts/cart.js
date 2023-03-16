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
  for (const item of basket) {
    console.log(item);
  }
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
  console.log('Listing items in basket...');
  listItems();
}

{
  console.log('-- Testing addItem --');
  empty();
  const testItems = ['tungsten cube', 'jellyfish', 'water', 'iPhone'];
  addItems(...testItems);
  console.assert(equal(basket, testItems), 'Basket should be', testItems);
  const newItem1 = 'pear';
  const newItem2 = 'bread';
  console.log(`Adding ${newItem1} and ${newItem2} to basket`);
  console.log(`addItem (should be true):`, addItem(newItem1));
  console.log(`addItem (should be false):`, addItem(newItem2));
  console.assert(equal(basket, [...testItems, newItem1]), 'Basket should be ', [...testItems, newItem1]);
  console.log('Listing items in basket...');
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
  console.log('Emptying array');
  empty();
  console.log('Basket should be', []);
  console.log('Listing items in basket...');
  listItems();
}

{
  console.log('-- Testing removeItem --');
  const remove = 'rice';
  console.log(`Removing ${remove} from basket`);
  const removed = removeItem(remove);
  console.log(`Removed ${removed === null ? 'nothing' : removed} from basket`);
  console.log('Listing items in basket...');
  listItems();
}

{
  console.log('-- Testing removeItem --');
  const remove = 'cheese';
  console.log(`Removing ${remove} from basket`);
  const removed = removeItem(remove);
  console.log(`Removed ${removed === null ? 'nothing' : removed} from basket`);
  console.log('Listing items in basket...');
  listItems();
}
