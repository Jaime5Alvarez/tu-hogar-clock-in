import { clockIn, clockOut } from "@/modules/shared/drizzle/schema";

export type Clocking = typeof clockIn.$inferSelect;

export type ClockingOut = typeof clockOut.$inferSelect;

