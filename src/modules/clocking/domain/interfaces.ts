import { ClockIn, ClockOut } from "./entities";

export interface IClockingUseCase {
  createClockIn(clockIn: ClockIn): Promise<void>;
  createClockOut(clockOut: ClockOut): Promise<void>;
  getLastClockIn(userId: string): Promise<ClockIn>;
  closeClockIn(clockOutId: string): Promise<void>;
}

export interface IClockingRepository {
  createClockIn(clockIn: ClockIn): Promise<void>;
  createClockOut(clockOut: ClockOut): Promise<void>;
  getLastClockIn(userId: string): Promise<ClockIn>;
  closeClockIn(clockOutId: string): Promise<void>;
}
