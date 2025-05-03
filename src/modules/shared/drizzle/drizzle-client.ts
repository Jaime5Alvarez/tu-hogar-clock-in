import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/modules/shared/drizzle/schema";
import { DATABASE_URL } from "@/config/server-constants";

class DrizzleClient {
  private static instance: NeonHttpDatabase<typeof schema>;
  private static client: NeonQueryFunction<false, false>;

  private constructor() {}

  public static getInstance(): NeonHttpDatabase<typeof schema> {
    if (!DrizzleClient.instance) {
      if (!DATABASE_URL) {
        throw new Error("PostgreSQL URL is not defined");
      }

      DrizzleClient.client = neon(DATABASE_URL);
      DrizzleClient.instance = drizzle(DrizzleClient.client, {
        schema: schema,
      });
    }
    return DrizzleClient.instance;
  }
}

export function FactoryDrizzleClient(): NeonHttpDatabase<typeof schema> {
  return DrizzleClient.getInstance();
}
