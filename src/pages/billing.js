// src/pages/Billing.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Billing = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const total = location.state?.total || 0;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'orders'), {
        name,
        address,
        cart,
        total,
        createdAt: Timestamp.now(),
      });
      setOrderPlaced(true);
    } catch (err) {
      alert('Failed to place order: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Billing</h2>
      {orderPlaced ? (
        <p>✅ Order placed successfully!</p>
      ) : (
        <form onSubmit={handleOrder}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          /><br />
          <h4>Items:</h4>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.qty} = ₹{item.price * item.qty}
              </li>
            ))}
          </ul>
          <p><strong>Total: ₹{total}</strong></p>
          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
};

export default Billing;
