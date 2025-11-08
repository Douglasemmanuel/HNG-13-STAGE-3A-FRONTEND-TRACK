import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    slug: v.string(),
  }),

  cartItems: defineTable({
    productId: v.string(),
    quantity: v.number(),
  }),

  orders: defineTable({
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shipping: v.object({
      address: v.string(),
      city: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
        
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
    createdAt: v.number(),
  }),
});
