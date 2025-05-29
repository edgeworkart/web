import React, { useState } from 'react';
import apiClient from '@/lib/axios';

interface CheckoutResponse {
  total: number;
}

const Checkout: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [confirmation, setConfirmation] = useState<string>('');

  const handleCheckout = async (): Promise<void> => {
    try {
      const response = await apiClient.post<CheckoutResponse>('/orders', { address });
      setOrderTotal(response.data.total);
      setConfirmation('Order placed successfully!');
    } catch (error: any) {
      console.error('Error placing order:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setConfirmation(`Failed to place order: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setConfirmation('Failed to place order: No response from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setConfirmation('Failed to place order: An unexpected error occurred.');
      }
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