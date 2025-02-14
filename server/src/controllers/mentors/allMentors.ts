import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

const getMentors = async (page: any, limit: any) => {
  try {
    // Fetch mentors associated with the domain
    const data = await prisma.mentorProfile.findMany({
      include: {
        user: true,
      },
      skip: (page - 1) * limit,
      take: Number(limit),
    });

    const mentors = data.map((mentor) => {
      return {
        userId: mentor.userId,
        profilePicture: mentor.profilePicture,
        bio: mentor.bio,
        firstName: mentor.user.firstName,
        lastName: mentor.user.lastName,
      }
    })

    const totalMentors = await prisma.mentorProfile.count();

    return {
      mentors,
      totalPages: Math.ceil(totalMentors / limit),
      currentPage: Number(page),
    };
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw new Error("Server Error");
  }
};

export const getAllMentors = async (req: any, res: any) => {
  const { page = 1, limit = 18 } = req.query;
  try {
    const result = await getMentors(page, limit);
    res.json(result);
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ message: error.message });
  }
};
