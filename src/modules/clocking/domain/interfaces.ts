import { Clocking } from "./entities";

export interface IClockingUseCase {
    createClockIn(clockIn: Clocking): Promise<Clocking>;
    createClockOut(clockOut: Clocking): Promise<Clocking>;
}

export interface IClockingRepository {
    createClockIn(clockIn: Clocking): Promise<Clocking>;
    createClockOut(clockOut: Clocking): Promise<Clocking>;
}


