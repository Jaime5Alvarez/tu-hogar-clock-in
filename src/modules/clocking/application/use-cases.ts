import { ClockIn, ClockOut } from "../domain/entities";
import { IClockingRepository, IClockingUseCase } from "../domain/interfaces";
import ClockingRepository from "../infraestructure/repository";

class ClockInUseCase implements IClockingUseCase {
  constructor(private readonly clockInRepository: IClockingRepository) {}
  
  async createClockIn(clockIn: ClockIn): Promise<void> {
    return;
  }

  async createClockOut(clockOut: ClockOut): Promise<void> {
    return;
  }
}

export function FactoryClockingUseCase(

): IClockingUseCase {
  return new ClockInUseCase(new ClockingRepository());
}