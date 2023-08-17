import { conversation_messages } from "$lib/db/schema/conversations";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const insertConversationMessageSchema = createInsertSchema(conversation_messages, {
    content: z.string().trim().min(5),
});