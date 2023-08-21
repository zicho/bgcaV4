import { relations } from "drizzle-orm";
import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { requestStatusEnum } from "./types";


export const friends = pgTable("friends", {
	id: serial("id").primaryKey(),
	senderUsername: varchar("sender_username").notNull(),
	recipientUsername: varchar("recipient_username").notNull(),
	sentAt: date("sent_at").defaultNow().notNull(),
	repliedAt: date("replied_at"),

	requestStatus: requestStatusEnum("request_status").notNull().default("PENDING")
});

export const userFriendshipRelations = relations(friends, ({ one }) => ({
	sender: one(users, {
		fields: [friends.senderUsername],
		references: [users.id]
	}),
	recipient: one(users, {
		fields: [friends.recipientUsername],
		references: [users.id]
	}),
}));