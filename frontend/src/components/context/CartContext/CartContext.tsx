// CartContext.jsx
// Handles cart state and cart actions

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      setItems(parsed.items || []);
      setRestaurantName(parsed.restaurantName || "");
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify({ items, restaurantName })
    );
  }, [items, restaurantName]);

  // Add item to cart
  const addToCart = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      setRestaurantName(item.restaurantName);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setRestaurantName("");
    localStorage.removeItem("cart");
  };

  // Helpers
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getItemQuantity = (id) => {
    const item = items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const value = {
    items,
    restaurantName,
    totalItems,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext; 
