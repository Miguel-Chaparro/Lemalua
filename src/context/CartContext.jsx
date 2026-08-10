import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('lemalua_cart');
    return localCart ? JSON.parse(localCart) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('lemalua_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    // Normalizar campos: soporta productos de la API (precio_venta_base, nombre, foto_url)
    // y productos del catálogo estático (price, name, image)
    const normalizedProduct = {
      ...product,
      price: Number(product.price ?? product.precio_venta_base ?? 0),
      name: product.name ?? product.nombre ?? '',
      image: product.image ?? product.foto_url ?? '',
      description: product.description ?? product.descripcion ?? '',
    };

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === normalizedProduct.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === normalizedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...normalizedProduct, quantity: 1 }];
    });
    setToast({
      id: Date.now(),
      message: `¡${normalizedProduct.name} añadido al carrito!`,
      image: normalizedProduct.image,
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // cartTotal usa price normalizado; Number() como guarda por si hay items legacy en localStorage
  const cartTotal = cart.reduce((total, item) => total + item.quantity * Number(item.price ?? item.precio_venta_base ?? 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        toast,
        setToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
