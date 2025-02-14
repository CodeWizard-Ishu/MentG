import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

const MAX_DOMAINS = 3;

export const updateService = async (req: any, res: any) => {
  const { id } = req.params;
  const { domains, services } = req.body;

  try {
    // Validate input
    if (!Array.isArray(domains) || !Array.isArray(services)) {
      return res.status(400).json({ 
        error: "Invalid input: domains and services must be arrays" 
      });
    }

    if (domains.length === 0 || services.length === 0) {
      return res.status(400).json({ 
        error: "At least one domain and one service must be selected" 
      });
    }

    if (domains.length > MAX_DOMAINS) {
      return res.status(400).json({ 
        error: `Cannot select more than ${MAX_DOMAINS} domains` 
      });
    }

    // Parse mentorId and check if it's a valid number
    const parsedMentorId = parseInt(id);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });

    if (!mProfile) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Look up all domain IDs
    const domainRecords = await prisma.domain.findMany({
      where: { name: { in: domains } },
    });

    if (domainRecords.length !== domains.length) {
      const foundDomains = domainRecords.map(d => d.name);
      const missingDomains = domains.filter(d => !foundDomains.includes(d));
      return res.status(404).json({ 
        error: `Domains not found: ${missingDomains.join(", ")}` 
      });
    }

    // Look up service IDs
    const serviceRecords = await prisma.service.findMany({
      where: { name: { in: services } },
    });

    if (serviceRecords.length !== services.length) {
      const foundServices = serviceRecords.map(s => s.name);
      const missingServices = services.filter(s => !foundServices.includes(s));
      return res.status(404).json({ 
        error: `Services not found: ${missingServices.join(", ")}` 
      });
    }

    // Prepare data for update
    const updateData = {
      domains: {
        set: domainRecords.map(domain => ({ id: domain.id })),
      },
      services: {
        set: serviceRecords.map(service => ({ id: service.id })),
      },
    };

    // Update Mentor Profile
    const updatedMentor = await prisma.mentorProfile.update({
      where: { id: mProfile.id },
      data: updateData,
      include: {
        domains: true,
        services: true,
      },
    });

    res.json(updatedMentor);
  } catch (error: any) {
    console.error(error);

    // Handle specific Prisma errors for better debugging
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Mentor profile not found or already disconnected." });
    }

    res.status(500).json({ error: "An error occurred while updating the mentor profile." });
  }
};

export const getServices = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    // Parse mentorId and check if it's a valid number
    const parsedMentorId = parseInt(id);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const userId = mProfile?.id;

    if (!mProfile) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Fetch Mentor Profile including domains and services
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: userId },
      include: {
        domains: true,
        services: true,
      },
    });

    if (!mentorProfile) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Prepare the response data
    const responseData = {
      domains: mentorProfile.domains.map((domain) => domain.name),
      services: mentorProfile.services.map((service) => service.name),
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the mentor profile." });
  }
};
