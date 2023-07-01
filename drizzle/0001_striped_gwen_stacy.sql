CREATE TABLE IF NOT EXISTS "user_game" (
	"user_id" varchar,
	"game_id" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_game" ADD CONSTRAINT "user_game_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_game" ADD CONSTRAINT "user_game_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
