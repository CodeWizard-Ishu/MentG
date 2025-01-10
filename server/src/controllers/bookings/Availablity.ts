import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getBookingAvailablity = async (req: any, res: any) => {
  const { mentorId } = req.params;

  try {
    const parsedMentorId = parseInt(mentorId);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const id = mProfile?.id;

    const availability = await prisma.availability.findMany({
      where: { mentorId: id },
    });

    res.status(200).json({ data: availability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving availability." });
  }
};
