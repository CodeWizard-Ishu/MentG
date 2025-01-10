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

export const updateMentorDetails = async (req: any, res: any) => {
  const { mentorId } = req.params;
  const {
    firstName,
    lastName,
    bio,
    phoneNumber,
    profilePicture,
    linkedin,
    twitter,
    instagram,
  } = req.body;

  try {
    const userId = parseInt(mentorId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Update the mentor profile
    const mentorProfile = await prisma.mentorProfile.update({
      where: { userId: userId },
      data: {
        profilePicture, // Update profile picture (can be null or base64 string)
        phoneNumber,
        bio,
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

    res.json({ message: "Mentor profile updated successfully", mentorProfile });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      // Record not found error code in Prisma
      return res.status(404).json({ message: "Mentor profile not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
