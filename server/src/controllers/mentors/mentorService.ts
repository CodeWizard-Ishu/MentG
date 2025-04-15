import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

const MAX_DOMAINS = 3;

export const updateService = async (req: any, res: any) => {
  const { id } = req.params;
  const { domains, services } = req.body;

  try {
    // Validate input
    if (!Array.isArray(domains) || !Array.isArray(services)) {
      return res.status(400).json({ success: false, message: "Invalid input: domains and services must be arrays" });
    }

    if (domains.length === 0 || services.length === 0) {
      return res.status(400).json({ success: false, message: "At least one domain and one service must be selected" });
    }

    if (domains.length > MAX_DOMAINS) {
      return res.status(400).json({ success: false, message: `Cannot select more than ${MAX_DOMAINS} domains` });
    }

    const parsedMentorId = parseInt(id);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });

    if (!mProfile) {
      return res.status(400).json({ success: false, message: "Invalid mentor ID" });
    }

    const domainRecords = await prisma.domain.findMany({
      where: { name: { in: domains } },
    });
    if (domainRecords.length !== domains.length) {
      const foundDomains = domainRecords.map(d => d.name);
      const missingDomains = domains.filter(d => !foundDomains.includes(d));
      return res.status(404).json({ success: false, message: `Domains not found: ${missingDomains.join(", ")}` 
      });
    }

    const serviceRecords = await prisma.service.findMany({
      where: { name: { in: services } },
    });
    if (serviceRecords.length !== services.length) {
      const foundServices = serviceRecords.map(s => s.name);
      const missingServices = services.filter(s => !foundServices.includes(s));
      return res.status(404).json({ success: false, message: `Services not found: ${missingServices.join(", ")}` });
    }

    const updateData = {
      domains: {
        set: domainRecords.map(domain => ({ id: domain.id })),
      },
      services: {
        set: serviceRecords.map(service => ({ id: service.id })),
      },
    };

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
    if (error.code === "P2025") {
      return res.status(400).json({ success: false, message: "Mentor profile not found or already disconnected." });
    }
    res.status(500).json({ success: false, message: "An error occurred while updating the mentor profile." });
  }
};

export const getServices = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const parsedMentorId = parseInt(id, 10);
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
      include: {
        domains: true,
        services: true,
      },
    });
    if(!mentorProfile){
      return res.status(404).json({ success: false, message: "Mentor not found!" });
    }

    const responseData = {
      domains: mentorProfile.domains.map((domain) => domain.name),
      services: mentorProfile.services.map((service) => service.name),
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching the mentor profile." });
  }
};
