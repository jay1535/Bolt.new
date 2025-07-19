import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create a new workspace.
 */
export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id('users'),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert('workspace', {
      messages: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});


/**
 * Get a specific workspace by ID.
 */
export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      console.warn("Workspace not found:", args.workspaceId);
    }
    return workspace;
  },
});

/**
 * Update workspace messages.
 */
export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    console.log("Updated messages for workspace:", args.workspaceId);
    return result;
  },
});

/**
 * Update workspace file data.
 */
export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    console.log("Updated files for workspace:", args.workspaceId);
    return result;
  },
});

/**
 * Get all workspaces for a specific user.
 */
export const GetAllWorkspace = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaces = await ctx.db
      .query("workspace")
      .withIndex("by_user", (q) => q.eq("user", args.userId))
      .collect();

    console.log(`Fetched ${workspaces.length} workspaces for user:`, args.userId);
    return workspaces;
  },
});
