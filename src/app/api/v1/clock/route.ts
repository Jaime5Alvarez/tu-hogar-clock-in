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
    const { type, notes, clockInId } = await request.json();
    
    // Validar tipo de operación
    if (!type || (type !== "in" && type !== "out")) {
      return NextResponse.json(
        { error: "Se requiere el tipo de operación (in/out)" },
        { status: 400 }
      );
    }

    const clockingUseCase = FactoryClockingUseCase();
    const userId = session.user.id;
    const createdAt = new Date().toISOString();

    // Manejar según el tipo de operación
    if (type === "in") {
      // Registro de entrada
      await clockingUseCase.createClockIn({
        id: v4(),
        userId,
        createdAt,
        notes,
      });

      return NextResponse.json({ 
        message: "Entrada registrada correctamente",
        timestamp: createdAt
      });
    } else {
      // Registro de salida
      if (!clockInId) {
        return NextResponse.json(
          { error: "Se requiere el ID de entrada para registrar una salida" },
          { status: 400 }
        );
      }

      await clockingUseCase.createClockOut({
        id: v4(),
        userId,
        clockInId,
        createdAt,
        notes,
      });

      return NextResponse.json({ 
        message: "Salida registrada correctamente",
        timestamp: createdAt
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
