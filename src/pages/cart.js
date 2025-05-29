import React, { useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/checkout', { cart_items: cartItems });
      const checkoutUrl = response.data.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {/* Render cart items here */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage; 