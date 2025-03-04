import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const goals = await db.goal.findMany({
      where: { userId },
      cacheStrategy: { swr: 60, ttl: 20 },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ goals }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
