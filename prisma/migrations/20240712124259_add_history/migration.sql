-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stocks" TEXT[],

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
