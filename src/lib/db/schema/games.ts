import { relations } from "drizzle-orm";
import { pgTable, varchar, text, serial, integer, smallint, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
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

export const usersGamesCollectionRelations = relations(users, ({ many }) => ({
	usersToGames: many(usersToGameCollections)
}));

export const gamesUsersCollectionRelations = relations(games, ({ many }) => ({
	usersToGames: many(usersToGameCollections)
}));

export const usersToGameCollections = pgTable(
	"user_game_collection",
	{
		userId: varchar("user_id")
			.notNull()
			.references(() => users.id),
		gameId: serial("game_id")
			.notNull()
			.references(() => games.id)
	},
	(t) => ({
		pk: primaryKey(t.userId, t.gameId)
	})
);

export const usersToGameCollectionRelations = relations(usersToGameCollections, ({ one }) => ({
	group: one(games, {
		fields: [usersToGameCollections.gameId],
		references: [games.id]
	}),
	user: one(users, {
		fields: [usersToGameCollections.userId],
		references: [users.id]
	})
}));

export const gameInvites = pgTable("game_invites", {
	userId: varchar("user_id").references(() => users.id),
	eventId: serial("game_id").references(() => events.id),
	inviteGreeting: varchar("inviteText", { length: 80 })
});

//

export const favoriteGamesUsersRelations = relations(users, ({ many }) => ({
	usersToFavoriteGames: many(userFavoriteGames)
}));

export const favoriteGamesGamesRelations = relations(games, ({ many }) => ({
	usersToFavoriteGames: many(userFavoriteGames)
}));

export const userFavoriteGames = pgTable(
	"user_favorite_games",
	{
		userId: varchar("user_id")
			.notNull()
			.references(() => users.id),
		gameId: serial("game_id")
			.notNull()
			.references(() => games.id)
	},
	(t) => ({
		pk: primaryKey(t.userId, t.gameId)
	})
);

export const usersToFavoriteGamesRelations = relations(userFavoriteGames, ({ one }) => ({
	group: one(games, {
		fields: [userFavoriteGames.gameId],
		references: [games.id]
	}),
	user: one(users, {
		fields: [userFavoriteGames.userId],
		references: [users.id]
	})
}));