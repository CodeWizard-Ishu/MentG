import { BookingStatus } from "@prisma/client";
import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateBooking = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    mentorUsername,
    dateTime,
    duration,
    payment,
    serviceName,
    serviceDescription,
    servicePrice,
    meetLink
  } = req.body;

  const parsedMentorUsername = String(mentorUsername);
  const parsedMenteeId = parseInt(id, 10);
  const parsedDateTime = new Date(dateTime);

  if(serviceName === "Quick Chat" || serviceName === "Priority DMs" || serviceName === "Webinars" || !meetLink || !parsedMenteeId){
    return res.status(404).json({ success: false, message: "Service cannot be booked!"});
  }

  try {
    const mentor = await prisma.user.findUnique({
      where: { username: parsedMentorUsername },
    });
    if(!mentor) return res.status(404).json({ success: false, message: "Mentor not found!"});
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId : mentor.id }
    })
    if (!mentorProfile) {
      return res.status(404).json({ success: false, message: "Mentor not found!"});
    }

    const booking = await prisma.booking.create({
      data: {
        mentorId: mentorProfile.userId,
        menteeId: parsedMenteeId,
        dateTime: parsedDateTime,
        duration,
        payment,
        status: BookingStatus.CONFIRMED,
        serviceName,
        serviceDescription,
        servicePrice,
        meetLink: meetLink
      },
    });

    res.status(201).json({ success: true, message: "Booking created successfully!"});
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "An error occurred while creating the booking" });
  }
};
