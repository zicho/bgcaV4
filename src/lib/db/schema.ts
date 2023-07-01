import { relations } from 'drizzle-orm';
import { pgTable, bigint, varchar, boolean, text, timestamp, jsonb, serial } from 'drizzle-orm/pg-core';

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

export const game = pgTable('game', {
	id: serial('id').primaryKey(),
	name: text("name")
});

export const user_game = pgTable('user_game', {
	userId: varchar('user_id').references(() => auth_user.id),
	gameId: serial('game_id').references(() => game.id)
});

export const usersRelations = relations(auth_user, ({ one }) => ({
	profileInfo: one(profileInfo, {
		fields: [auth_user.id],
		references: [profileInfo.userId]
	})
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id').references(() => auth_user.id),
	signature: text("signature"),
	description: text("description")
});
