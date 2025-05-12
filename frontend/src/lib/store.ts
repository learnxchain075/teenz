import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (product, quantity = 1) => {
        try {
          const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, quantity }),
          });

          if (!response.ok) throw new Error('Failed to add item');

          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product.id === product.id
            );

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }

            return {
              items: [...state.items, { product, quantity }],
            };
          });
        } catch (error) {
          console.error('Failed to add item to cart:', error);
        }
      },
      removeItem: async (productId) => {
        try {
          const response = await fetch(`/api/cart/remove/${productId}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to remove item');

          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
          }));
        } catch (error) {
          console.error('Failed to remove item from cart:', error);
        }
      },
      updateQuantity: async (productId, quantity) => {
        try {
          const response = await fetch('/api/cart/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
          });

          if (!response.ok) throw new Error('Failed to update quantity');

          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          }));
        } catch (error) {
          console.error('Failed to update cart quantity:', error);
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);