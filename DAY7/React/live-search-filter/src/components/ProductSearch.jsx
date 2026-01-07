import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Food', 'Books'][i % 4],
  price: (Math.random() * 100 + 10).toFixed(2)
}));

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    if (searchTerm !== debouncedSearch) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const filtered = mockProducts.filter((product) => {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.price.includes(searchLower)
      );
    });
    setFilteredProducts(filtered);
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Product Search</h1>
          <p className="text-slate-600">Browse through our collection of products</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, category, or price..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {isSearching ? (
                <span className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Searching...
                </span>
              ) : (
                <span>
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
              )}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                <span className="text-xl font-bold text-blue-600">${product.price}</span>
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-700">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !isSearching && (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
