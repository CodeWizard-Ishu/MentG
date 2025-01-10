import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

const getMentorsOfDomain = async (domain: any, page: any, limit: any) => {
  try {
    // Fetch the domain ID based on the domain name
    const domainRecord = await prisma.domain.findUnique({
      where: { name: domain },
    });

    if (!domainRecord) {
      console.error(`Domain not found: ${domain}`);
      throw new Error("Domain not found");
    }

    // Fetch mentors associated with the domain
    const mentors = await prisma.mentorProfile.findMany({
      where: {
        domains: {
          some: {
            id: domainRecord.id,
          },
        },
      },
      include: {
        user: true,
      },
      skip: (page - 1) * limit,
      take: Number(limit),
    });

    const totalMentors = await prisma.mentorProfile.count({
      where: {
        domains: {
          some: {
            id: domainRecord.id,
          },
        },
      },
    });

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

// API Endpoint to fetch mentors by domain with pagination
export const getMentors = async (req: any, res: any) => {
  const { domain, page = 1, limit = 20 } = req.query;
  try {
    const result = await getMentorsOfDomain(domain, page, limit);
    res.json(result);
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ message: error.message });
  }
};
