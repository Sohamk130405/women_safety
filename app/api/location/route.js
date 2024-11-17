import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { session_id, device_id, latitude, longitude } = body;
    console.log(session_id, device_id, latitude, longitude);
    if (!session_id || !device_id || !latitude || !longitude) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await query(
      "INSERT INTO location (session_id, device_id, latitude, longitude) VALUES (?, ?, ?, ?)",
      [session_id, device_id, latitude, longitude]
    );

    return NextResponse.json(
      { message: "Location saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving location:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, { status: 200 });
}
