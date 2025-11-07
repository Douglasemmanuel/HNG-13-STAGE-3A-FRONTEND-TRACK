import { query } from "./_generated/server";
import { v } from "convex/values";

export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    return orders.filter(order => order.customer.email === args.email);
  },
});
