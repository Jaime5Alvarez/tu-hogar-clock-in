import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { FactoryDrizzleClient } from "@/modules/shared/drizzle/drizzle-client";
import * as schema from "@/modules/shared/drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const db = FactoryDrizzleClient();

    const clockHistory = await db
      .select({
        clockInId: schema.clockIn.id,
        clockInTime: schema.clockIn.createdAt,
        clockOutId: schema.clockIn.clockOutId,
        clockOutTime: schema.clockOut.createdAt,
        clockInNotes: schema.clockIn.notes,
        clockOutNotes: schema.clockOut.notes,
      })
      .from(schema.clockIn)
      .leftJoin(
        schema.clockOut,
        eq(schema.clockIn.clockOutId, schema.clockOut.id),
      )
      .where(eq(schema.clockIn.userId, userId))
      .orderBy(desc(schema.clockIn.createdAt));

    return NextResponse.json(clockHistory);
  } catch (error) {
    console.error("Error fetching clock history:", error);
    return NextResponse.json(
      { error: "Error fetching clock history" },
      { status: 500 },
    );
  }
}
