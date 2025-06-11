// src/pages/Cart.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(p => p.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      acc.push({ ...item, qty: 1 });
    }
    return acc;
  }, []);

  const total = groupedCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const goToBilling = () => {
    navigate('/billing', { state: { cart: groupedCart, total } });
  };

  return (
    <div>
      <h2>Cart</h2>
      {groupedCart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {groupedCart.map(item => (
            <li key={item.id}>
              {item.name} x {item.qty} = ₹{item.price * item.qty}
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: ₹{total}</strong></p>
      <button onClick={goToBilling} disabled={groupedCart.length === 0}>
        Proceed to Billing
      </button>
    </div>
  );
};

export default Cart;
