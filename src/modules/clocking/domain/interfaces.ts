import { ClockIn, ClockOut } from "./entities";

export interface IClockingUseCase {
  createClockIn(clockIn: ClockIn): Promise<ClockIn>;
  createClockOut(clockOut: ClockOut): Promise<ClockOut>;
  getLastClockIn(userId: string): Promise<ClockIn>;
  closeClockIn(clockInId: string, clockOutId: string): Promise<void>;
}

export interface IClockingRepository {
  createClockIn(clockIn: ClockIn): Promise<ClockIn>;
  createClockOut(clockOut: ClockOut): Promise<ClockOut>;
  getLastClockIn(userId: string): Promise<ClockIn>;
  closeClockIn(clockInId: string, clockOutId: string): Promise<void>;
}
