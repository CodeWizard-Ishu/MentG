import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getServiceDetail = async (req: any, res: any) => {
  const { mentorId, name } = req.params;

  try {
    const parsedMentorId = parseInt(mentorId);
    // Find the mentor profile by userId
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
      include: {
        services: true, // Include services in the mentor profile
      },
    });

    if (!mProfile) {
      return res.status(404).json({ error: "Mentor not found." });
    }

    // Find the service by name within the mentor's services
    const service = mProfile.services.find(service => service.name === name);

    if (!service) {
      return res.status(404).json({ error: "Service not found." });
    }

    res.status(200).json({ data: service });
  } catch (error) {
    console.error("Error retrieving service details:", error);
    res.status(500).json({ error: "An error occurred while retrieving service details." });
  }
};
