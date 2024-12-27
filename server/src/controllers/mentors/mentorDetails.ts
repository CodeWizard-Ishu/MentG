import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getMentorDetails = async (req: any, res: any) => {
  const { mentorId } = req.params;

  try {
    const userId = parseInt(mentorId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    const Mentor = await prisma.mentorProfile.findUnique({
      where: {
        userId: userId, // Use the integer value here
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Check if Mentor was found
    if (!Mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    return res.json(Mentor);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
