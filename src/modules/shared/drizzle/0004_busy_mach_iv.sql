ALTER TABLE "clock_out" DROP CONSTRAINT "clock_out_clock_in_id_clock_in_id_fk";
--> statement-breakpoint
ALTER TABLE "clock_in" ADD COLUMN "clock_out_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "clock_in" ADD CONSTRAINT "clock_in_clock_out_id_clock_out_id_fk" FOREIGN KEY ("clock_out_id") REFERENCES "public"."clock_out"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clock_out" DROP COLUMN "clock_in_id";