-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "meetLink" TEXT;

-- CreateTable
CREATE TABLE "CalendarConnection" (
    "id" SERIAL NOT NULL,
    "mentorId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CalendarConnection_mentorId_idx" ON "CalendarConnection"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarConnection_mentorId_provider_key" ON "CalendarConnection"("mentorId", "provider");

-- AddForeignKey
ALTER TABLE "CalendarConnection" ADD CONSTRAINT "CalendarConnection_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "MentorProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
