import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItemUI } from './cartTypes';

interface CartContextType {
  items: CartItemUI[];
  addItem: (item: CartItemUI) => void;
  removeItem: (menuItemId: bigint) => void;
  updateQuantity: (menuItemId: bigint, quantity: number) => void;
  clearCart: () => void;
  getRestaurantId: () => bigint | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemUI[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          menuItemId: BigInt(item.menuItemId),
          price: BigInt(item.price),
          restaurantId: BigInt(item.restaurantId),
        }));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    return [];
  });

  useEffect(() => {
    try {
      const serializable = items.map((item) => ({
        ...item,
        menuItemId: item.menuItemId.toString(),
        price: item.price.toString(),
        restaurantId: item.restaurantId.toString(),
      }));
      localStorage.setItem('cart', JSON.stringify(serializable));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (item: CartItemUI) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (menuItemId: bigint) => {
    setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: bigint, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getRestaurantId = () => {
    return items.length > 0 ? items[0].restaurantId : null;
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getRestaurantId }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
