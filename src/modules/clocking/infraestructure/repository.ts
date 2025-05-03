import { IClockingRepository } from "@/modules/clocking/domain/interfaces";
import { ClockIn, ClockOut } from "@/modules/clocking/domain/entities";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";
import * as schema from "@/modules/shared/drizzle/schema";
import { eq, desc, isNull, and, not, inArray } from "drizzle-orm";

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

    async getLastOpenClockIn(userId: string): Promise<ClockIn | null> {
        try {
            // Obtener todos los IDs de clock-in que ya tienen un clock-out asociado
            const clockOutRecords = await this.db
                .select({ clockInId: schema.clockOut.clockInId })
                .from(schema.clockOut)
                .where(eq(schema.clockOut.userId, userId));

            const closedClockInIds = clockOutRecords.map(record => record.clockInId);

            // Si no hay clock-out, entonces closedClockInIds estará vacío
            // En ese caso, simplemente buscamos el último clock-in del usuario
            let query = this.db
                .select()
                .from(schema.clockIn)
                .where(eq(schema.clockIn.userId, userId))
                .orderBy(desc(schema.clockIn.createdAt))
                .limit(1);

            // Si hay clock-outs, excluimos los clock-ins que ya tienen un clock-out asociado
            if (closedClockInIds.length > 0) {
                query = this.db
                    .select()
                    .from(schema.clockIn)
                    .where(
                        and(
                            eq(schema.clockIn.userId, userId),
                            not(inArray(schema.clockIn.id, closedClockInIds))
                        )
                    )
                    .orderBy(desc(schema.clockIn.createdAt))
                    .limit(1);
            }

            const result = await query;
            
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error getting last open clock in:", error);
            return null;
        }
    }
}

export default ClockingRepository;