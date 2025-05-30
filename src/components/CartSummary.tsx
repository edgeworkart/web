import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface CartSummaryProps {
  items: CartItem[];
}

const SHIPPING_COST = 5;

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <ul className="mb-4">
        {items.map((item) => (
          <li key={item.id} data-cy="cart-item" className="flex justify-between py-2 border-b last:border-b-0">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity || 1}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mb-2">
        <span className="font-medium">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">Shipping</span>
        <span>${SHIPPING_COST.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Checkout</button>
    </div>
  );
};

export default CartSummary; 