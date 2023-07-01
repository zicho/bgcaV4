import { pgTable, bigint, varchar, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import postgres from 'pg';

export const user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	role: text('user').$type<'super_admin' | 'admin' | 'user'>(),
	username: text('username'),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const session = pgTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const key = pgTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => user.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});

export const game = pgTable('game', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey()
	// other user attributes
});

export const user_game = pgTable('user_game', {
	userId: varchar('user_id').references(() => user.id),
	gameId: varchar('game_id').references(() => game.id)
});