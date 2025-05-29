import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiClient.get('/cart_items');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItem = async (itemId: number) => {
    try {
      await apiClient.delete(`/cart_items/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await apiClient.patch(`/cart_items/${itemId}`, { quantity });
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity } : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-700">${item.price}</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart; 