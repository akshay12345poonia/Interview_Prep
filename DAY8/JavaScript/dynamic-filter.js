function applyFilter(products, filters){
    return products.filter(product => {
        if(filters.category && product.category !== filters.category){
            return false;
        }
        if(filters.minPrice !== undefined && product.price < filters.minPrice){
            return false;
        }
        if(filters.minRating !== undefined && product.inStock !== filters.inStock){
            return false;
        }
        return true;
    });
}

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999, rating: 4.5, inStock: true },
  { id: 2, name: 'Shirt', category: 'Clothing', price: 29, rating: 4.0, inStock: true },
  { id: 3, name: 'Phone', category: 'Electronics', price: 699, rating: 4.7, inStock: false },
  { id: 4, name: 'Pants', category: 'Clothing', price: 49, rating: 3.8, inStock: true },
  { id: 5, name: 'Tablet', category: 'Electronics', price: 499, rating: 4.3, inStock: true }
];

const filters = {
  category: 'Electronics',
  minPrice: 400,
  minRating: 4.0,
  inStock: true
};

console.log(applyFilter(products, filters))