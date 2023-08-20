import { pgTable, serial, date, varchar } from "drizzle-orm/pg-core";
import { games } from "./games";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const events = pgTable("events", {
	id: serial("id").primaryKey(),
	date: date("date").notNull(),
	gameId: serial("game_id").notNull(),
	organizerId: varchar("organizer_id").notNull()
});

export const eventUserRelations = relations(events, ({ one, many }) => ({
	game: one(games, {
		fields: [events.gameId],
		references: [games.id]
	}),
	organizer: one(users, {
		fields: [events.organizerId],
		references: [users.id]
	}),
	event_players: many(users)
}));

export const eventUsers = pgTable("event_users", {
	playerId: varchar("player_id"),
	eventId: serial("event_id")
});

export const eventUsersRelations = relations(eventUsers, ({ one }) => ({
	event: one(events, {
		fields: [eventUsers.eventId],
		references: [events.id]
	}),
	player: one(users, {
		fields: [eventUsers.playerId],
		references: [users.id]
	})
}));

///////// event suggested dates

export const eventDatesRelations = relations(events, ({ many }) => ({
	dates: many(eventDates),
}));

export const eventDates = pgTable('dates', {
	date: date("date").notNull(),
	startTime: varchar("start_time", { length: 5 }).notNull(),
	eventId: serial('event_id'),
});

export const dateEventsRelation = relations(eventDates, ({ one }) => ({
	author: one(events, {
		fields: [eventDates.eventId],
		references: [events.id],
	}),
}));