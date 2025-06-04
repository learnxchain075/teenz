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

const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (product, quantity = 1) => {
        if (!isAuthenticated()) {
          set({ items: [] });
          return;
        }
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
        if (!isAuthenticated()) {
          set({ items: [] });
          return;
        }
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: async (productId, quantity) => {
        if (!isAuthenticated() || quantity < 1) {
          set({ items: [] });
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      toggleItemSelection: (productId) => {
        if (!isAuthenticated()) {
          set({ items: [] });
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, selected: !item.selected }
              : item
          ),
        }));
      },
      selectAllItems: () => {
        if (!isAuthenticated()) {
          set({ items: [] });
          return;
        }
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected: true })),
        }));
      },
      unselectAllItems: () => {
        if (!isAuthenticated()) {
          set({ items: [] });
          return;
        }
        set((state) => ({
          items: state.items.map((item) => ({ ...item, selected: false })),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        if (!isAuthenticated()) return 0;
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      getSelectedTotal: () => {
        if (!isAuthenticated()) return 0;
        const items = get().items;
        return items
          .filter((item) => item.selected)
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
      },
      getItemCount: () => {
        if (!isAuthenticated()) return 0;
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
      getSelectedItems: () => {
        if (!isAuthenticated()) return [];
        return get().items.filter((item) => item.selected);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);