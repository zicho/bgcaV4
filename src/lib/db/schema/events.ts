import { pgTable, serial, date, varchar, time, pgEnum, integer } from "drizzle-orm/pg-core";
import { games } from "./games";
import { relations } from "drizzle-orm";
import { users } from "./users";

// note: should match "EVENT_TYPE" enum
const eventTypeEnum = pgEnum('eventType', [
	"event_type_open",
	"event_type_friends",
	"event_type_collab",
	"event_type_closed",
]);

export const events = pgTable("events", {
	id: serial("id").primaryKey(),
	day: date("date").notNull().defaultNow(),
	time: time("time", { precision: 6 }).notNull().defaultNow(),
	organizerId: varchar("organizer_id").notNull(),
	eventType: eventTypeEnum("event_type").notNull()
});

export const eventUserRelations = relations(events, ({ one, many }) => ({
	organizer: one(users, {
		fields: [events.organizerId],
		references: [users.id]
	}),
	eventPlayers: many(users),
	eventGames: many(games),
}));

export const eventUsers = pgTable("event_users", {
	eventId: serial("event_id"),
	playerId: varchar("player_id"),

});

export const eventGames = pgTable("event_games", {
	eventId: serial("event_id"),
	gameId: serial("game_id"),
	votes: integer("votes").default(0)
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

export const eventGamesRelations = relations(eventGames, ({ one }) => ({
	event: one(events, {
		fields: [eventGames.eventId],
		references: [events.id]
	}),
	game: one(games, {
		fields: [eventGames.gameId],
		references: [games.id]
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