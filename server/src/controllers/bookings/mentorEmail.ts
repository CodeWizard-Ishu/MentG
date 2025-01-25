import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getMentorEmail = async (req: any, res: any) => {
  const { mentorId } = req.params;

  try {
    const userId = parseInt(mentorId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    const Mentor = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!Mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    return res.json(Mentor.email);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
