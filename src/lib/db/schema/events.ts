import { pgTable, serial, date, varchar } from "drizzle-orm/pg-core";
import { games } from "./games";
import { relations } from "drizzle-orm";
import { auth_user } from "./users";

export const events = pgTable("events", {
	id: serial("id").primaryKey(),
	date: date("date").notNull(),
	gameId: serial("game_id").notNull(),
	organizerId: varchar("organizer_id").notNull()
});

export const eventsRelations = relations(events, ({ one, many }) => ({
	game: one(games, {
		fields: [events.gameId],
		references: [games.id]
	}),
	organizer: one(auth_user, {
		fields: [events.organizerId],
		references: [auth_user.id]
	}),
	event_players: many(auth_user)
}));

export const event_players = pgTable("event_players", {
	playerId: varchar("player_id"),
	eventId: serial("event_id")
});

export const eventPlayersRelations = relations(event_players, ({ one }) => ({
	event: one(events, {
		fields: [event_players.eventId],
		references: [events.id]
	}),
	player: one(auth_user, {
		fields: [event_players.playerId],
		references: [auth_user.id]
	})
}));
