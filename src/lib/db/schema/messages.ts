import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    sentAt: timestamp("sent_at", { mode: "date" }).notNull().defaultNow(),
    readAt: timestamp("read_at", { mode: "date" }),
    sender: varchar("sender_id").notNull(),
    recipient: varchar("recipient_id").notNull(),
});
