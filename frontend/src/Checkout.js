// Checkout.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { productId, color } = location.state || {};

  const handleCheckout = async () => {
    const order = {
      productId,
      customization: { color }
    };

    const res = await fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    console.log(data);
    alert("Order placed successfully!");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>
        <strong>Product ID:</strong> {productId}
      </p>
      <p>
        <strong>Selected Color:</strong>{' '}
        <span style={{ background: color, padding: '0 10px' }}>{color}</span>
      </p>
      <button onClick={handleCheckout}>
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
