import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getBookingFormData = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id, 10);
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
