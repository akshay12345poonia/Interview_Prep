const products = [
  ['Electronics', 'Laptop', 999],
  ['Clothing', 'Shirt', 29],
  ['Electronics', 'Mouse', 25],
  ['Clothing', 'Pants', 49],
  ['Electronics', 'Keyboard', 75],
  ['Clothing', 'Jacket', 89]
];

let result = products.reduce((acc, [cat, name, price]) => {
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push({ name, price});
  return acc;
}, {});

//sort by price within each category
for (let category in result) {
    result[category].sort((a,b) => a.price-b.price)
}
console.log(result);