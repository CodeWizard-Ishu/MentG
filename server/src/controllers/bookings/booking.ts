import { BookingStatus } from "@prisma/client";
import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateBooking = async (req: any, res: any) => {
  const mentorId = parseInt(req.body.mentorId, 10); // Convert mentorId to an integer
  const menteeId = parseInt(req.body.menteeId, 10); // Convert menteeId to an integer

  const dateTime = new Date(req.body.dateTime); // Ensure dateTime is in correct format
  const duration = req.body.duration; // Duration should already be a number
  const payment = req.body.payment; // Payment should already be a number
  const serviceName = req.body.serviceName; // Service name as string
  const serviceDescription = req.body.serviceDescription; // Service description as string
  const servicePrice = req.body.servicePrice; // Service price as number

  try {
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: mentorId },
    });
    const menteeProfile = await prisma.menteeProfile.findUnique({
      where: { userId: menteeId },
    });

    if (!mentorProfile) {
      return res.status(400).json({ error: "Mentor does not exist" });
    }

    if (!menteeProfile) {
      return res.status(400).json({ error: "Mentee does not exist" });
    }
    const booking = await prisma.booking.create({
      data: {
        mentorId: mentorProfile.id,
        menteeId: menteeProfile.id,
        dateTime,
        duration,
        payment,
        status: BookingStatus.PENDING, // Initial status can be PENDING
        serviceName,
        serviceDescription,
        servicePrice,
      },
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking" });
  }
};
