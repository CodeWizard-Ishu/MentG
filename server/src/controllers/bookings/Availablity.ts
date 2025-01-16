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

    // Transform times to Date objects
    const transformedAvailability = availability.map(slot => {
      // Create new Date objects from the UTC times
      const startTime = new Date(slot.startTime);
      const endTime = new Date(slot.endTime);

      return {
        ...slot,
        startTime,
        endTime
      };
    });

    res.status(200).json({ data: transformedAvailability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving availability." });
  }
};