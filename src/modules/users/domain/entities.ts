import { user } from "@/modules/shared/drizzle/schema";

export type User = typeof user.$inferSelect;
