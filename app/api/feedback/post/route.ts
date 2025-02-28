import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { feedBackSchema } from "@/app/Schema/FeedBackSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { overallRating, likeMost, generalFeedback, wouldRecommend } =
      feedBackSchema.parse(body);

    const newFeedBack = await db.feedBack.create({
      data: {
        overallRating,
        likeMost,
        generalFeedback,
        wouldRecommend,
      },
    });

    return NextResponse.json(
      {
        message: "Thankyou for your Feedback!",
        data: newFeedBack,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
