import { mutation } from "./_generated/server";
import { v } from "convex/values";


// Add to cart
export const addToCart = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cartItems")
      .filter((q) =>
        q.and(
          q.eq(q.field("productId"), args.productId)
        )
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + args.quantity,
      });
      return existing._id;
    }

    return await ctx.db.insert("cartItems", {
      id: args.productId,
      productId: args.productId,
      quantity: args.quantity
    });
  },
});

// Create order
export const createOrder = mutation({
  args: {
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
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image:v.string(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      tax: v.number(),
      grandTotal: v.number(),
    }),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    return await ctx.db.insert("orders", {
      id,
      customer: args.customer,
      shipping: args.shipping,
      items: args.items,
      totals: args.totals,
      status: args.status,
      createdAt: Date.now(),
    });
  },
});
