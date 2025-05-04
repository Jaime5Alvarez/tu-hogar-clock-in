import { IClockingRepository } from "@/modules/clocking/domain/interfaces";
import { ClockIn, ClockOut } from "@/modules/clocking/domain/entities";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";
import * as schema from "@/modules/shared/drizzle/schema";
import { eq, desc } from "drizzle-orm";

class ClockingRepository implements IClockingRepository {
  private readonly db: NeonHttpDatabase<typeof schema>;
  constructor() {
    this.db = FactoryDrizzleClient();
  }

  async createClockIn(clockIn: ClockIn): Promise<ClockIn> {
    try {
      const [newClockIn] = await this.db
        .insert(schema.clockIn)
        .values(clockIn)
        .returning();
      return newClockIn;
    } catch (error) {
      throw new Error("Error creating clock in", { cause: error });
    }
  }

  async createClockOut(clockOut: ClockOut): Promise<ClockOut> {
    try {
      const [newClockOut] = await this.db
        .insert(schema.clockOut)
        .values(clockOut)
        .returning();
      return newClockOut;
    } catch (error) {
      throw new Error("Error creating clock out", { cause: error });
    }
  }

  async getLastClockIn(userId: string): Promise<ClockIn> {
    try {
      const lastClockIn = await this.db
        .select()
        .from(schema.clockIn)
        .where(eq(schema.clockIn.userId, userId))
        .orderBy(desc(schema.clockIn.createdAt))
        .limit(1);
      return lastClockIn[0];
    } catch (error) {
      throw new Error("Error getting last clock in", { cause: error });
    }
  }

  async closeClockIn(clockInId: string, clockOutId: string): Promise<void> {
    try {
      await this.db
        .update(schema.clockIn)
        .set({ clockOutId })
        .where(eq(schema.clockIn.id, clockInId));
      return;
    } catch (error) {
      throw new Error("Error closing clock in", { cause: error });
    }
  }
}

export default ClockingRepository;
