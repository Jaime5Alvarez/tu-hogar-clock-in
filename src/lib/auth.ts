import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(FactoryDrizzleClient(), {
    provider: "pg", // or "mysql", "sqlite"
  }),
});
