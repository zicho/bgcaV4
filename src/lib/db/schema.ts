import { relations } from 'drizzle-orm';
import {
	pgTable,
	bigint,
	varchar,
	boolean,
	text,
	timestamp,
	jsonb,
	serial,
	integer,
	smallint,
	decimal,
	primaryKey
} from 'drizzle-orm/pg-core';

export const auth_user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	role: text('role').$type<'super_admin' | 'admin' | 'user'>().default('user'),
	username: text('username'),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const auth_session = pgTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => auth_user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const auth_key = pgTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => auth_user.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});

export const games = pgTable('games', {
	id: serial('id').primaryKey(),
	name: text('name'),
	bggId: integer('bggId'),
	minNumberOfPlayers: smallint('minNumberOfPlayers'),
	maxNumberOfPlayers: smallint('maxNumberOfPlayers'),
	bggRating: decimal('avgBggRating'),
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

export const invites = pgTable('invites', {
	userId: varchar('user_id').references(() => auth_user.id),
	gameId: serial('game_id').references(() => games.id)
});

export const userProfileRelations = relations(auth_user, ({ one }) => ({
	profileInfo: one(userProfiles, {
		fields: [auth_user.id],
		references: [userProfiles.userId]
	})
}));

export const userProfiles = pgTable('user_profiles', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id').references(() => auth_user.id),
	signature: text('signature'),
	description: text('description')
});
