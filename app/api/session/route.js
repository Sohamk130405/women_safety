import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { device_id } = body;

    if (!device_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await query("INSERT INTO session (device_id) VALUES (?)", [
      device_id,
    ]);

    return NextResponse.json(
      {
        message: "Session created successfully",
        session_id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const result = await query(
      " SELECT s.* ,d.phone ,d.name FROM session s JOIN device d WHERE d.id = s.device_id",
      []
    );

    return NextResponse.json(
      {
        sessions: result,
        session_id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error requesting session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
