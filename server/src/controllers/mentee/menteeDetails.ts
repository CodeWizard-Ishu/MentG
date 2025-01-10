import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getMenteeDetails = async (req: any, res: any) => {
  const { menteeId } = req.params;

  try {
    const userId = parseInt(menteeId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid mentee ID" });
    }

    const Mentee = await prisma.menteeProfile.findUnique({
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

    if (!Mentee) {
      return res.status(404).json({ error: "Mentee not found" });
    }

    return res.json(Mentee);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMenteeDetails = async (req: any, res: any) => {
  const { menteeId } = req.params;
  const {
    firstName,
    lastName,
    goals,
    phoneNumber,
    profilePicture,
    linkedin,
    twitter,
    instagram,
  } = req.body;

  try {
    const userId = parseInt(menteeId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Update the mentor profile
    const menteeProfile = await prisma.menteeProfile.update({
      where: { userId: userId },
      data: {
        profilePicture, // Update profile picture (can be null or base64 string)
        phoneNumber,
        goals,
        linkedin,
        twitter,
        instagram, // Update phone number (can be null)
        user: {
          update: {
            firstName,
            lastName,
          },
        },
      },
    });

    res.json({ message: "Mentee profile updated successfully", menteeProfile });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      // Record not found error code in Prisma
      return res.status(404).json({ message: "Mentee profile not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
