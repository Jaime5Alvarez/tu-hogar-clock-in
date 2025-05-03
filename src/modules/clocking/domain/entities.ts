import { clockIn, clockOut } from "@/modules/shared/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type ClockIn = InferSelectModel<typeof clockIn>;

export type ClockOut = InferSelectModel<typeof clockOut>;

export type ClockType = "in" | "out";