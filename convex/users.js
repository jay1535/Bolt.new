import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create a new user if they don't already exist.
 */
export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique(); // Since email is unique

    if (!existing) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
        token: 50000, // initial token
      });
      console.log("Created user:", result);
      return result;
    }

    console.log("User already exists:", existing._id);
    return existing._id;
  },
});

/**
 * Fetch a user by email.
 */
export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    return user ?? null;
  },
});

/**
 * Update user's token count.
 */
export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  },
});

/**
 * Update user's name and picture.
 */
export const UpdateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, { userId, name, picture }) => {
    await ctx.db.patch(userId, { name, picture });
  },
});
