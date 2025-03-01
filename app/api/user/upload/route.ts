import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    //upload file to pinata
    const uploadData = await pinata.upload.file(file);
    if (!uploadData || !uploadData.cid) {
      return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }

    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600,
    });

    // Update user profile image in database
    await db.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });

    return NextResponse.json({ imageUrl: url }, { status: 200 });
  } catch (e) {
    console.log("Upload error:", e);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
