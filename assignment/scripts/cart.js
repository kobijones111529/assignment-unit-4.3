console.log('***** Cart Functions *****');
// Make sure to test all functions here in the JS file!
// We want to see how you are testing your code!!!

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

{
  console.log('-- Testing addItem --');
  basket = [];
  const newItem = 'apple';
  console.log(`Adding ${newItem} to basket`)
  console.log(`Basket should be`, [newItem]);
  console.log('Listing items in basket...');
  addItem(newItem);
  listItems();
}

{
  console.log('-- Testing addItem --');
  basket = ['tungsten cube', 'jellyfish', 'water', 'iPhone'];
  const oldBasket = basket.slice();
  const newItem1 = 'pear';
  const newItem2 = 'bread';
  console.log(`Adding ${newItem1} and ${newItem2} to basket`);
  console.log(`addItem (should be true):`, addItem(newItem1));
  console.log(`addItem (should be false):`, addItem(newItem2));
  console.log(`Basket should be `, [...oldBasket, newItem1]);
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
