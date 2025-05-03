ALTER TABLE "clock_in_out" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "clock_in_out" CASCADE;--> statement-breakpoint
ALTER TABLE "clock_out" ADD COLUMN "clock_in_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "clock_out" ADD CONSTRAINT "clock_out_clock_in_id_clock_in_id_fk" FOREIGN KEY ("clock_in_id") REFERENCES "public"."clock_in"("id") ON DELETE no action ON UPDATE no action;