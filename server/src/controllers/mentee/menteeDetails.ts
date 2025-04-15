import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getMenteeDetails = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid mentee ID" });
    }

    const Mentee = await prisma.menteeProfile.findUnique({
      where: {
        userId: userId,
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
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json(Mentee);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateMenteeDetails = async (req: any, res: any) => {
  const { id } = req.params;
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
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid mentor ID" });
    }

    const menteeProfile = await prisma.menteeProfile.update({
      where: { userId: userId },
      data: {
        profilePicture,
        phoneNumber,
        goals,
        linkedin,
        twitter,
        instagram,
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
      return res.status(404).json({ success: false, message: "Mentee profile not found" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
