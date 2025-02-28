-- CreateTable
CREATE TABLE "Help" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Help_pkey" PRIMARY KEY ("id")
);
