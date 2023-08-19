import { conversationMessages } from "$lib/db/schema/conversations";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const insertConversationMessageSchema = createInsertSchema(conversationMessages, {
    content: z.string().trim().min(5),
});