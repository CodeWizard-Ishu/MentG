import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateAvailability = async (req: any, res: any) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const parsedMentorId = parseInt(id);

    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    if(!mProfile){
      return res.status(404).json({ success: false, message: "Mentor not found!" });
    }

    const userId = mProfile.userId;
    await prisma.availability.deleteMany({
      where: { mentorId: userId },
    });

    const availabilityEntries = await prisma.availability.createMany({
      data: availability
        .filter((option: any) => option.enabled)
        .map((option: any) => ({
          mentorId: userId,
          dayOfWeek: option.dayOfWeek,
          startTime: new Date(option.startTime),
          endTime: new Date(option.endTime),
          enabled: true, 
        })),
    });

    res.status(201).json({ success: true, data: availabilityEntries });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ success: false, message: "An error occurred while saving availability." });
  }
};

export const getAvailability = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const parsedMentorId = parseInt(id);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    if(!mProfile){
      return res.status(404).json({ success: false, message: "Mentor not found!" });
    }

    const userId = mProfile.userId;
    const availability = await prisma.availability.findMany({
      where: { mentorId: userId },
    });

    const transformedAvailability = availability.map(slot => ({
      dayOfWeek: slot.dayOfWeek,
      enabled: Boolean(slot.enabled),
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString()
    }));

    res.status(200).json({ data: transformedAvailability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving availability." });
  }
};