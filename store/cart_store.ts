import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // addToCart: (item, quantity = 1) => {
      //   const cart = get().cart;
      //   const existingItem = cart.find((i) => i.id === item.id);

      //   if (existingItem) {
      //     set({
      //       cart: cart.map((i) =>
      //         i.id === item.id
      //           ? { ...i, quantity: i.quantity + quantity }
      //           : i
      //       ),
      //     });
      //   } else {
      //     set({
      //       cart: [...cart, { ...item, quantity }],
      //     });
      //   }
      // },
      addToCart: (item: Omit<CartItem, "quantity">, quantity = 1) => {
  const cart = get().cart;
  const existingItem = cart.find((i) => i.id === item.id);

  if (existingItem) {
    set({
      cart: cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + quantity }
          : i
      ),
    });
  } else {
    set({
      cart: [...cart, { ...item, quantity }],
    });
  }
},


      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      increaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", 
    }
  )
);
