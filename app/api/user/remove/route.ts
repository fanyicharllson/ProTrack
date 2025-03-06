import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pinata } from "@/utils/config";

export async function DELETE() {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get user data
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    if (!user || !user.image) {
      return NextResponse.json(
        { message: "No profile picture to remove" },
        { status: 400 }
      );
    }

    // Extract CID from Pinata URL
    const imageUrl = user.image;

    const cidMatch = imageUrl.match(/\/files\/([^?/]+)/);

    if (cidMatch) {
      const cid = cidMatch[1];

      // Delete from Pinata
      await pinata.files.delete([cid]); // Correct method
      console.log("Deleted in pinata");
    } else {
      console.log("CID extraction failed");
    }

    // Remove profile image from database
    await db.user.update({
      where: { id: session.user.id },
      data: { image: null }, // Set image to null
    });

    return NextResponse.json(
      { message: "Profile picture removed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing profile picture:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
