import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart } from '../service/services';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const result = await getCartItems();
      setCartItems(result.cart);
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-2 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.product.name}</h2>
            <p>{item.product.description}</p>
            <p className="text-gray-600">${item.product.price}</p>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
