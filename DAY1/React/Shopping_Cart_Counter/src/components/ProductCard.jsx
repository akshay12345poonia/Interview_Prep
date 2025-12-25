import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

function ProductCard({ product }) {
  const[quantity, setQuantity] =useState(0);

  const unitPrice = product.price;
  const subtotal = quantity * unitPrice;
  const hasDiscount = quantity >= 5;
  const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  const increment =() => setQuantity(prev => prev + 1);
  const decrement = ()=> setQuantity(prev => Math.max(0, prev -1));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover" />
        {quantity > 0 && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
            {quantity}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Unit Price:</span>
            <span className="text-lg font-semibold text-gray-800">
              ${unitPrice.toFixed(2)}
            </span>
          </div>

          {quantity > 0 && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-lg font-semibold text-gray-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {hasDiscount && (
                <div className="flex items-center justify-between mb-2 text-green-600">
                  <span>Discount (10%):</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200">
                <span className="text-gray-800 font-bold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        {hasDiscount && (
          <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg text-center animate-pulse">
            <p className="font-bold text-sm">
              🎉 Bulk Discount Applied! Save 10%
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={decrement}
            disabled={quantity === 0}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="flex-1 bg-blue-50 py-3 px-4 rounded-lg text-center">
            <span className="text-2xl font-bold text-blue-600">{quantity}</span>
          </div>

          <button
            onClick={increment}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {quantity === 4 && (
          <p className="mt-3 text-sm text-center text-amber-600 font-semibold">
            Add 1 more to unlock 10% discount!
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
