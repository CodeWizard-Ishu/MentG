import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateService = async (req: any, res: any) => {
  const { id } = req.params;
  const { domain, services } = req.body;

  try {
    // Parse mentorId and check if it's a valid number
    const parsedMentorId = parseInt(id);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });

    if (!mProfile) {
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

    // Prepare data for update
    const updateData = {
      domains: {
        set: [{ id: domainRecord.id }], // Set the new domain
      },
      services: {
        set: Array.from(serviceIdsMap.values()).map((id) => ({ id })), // Connect existing service IDs
      },
    };

    // Update Mentor Profile
    const updatedMentor = await prisma.mentorProfile.update({
      where: { id: mProfile.id }, // Use the mentor profile ID
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
      return res
        .status(404)
        .json({ error: "Mentor profile not found or already disconnected." });
    }

    res
      .status(500)
      .json({ error: "An error occurred while updating the mentor profile." });
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
