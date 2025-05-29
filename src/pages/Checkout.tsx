import React, { useState } from 'react';
import apiClient from '@/lib/axios';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [confirmation, setConfirmation] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await apiClient.post('/orders', { address });
      setOrderTotal(response.data.total);
      setConfirmation('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      setConfirmation('Failed to place order.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-500 text-white p-2 rounded mb-4"
      >
        Place Order
      </button>
      {confirmation && <p className="text-lg font-bold text-green-700">{confirmation}</p>}
      {orderTotal > 0 && <p className="text-lg">Order Total: ${orderTotal}</p>}
    </div>
  );
};

export default Checkout; 