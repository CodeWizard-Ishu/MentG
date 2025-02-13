import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

const getTopMentors = async (domainNames: any) => {
  // Fetch domain IDs based on names
  const domains = await prisma.domain.findMany({
    where: {
      name: { in: domainNames },
    },
  });

  const domainIds = domains.map((domain) => domain.id);
  if (domainIds.length === 0) {
    return [];
  }
  const topMentorsPromises = domainIds.map(async (domainId) => {
    const data = await prisma.mentorProfile.findMany({
      where: {
        domains: {
          some: { id: domainId },
        },
      },
      orderBy: {
        rating: "desc",
      },
      take: 10,
      include: {
        user: true,
      },
    });

    const mentors = data.map((mentor) => {
      return {
        profilePicture: mentor.profilePicture,
        bio: mentor.bio,
        firstName: mentor.user.firstName,
        lastName: mentor.user.lastName,
      };
    });

    return { domainId, mentors };
  });

  return Promise.all(topMentorsPromises);
};

export const topMentorOfDomain = async (req: any, res: any) => {
  const { domainNames } = req.query; // Expecting domain names as a query parameter
  const domainsArray = Array.isArray(domainNames) ? domainNames : [domainNames];
  try {
    const mentors = await getTopMentors(domainsArray);
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
