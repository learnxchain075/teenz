import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './types';

interface CartItem {
  product: Product;
  quantity: number;
  selected?: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  toggleItemSelection: (productId: string) => void;
  selectAllItems: () => void;
  unselectAllItems: () => void;
  clearCart: () => void;
  getTotal: () => number;
  getSelectedTotal: () => number;
  getItemCount: () => number;
  getSelectedItems: () => CartItem[];
}



export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (product, quantity = 1) => {
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
            items: [...state.items, { product, quantity, selected: false }],
          };
        });
      },
      removeItem: async (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) {
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      toggleItemSelection: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, selected: !item.selected }
              : item
          ),
        }));
      },
      selectAllItems: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected: true })),
        }));
      },
      unselectAllItems: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected: false })),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getSelectedTotal: () => {
        const items = get().items;
        return items
          .filter((item) => item.selected)
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
      },
      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
      getSelectedItems: () => {
        return get().items.filter((item) => item.selected);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);