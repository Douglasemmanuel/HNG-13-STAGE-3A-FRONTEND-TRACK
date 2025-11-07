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
  shipping: number;
  vat: number;
  subtotal: number;
  grandTotal: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  recalcTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      shipping: 50, // fixed shipping cost
      vat: 20,      // fixed VAT
      subtotal: 0,
      grandTotal: 0,

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
        get().recalcTotals();
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
        get().recalcTotals();
      },

      increaseQuantity: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
        get().recalcTotals();
      },

      decreaseQuantity: (id) => {
  const cart = get().cart;
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    // Just decrease the quantity
    set({
      cart: cart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      ),
    });
  } else {
    // Quantity is 1, remove the item
    set({
      cart: cart.filter((i) => i.id !== id),
    });
  }

  get().recalcTotals();
},


      clearCart: () => {
        set({ cart: [] });
        get().recalcTotals();
      },

      recalcTotals: () => {
        const subtotal = get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const grandTotal = subtotal + get().shipping + get().vat;

        set({ subtotal, grandTotal });
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
      if (state) state.recalcTotals();
    },
    }
  )
);
