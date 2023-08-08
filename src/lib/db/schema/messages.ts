import { date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    sent: date("date").notNull().defaultNow(),
    read: date("date"),
    sender: varchar("sender_id").notNull(),
    recipient: varchar("recipient_id").notNull(),
});
