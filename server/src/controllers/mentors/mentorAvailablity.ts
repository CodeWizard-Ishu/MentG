import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateAvailability = async (req: any, res: any) => {
  const { mentorId, availability } = req.body;

  try {
    const parsedMentorId = parseInt(mentorId);

    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const id = mProfile?.id;

    // Delete existing availability for the mentor
    await prisma.availability.deleteMany({
      where: { mentorId: id },
    });

    // Create new availability entries
    const availabilityEntries = await prisma.availability.createMany({
      data: availability
        .filter((option: any) => option.enabled) // Only include enabled days
        .map((option: any) => ({
          mentorId: id,
          dayOfWeek: option.dayOfWeek,
          // Frontend now sends ISO strings in UTC, so we can directly use them
          startTime: new Date(option.startTime),
          endTime: new Date(option.endTime),
          enabled: true, 
        })),
    });

    res.status(201).json({ success: true, data: availabilityEntries });
  } catch (error) {
    console.error("Error updating availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving availability." });
  }
};

export const getAvailability = async (req: any, res: any) => {
  const { mentorId } = req.params;

  try {
    const parsedMentorId = parseInt(mentorId);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const id = mProfile?.id;

    const availability = await prisma.availability.findMany({
      where: { mentorId: id },
      select: {
        dayOfWeek: true,
        startTime: true,
        endTime: true,
        enabled: true,
      },
    });

    // Transform the data for frontend
    const transformedAvailability = availability.map(slot => ({
      dayOfWeek: slot.dayOfWeek,
      enabled: true,
      // Send ISO strings in UTC format
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString()
    }));

    res.status(200).json({ data: transformedAvailability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving availability." });
  }
};