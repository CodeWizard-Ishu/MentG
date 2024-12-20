import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateService = async (req: any, res: any) => {
  const { mentorId } = req.params;
  const { domain, services } = req.body;

  try {
    // Parse mentorId and check if it's a valid number
    const parsedMentorId = parseInt(mentorId);
    if (isNaN(parsedMentorId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Look up the domain ID
    const domainRecord = await prisma.domain.findUnique({
      where: { name: domain }, // Assuming name is unique
    });

    if (!domainRecord) {
      return res.status(404).json({ error: "Domain not found" });
    }

    // Look up service IDs
    const serviceRecords = await prisma.service.findMany({
      where: { name: { in: services } }, // Find all services with names in the provided array
    });

    // Create a map of service names to their IDs
    const serviceIdsMap = new Map(
      serviceRecords.map((service) => [service.name, service.id])
    );

    // Check if all requested services were found
    const missingServices = services.filter(
      (service: any) => !serviceIdsMap.has(service)
    );

    if (missingServices.length > 0) {
      return res
        .status(404)
        .json({ error: `Services not found: ${missingServices.join(", ")}` });
    }

    // Update Mentor Profile
    const updatedMentor = await prisma.mentorProfile.update({
      where: { id: parsedMentorId }, // Use the parsed mentor ID
      data: {
        domains: {
          set: [{ id: domainRecord.id }], // Use the found domain ID
        },
        services: {
          set: Array.from(serviceIdsMap.values()).map((id) => ({ id })), // Use the found service IDs
        },
      },
      include: {
        domains: true,
        services: true,
      },
    });

    res.json(updatedMentor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the mentor profile." });
  }
};

export const getServices = async (req: any, res: any) => {
  const { mentorId } = req.params;

  try {
    // Parse mentorId and check if it's a valid number
    const parsedMentorId = parseInt(mentorId);
    if (isNaN(parsedMentorId)) {
      return res.status(400).json({ error: "Invalid mentor ID" });
    }

    // Fetch Mentor Profile including domains and services
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: parsedMentorId },
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
      domain: mentorProfile.domains.map((domain) => domain.name), // Assuming domain has a name field
      services: mentorProfile.services.map((service) => service.name), // Assuming service has a name field
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the mentor profile." });
  }
};
