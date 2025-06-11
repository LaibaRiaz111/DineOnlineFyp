// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={goToCart}>Go to Cart ({cart.length})</button>
      <ul>
      {products.map(product => (
        <li key={product.id}>
          <h4>{product.name}</h4>
          <img
            src={product.imageUrl}
            alt={product.name}
            width="100"
            height="100"
          />
          <p>Price: ₹{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </li>
      ))}
      
      </ul>
    </div>
  );
};

export default Products;
