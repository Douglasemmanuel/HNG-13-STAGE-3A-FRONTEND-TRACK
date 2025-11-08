import { query } from "./_generated/server";
import { v } from "convex/values";

export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    return orders.filter(order => order.customer.email === args.email);
  },
});




export const getRecentOrder = query({
  handler: async (ctx) => {
    // Get the most recent order
    const orders = await ctx.db.query("orders").order("desc").take(1);

    if (orders.length === 0) {
      return null; // no orders
    }

    // Optionally sort by createdAt if needed
    orders.sort((a, b) => b.createdAt - a.createdAt);

    return orders[0];
  },
});
