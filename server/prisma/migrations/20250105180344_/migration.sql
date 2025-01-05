-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_mentorId_fkey";

-- CreateTable
CREATE TABLE "_MentorServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MentorServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MentorServices_B_index" ON "_MentorServices"("B");

-- AddForeignKey
ALTER TABLE "_MentorServices" ADD CONSTRAINT "_MentorServices_A_fkey" FOREIGN KEY ("A") REFERENCES "MentorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorServices" ADD CONSTRAINT "_MentorServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
