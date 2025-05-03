import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/modules/shared/drizzle/schema";
import { DATABASE_URL } from "@/config/server-constants";

class DrizzleClient {
  private static instance: PostgresJsDatabase<typeof schema>;
  private static client: postgres.Sql;

  private constructor() {}

  public static getInstance(): PostgresJsDatabase<typeof schema> {
    if (!DrizzleClient.instance) {
      const postgresUrl = DATABASE_URL;
      if (!postgresUrl) {
        throw new Error("PostgreSQL URL is not defined");
      }

      DrizzleClient.client = postgres(postgresUrl);
      DrizzleClient.instance = drizzle(DrizzleClient.client, {
        schema: schema,
      });
    }
    return DrizzleClient.instance;
  }
}

export function FactoryDrizzleClient(): PostgresJsDatabase<typeof schema> {
  return DrizzleClient.getInstance();
}
