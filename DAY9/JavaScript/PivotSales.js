function pivotSales(sales){
    return sales.reduce((acc, {month, product, amount}) =>{
        if(!acc[product]){
            acc[product] = {total: 0};
        }
        acc[product][month] = amount;
        acc[product].total += amount;
        return acc
    }, {})
}

const sales = [
  { month: 'Jan', product: 'A', amount: 100 },
  { month: 'Jan', product: 'B', amount: 150 },
  { month: 'Feb', product: 'A', amount: 120 },
  { month: 'Feb', product: 'B', amount: 180 },
  { month: 'Mar', product: 'A', amount: 110 },
  { month: 'Mar', product: 'B', amount: 160 }
];

console.log(pivotSales(sales))