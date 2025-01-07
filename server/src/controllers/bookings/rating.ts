import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const submitRating = async (req: any, res: any) => {
  const { score, feedback } = req.body;
  const mentorId = parseInt(req.body.mentorId, 10); // Convert mentorId to an integer
  const menteeId = parseInt(req.body.menteeId, 10);
  try {
    const menteeProfile = await prisma.menteeProfile.findUnique({
      where: { userId: menteeId },
    });

    if (!menteeProfile) {
      return res.status(400).json({ error: "Mentee does not exist" });
    }
    // Validate score
    if (score < 1 || score > 5) {
      return res.status(400).json({ error: "Score must be between 1 and 5." });
    }

    // Create new rating entry in the database
    const newRating = await prisma.rating.create({
      data: {
        mentorId,
        menteeId: menteeProfile.id,
        score,
        feedback,
      },
    });

    return res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while submitting the rating." });
  }
};

export const getRatingsForMentor = async (req: any, res: any) => {
  const mentorId = parseInt(req.params.mentorId, 10); // Get mentorId from route parameters

  try {
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: mentorId },
    });
    if (!mentorProfile) {
      return res.status(400).json({ error: "Mentor does not exist" });
    }
    const ratings = await prisma.rating.findMany({
      where: { mentorId: mentorProfile.id },
      include: {
        mentee: {
          // Assuming you want to include mentee details
          select: {
            user: true,
          },
        },
      },
    });
    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this mentor." });
    }

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching ratings." });
  }
};
