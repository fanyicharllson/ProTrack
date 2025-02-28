-- CreateTable
CREATE TABLE "FeedBack" (
    "id" TEXT NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "likeMost" TEXT NOT NULL,
    "generalFeedback" TEXT NOT NULL,
    "wouldRecommended" TEXT NOT NULL,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);
