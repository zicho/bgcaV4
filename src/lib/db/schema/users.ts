import { relations } from "drizzle-orm";
import { pgTable, bigint, varchar, text, timestamp, serial } from "drizzle-orm/pg-core";

export const users = pgTable("auth_users", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	role: text("role").$type<"super_admin" | "admin" | "user">().default("user"),
	username: text("username"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow()
});

export const auth_sessions = pgTable("auth_sessions", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const auth_keys = pgTable("auth_keys", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => users.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	}),
	expires: bigint("expires", {
		mode: "number"
	})
});

export const userProfileRelations = relations(users, ({ one }) => ({
	profileInfo: one(userProfiles, {
		fields: [users.id],
		references: [userProfiles.userId]
	})
}));

export const userProfiles = pgTable("user_profiles", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id").references(() => users.id),
	signature: text("signature"),
	description: text("description")
});
