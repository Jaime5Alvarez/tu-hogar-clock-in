import { IClockingRepository } from "@/modules/clocking/domain/interfaces";
import { ClockIn, ClockOut } from "@/modules/clocking/domain/entities";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";
import * as schema from "@/modules/shared/drizzle/schema";

class ClockingRepository implements IClockingRepository {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor() {
        this.db = FactoryDrizzleClient();
    }

    async createClockIn(clockIn: ClockIn): Promise<void> {
        try {
            await this.db.insert(schema.clockIn).values(clockIn)
            return
        } catch (error) {
            throw new Error("Error creating clock in", { cause: error });
        }
    }

    async createClockOut(clockOut: ClockOut): Promise<void> {
        try {
            await this.db.insert(schema.clockOut).values(clockOut)
            return
        } catch (error) {
            throw new Error("Error creating clock out", { cause: error });
        }
    }
}

export default ClockingRepository;