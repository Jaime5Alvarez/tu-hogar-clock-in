import { ClockIn, ClockOut } from "./entities";

export interface IClockingUseCase {
    createClockIn(clockIn: ClockIn): Promise<void>;
    createClockOut(clockOut: ClockOut): Promise<void>;
    getLastOpenClockIn(userId: string): Promise<ClockIn | null>;
}

export interface IClockingRepository {
    createClockIn(clockIn: ClockIn): Promise<void>;
    createClockOut(clockOut: ClockOut): Promise<void>;
    getLastOpenClockIn(userId: string): Promise<ClockIn | null>;
}


