import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const session = await query(
      "SELECT * FROM session JOIN device ON device.id = session.device_id WHERE session.id = ?",
      [id]
    );

    const locations = await query(
      "SELECT * FROM location WHERE session_id = ?",
      [id]
    );

    return NextResponse.json(
      {
        session: session[0],
        locations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error requesting session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id: session_id } = params;
    const body = await req.json();
    const { latitude, longitude } = body;

    if (!session_id || !latitude || !longitude) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE session SET is_sos_triggered = TRUE, latitude = ?, longitude = ? WHERE id = ?",
      [latitude, longitude, session_id]
    );

    return NextResponse.json(
      { message: "SOS triggered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error triggering SOS:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id: session_id } = params;

    if (!session_id) {
      return NextResponse.json(
        { message: "Missing session_id" },
        { status: 400 }
      );
    }

    await query("UPDATE session SET is_enable = FALSE WHERE id = ?", [
      session_id,
    ]);

    return NextResponse.json(
      { message: "Session ended successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ending session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
