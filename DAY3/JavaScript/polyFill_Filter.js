if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const array = this;
    const length = array.length;
    const result = [];
    
    for (let i = 0; i < length; i++) {
      if (i in array) {
        const shouldInclude = callback.call(thisArg, array[i], i, array);
        if (shouldInclude) {
          result.push(array[i]);
        }
      }
    }
    
    return result;
  };
}

console.log('\n=== Testing myFilter Polyfill ===');

const nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums2.myFilter(x => x % 2 === 0);
console.log('Filter Test 1 - Even numbers:', evens); // [2, 4, 6, 8, 10]

const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 499, inStock: true }
];
const available = products.myFilter(p => p.inStock && p.price < 800);
console.log('Filter Test 2 - Available products:', available); // [{ name: 'Tablet', price: 499, inStock: true }]

const priceFilter = {
  maxPrice: 700,
  checkPrice: function(product) {
    return product.price <= this.maxPrice;
  }
};
const affordable = products.myFilter(priceFilter.checkPrice, priceFilter);
console.log('Filter Test 3 (with thisArg):', affordable);
// [{ name: 'Phone', price: 699, inStock: false }, { name: 'Tablet', price: 499, inStock: true }]
