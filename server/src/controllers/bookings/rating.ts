import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const submitRating = async (req: any, res: any) => {
  const { score, feedback } = req.body;
  const mentorId = parseInt(req.body.mentorId, 10);
  const menteeId = parseInt(req.body.menteeId, 10);
  try {
    const menteeProfile = await prisma.menteeProfile.findUnique({
      where: { userId: menteeId },
    });

    if (!menteeProfile) {
      return res.status(400).json({ error: "Mentee does not exist" });
    }
    if (score < 1 || score > 5) {
      return res.status(400).json({ error: "Score must be between 1 and 5." });
    }

    const newRating = await prisma.rating.create({
      data: {
        mentorId,
        menteeId: menteeProfile.userId,
        score,
        feedback,
      },
    });

    return res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while submitting the rating." });
  }
};

const getRatings = async (mentorId: number, page: number, limit: number, rating: number | null = null, sort: string = "most-recent") => {
  try {
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: mentorId },
    });
    
    if (!mentorProfile) {
      throw new Error("Mentor does not exist");
    }
    
    const whereCondition: any = { mentorId: mentorProfile.userId };
    
    if (rating !== null) {
      whereCondition.score = rating;
    }
    
    let orderBy: any = { createdAt: "desc" };
    
    if (sort === "highest-rating") {
      orderBy = { score: "desc" };
    } else if (sort === "lowest-rating") {
      orderBy = { score: "asc" };
    }
    
    const ratings = await prisma.rating.findMany({
      where: whereCondition,
      include: {
        mentee: {
          select: {
            user: true,
          },
        },
      },
      orderBy: orderBy,
      skip: (page - 1) * limit,
      take: Number(limit),
    });
    
    const totalRatings = await prisma.rating.count({
      where: whereCondition,
    });
    
    return {
      ratings,
      totalPages: Math.ceil(totalRatings / limit),
      currentPage: Number(page),
      totalRatings,
    };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const getRatingsForMentor = async (req: any, res: any) => {
  const { id } = req.params;
  const { page = 1, limit = 10, rating = null, sort = "most-recent" } = req.query;
  const parsedId = parseInt(id, 10);
  const parsedPage = parseInt(String(page), 10);
  const parsedLimit = parseInt(String(limit), 10);
  const parsedRating = rating !== null ? parseInt(String(rating), 10) : null;

  try {
    const result = await getRatings(parsedId, parsedPage, parsedLimit, parsedRating, String(sort));
    
    if (result.ratings.length === 0 && parsedPage === 1) {
      return res.status(200).json({ 
        message: "No ratings found for this mentor.",
        ratings: [],
        totalPages: 0,
        currentPage: 1,
        totalRatings: 0
      });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Mentor does not exist") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "An error occurred while fetching ratings." });
  }
};
