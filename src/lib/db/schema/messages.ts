import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
    id: serial("id").primaryKey(),
    started_by: varchar("started_by_user_id").notNull(),
    talking_to: varchar("talking_to_user_id").notNull(),
    started_by_username: varchar("started_by_username").notNull(),
    talking_to_username: varchar("talking_to_username").notNull(),
    latest_activity: timestamp("latest_activity", { mode: "date" }).notNull().defaultNow(),
});

export const conversationsRelations = relations(conversations, ({ many }) => ({
    messages: many(conversation_messages),
}));

export const conversation_messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    conversationId: serial("conversation_id"),
    content: text("content").notNull(),
    sentAt: timestamp("sent_at", { mode: "date" }).notNull().defaultNow(),
    readAt: timestamp("read_at", { mode: "date" }),
    sender_username: varchar("sender_username").notNull(),
    recipient_username: varchar("recipient_username").notNull(),
});

export const messagesRelations = relations(conversation_messages, ({ one }) => ({
    conversation: one(conversations, {
        fields: [conversation_messages.conversationId],
        references: [conversations.id],
    }),
}));

