import { ClockIn, ClockOut } from "../domain/entities";
import { IClockingRepository, IClockingUseCase } from "../domain/interfaces";
import ClockingRepository from "../infraestructure/repository";

class ClockingUseCase implements IClockingUseCase {
  constructor(private readonly clockingRepository: IClockingRepository) {}
  
  async createClockIn(clockIn: ClockIn): Promise<void> {
    return await this.clockingRepository.createClockIn(clockIn);
  }

  async createClockOut(clockOut: ClockOut): Promise<void> {
    return await this.clockingRepository.createClockOut(clockOut);
  }
}

export function FactoryClockingUseCase(): IClockingUseCase {
  return new ClockingUseCase(new ClockingRepository());
}