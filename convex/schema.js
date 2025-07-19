import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
    token: v.optional(v.number()), // default: undefined
  })
    .index("by_email", ["email"])
    .index("by_uid", ["uid"]),

  workspace: defineTable({
    messages: v.array(
      v.object({
        role: v.string(),       // e.g., "user", "ai"
        context: v.string(),    // message text
      })
    ),
    fileData: v.optional(v.any()), // if you know the shape, define it
    user: v.id("users"),
  })
    .index("by_user", ["user"]),
});
