import { relations } from 'drizzle-orm';
import {
	pgTable, varchar, text, serial,
	integer,
	smallint,
	primaryKey
} from 'drizzle-orm/pg-core';
import { auth_user } from './users';
import { events } from './events';

export const games = pgTable('games', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	desc: text('description'),
	yearPublished: smallint('yearPublished'),
	bggId: integer('bggId').unique(), // NOTE: THIS NEEDS TO HAVE A _UNIQUE_ CONSTRAINT IN DATABASE. MUST BE ADDED MANUALLY. DRIZZLE NOT SUPPORTING IT! (YET)
	minNumberOfPlayers: smallint('minNumberOfPlayers'),
	maxNumberOfPlayers: smallint('maxNumberOfPlayers'),
	averageRating: text('averageRating'),
	thumbnailUrl: text('thumbnailUrl'),
	imageUrl: text('imageUrl')
});

export const usersRelations = relations(auth_user, ({ many }) => ({
	usersToGames: many(usersToGames)
}));

export const gamesRelations = relations(games, ({ many }) => ({
	usersToGames: many(usersToGames)
}));

export const usersToGames = pgTable(
	'users_to_games',
	{
		userId: varchar('user_id')
			.notNull()
			.references(() => auth_user.id),
		gameId: serial('game_id')
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

export const game_invites = pgTable('game_invites', {
	userId: varchar('user_id').references(() => auth_user.id),
	eventId: serial('game_id').references(() => events.id),
	inviteGreeting: varchar('inviteText', { length: 80 }),
});