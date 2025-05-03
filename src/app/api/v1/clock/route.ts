import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { FactoryClockingUseCase } from "@/modules/clocking/application/use-cases";
import { v4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Obtener datos de la solicitud
    const { notes } = await request.json();
    const userId = session.user.id;
    const clockingUseCase = FactoryClockingUseCase();
    const createdAt = new Date().toISOString();

    // Verificar si el usuario tiene un fichaje de entrada abierto
    const lastOpenClockIn = await clockingUseCase.getLastOpenClockIn(userId);

    // Determinar automáticamente si es entrada o salida
    if (!lastOpenClockIn) {
      // No hay entradas abiertas, por lo tanto es un CLOCK IN
      const clockInId = v4();
      await clockingUseCase.createClockIn({
        id: clockInId,
        userId,
        createdAt,
        notes,
      });

      return NextResponse.json({
        type: "in",
        message: "Entrada registrada correctamente",
        timestamp: createdAt,
        id: clockInId
      });
    } else {
      // Hay una entrada abierta, por lo tanto es un CLOCK OUT
      await clockingUseCase.createClockOut({
        id: v4(),
        userId,
        clockInId: lastOpenClockIn.id,
        createdAt,
        notes,
      });

      return NextResponse.json({
        type: "out",
        message: "Salida registrada correctamente",
        timestamp: createdAt,
        clockInId: lastOpenClockIn.id
      });
    }
  } catch (error) {
    console.error("Error al procesar el fichaje:", error);
    return NextResponse.json(
      { error: "Error al procesar el fichaje" },
      { status: 500 }
    );
  }
}
