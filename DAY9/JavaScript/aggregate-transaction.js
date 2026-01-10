function aggregateTransactions(transactions){
    return transactions.reduce((acc, transactions) => {
        const {category, items} = transactions
        if(!acc[category]){
            acc[category] = {total: 0, count: 0}
        }
        for(let item of items){
            acc[category].total += item.amount;
            acc[category].count += 1
        }
        return acc
    }, {});
}


const transactions = [
  {
    date: '2024-01-15',
    category: 'Food',
    items: [
      { name: 'Groceries', amount: 50 },
      { name: 'Restaurant', amount: 75 }
    ]
  },
  {
    date: '2024-01-16',
    category: 'Transport',
    items: [
      { name: 'Gas', amount: 40 },
      { name: 'Parking', amount: 10 }
    ]
  },
  {
    date: '2024-01-17',
    category: 'Food',
    items: [
      { name: 'Coffee', amount: 5 }
    ]
  }
];


console.log(aggregateTransactions(transactions))