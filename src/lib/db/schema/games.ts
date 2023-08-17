import { relations } from "drizzle-orm";
import { pgTable, varchar, text, serial, integer, smallint, primaryKey } from "drizzle-orm/pg-core";
import { auth_user } from "./users";
import { events } from "./events";

export const games = pgTable("games", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	desc: text("description"),
	yearPublished: smallint("yearPublished"),
	bggId: integer("bggId").unique(), // NOTE: THIS _NEEDS_ TO HAVE A _UNIQUE_ CONSTRAINT. ID + BggID is a composite key in some cases. 
	minNumberOfPlayers: smallint("minNumberOfPlayers"),
	maxNumberOfPlayers: smallint("maxNumberOfPlayers"),
	averageRating: text("averageRating"),
	thumbnailUrl: text("thumbnailUrl"),
	imageUrl: text("imageUrl")
});

export const usersRelations = relations(auth_user, ({ many }) => ({
	usersToGames: many(usersToGames)
}));

export const gamesRelations = relations(games, ({ many }) => ({
	usersToGames: many(usersToGames)
}));

export const usersToGames = pgTable(
	"users_to_games",
	{
		userId: varchar("user_id")
			.notNull()
			.references(() => auth_user.id),
		gameId: serial("game_id")
			.notNull()
			.references(() => games.id)
	},
	(t) => ({
		pk: primaryKey(t.userId, t.gameId)
	})
);

export const usersToGamesRelations = relations(usersToGames, ({ one }) => ({
	group: one(games, {
		fields: [usersToGames.gameId],
		references: [games.id]
	}),
	user: one(auth_user, {
		fields: [usersToGames.userId],
		references: [auth_user.id]
	})
}));

export const game_invites = pgTable("game_invites", {
	userId: varchar("user_id").references(() => auth_user.id),
	eventId: serial("game_id").references(() => events.id),
	inviteGreeting: varchar("inviteText", { length: 80 })
});

//

export const usersRelations2 = relations(auth_user, ({ many }) => ({
	usersToFavoriteGames: many(usersToFavoriteGames)
}));

export const gamesRelations3 = relations(games, ({ many }) => ({
	usersToFavoriteGames: many(usersToFavoriteGames)
}));

export const usersToFavoriteGames = pgTable(
	"users_to_favorite_games",
	{
		userId: varchar("user_id")
			.notNull()
			.references(() => auth_user.id),
		gameId: serial("game_id")
			.notNull()
			.references(() => games.id)
	},
	(t) => ({
		pk: primaryKey(t.userId, t.gameId)
	})
);

export const usersToFavoriteGamesRelations = relations(usersToFavoriteGames, ({ one }) => ({
	group: one(games, {
		fields: [usersToFavoriteGames.gameId],
		references: [games.id]
	}),
	user: one(auth_user, {
		fields: [usersToFavoriteGames.userId],
		references: [auth_user.id]
	})
}));