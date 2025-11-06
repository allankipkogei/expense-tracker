import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// This route checks if Prisma can successfully query the database
export async function GET() {
  try {
    // Run a simple query — e.g., count users
    const usersCount = await prisma.user.count();

    return NextResponse.json({
      status: "success",
      message: "Database connection successful ✅",
      users: usersCount,
    });
  } catch (error: any) {
    console.error("Database test error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to the database ❌",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
