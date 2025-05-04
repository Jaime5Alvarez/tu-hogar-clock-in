import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { FactoryClockingUseCase } from "@/modules/clocking/application/use-cases";
import { v4 } from "uuid";
import { ClockType } from "@/modules/clocking/domain/entities";
import { calculateTotalTime } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { notes, clockType }: { notes: string | null; clockType: ClockType } =
      await request.json();
    if (!clockType) {
      return NextResponse.json(
        { error: "Missing clock type" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const clockingUseCase = FactoryClockingUseCase();
    const createdAt = new Date().toISOString();

    const lastClockIn = await clockingUseCase.getLastClockIn(userId);

    if (clockType === "out" && (!lastClockIn || lastClockIn.clockOutId)) {
      return NextResponse.json(
        {
          error: "No clock in found",
          message:
            "No se ha registrado ninguna entrada, por favor registre una entrada antes de registrar una salida",
        },
        { status: 400 }
      );
    }

    if (clockType === "in") {
      const clockInId = v4();
      await clockingUseCase.createClockIn({
        id: clockInId,
        userId,
        createdAt,
        notes,
        clockOutId: null,
      });

      return NextResponse.json({
        type: "in",
        message: "Entrada registrada con éxito",
        timestamp: createdAt,
        id: clockInId,
      });
    }
      const clockOutId = v4();
     const clockOut = await clockingUseCase.createClockOut({
        id: clockOutId,
        userId,
        createdAt,
        notes,
      });
      await clockingUseCase.closeClockIn(lastClockIn.id, clockOutId);

      return NextResponse.json({
        type: "out",
        message: `<div>
          <p><strong>Salida registrada con éxito</strong></p>
          <p style="margin-top: 10px;"><strong>Entrada:</strong> ${new Date(lastClockIn.createdAt).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}</p>
          <p><strong>Salida:</strong> ${new Date(clockOut.createdAt).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}</p>
          <p><strong>Tiempo total:</strong> ${calculateTotalTime(lastClockIn.createdAt, clockOut.createdAt)}</p>
        </div>`,
        timestamp: createdAt,
        clockOutId: clockOutId,
      });
    

  } catch (error) {
    console.error("Error processing clocking:", error);
    return NextResponse.json(
      { error: "Error processing clocking" },
      { status: 500 }
    );
  }
}
