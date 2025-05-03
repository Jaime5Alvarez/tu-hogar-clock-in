import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(FactoryDrizzleClient(), {
    provider: "pg", // or "mysql", "sqlite"
  }),
  plugins: [admin()],
});
