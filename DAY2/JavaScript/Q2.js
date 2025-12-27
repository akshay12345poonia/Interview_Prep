const orders = [
  {
    orderId: 'A1',
    customer: { name: 'John', location: { city: 'NYC', country: 'USA' } },
    items: [
      { product: 'Laptop', quantity: 1, price: 999 },
      { product: 'Mouse', quantity: 2, price: 25 }
    ]
  },
  {
    orderId: 'A2',
    customer: { name: 'Jane', location: { city: 'LA', country: 'USA' } },
    items: [
      { product: 'Keyboard', quantity: 1, price: 75 }
    ]
  }
];

let res = orders.map(order => {
    let totalAmount = order.items.reduce(
        (sum, item) => sum + item.quantity * item.price, 0
    );
    return {
        orderId: order.orderId,
        customerName: order.customer.name,
        city: order.customer.location.city,
        totalAmount
    };
})

console.log(res)