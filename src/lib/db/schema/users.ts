import { relations } from "drizzle-orm";
import { pgTable, bigint, varchar, text, timestamp, serial } from "drizzle-orm/pg-core";

export const auth_user = pgTable("auth_user", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	role: text("role").$type<"super_admin" | "admin" | "user">().default("user"),
	username: text("username"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow()
});

export const auth_session = pgTable("auth_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => auth_user.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const auth_key = pgTable("auth_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => auth_user.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	}),
	expires: bigint("expires", {
		mode: "number"
	})
});

export const userProfileRelations = relations(auth_user, ({ one }) => ({
	profileInfo: one(userProfiles, {
		fields: [auth_user.id],
		references: [userProfiles.userId]
	})
}));

export const userProfiles = pgTable("user_profiles", {
	id: serial("id").primaryKey(),
	userId: varchar("user_id").references(() => auth_user.id),
	signature: text("signature"),
	description: text("description")
});
