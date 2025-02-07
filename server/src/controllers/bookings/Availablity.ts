import { getPrismaClient } from "../../prisma";
import { sendNote } from "../mailer";

const prisma = getPrismaClient();

export const getBookingAvailablity = async (req: any, res: any) => {
  const {mentorId} = req.params;

  try {
    const parsedMentorId = parseInt(mentorId);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const userId = mProfile?.userId;

    const availability = await prisma.availability.findMany({
      where: { mentorId: userId },
    });

    // Transform times to Date objects
    const transformedAvailability = availability.map(slot => {
      // Create new Date objects from the UTC times
      const startTime = new Date(slot.startTime);
      const endTime = new Date(slot.endTime);

      return {
        ...slot,
        startTime,
        endTime
      };
    });

    res.status(200).json({ data: transformedAvailability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving availability." });
  }
};

export const sendMentorNote = async (req: any, res: any) => {
  const { mentorId, menteeId, message, menteeEmail } = req.body;

  try {
    if(!mentorId || !menteeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    if (!menteeEmail || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    if (!menteeEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Fetch mentor's profile with associated user
    const mentorProfile = await prisma.user.findUnique({
      where: { id: parseInt(mentorId, 10) },
    });

    // Fetch mentee's profile with associated user
    const menteeProfile = await prisma.user.findUnique({
      where: { id: parseInt(menteeId, 10) }
    });

    // Validate profiles
    if (!mentorProfile || !menteeProfile) {
      return res.status(404).json({ error: "Mentor or Mentee not found" });
    }

    const mentorName = `${mentorProfile.firstName} ${mentorProfile.lastName}`;
    const menteeName = `${menteeProfile.firstName} ${menteeProfile.lastName}`;

    sendNote(mentorProfile.email, menteeEmail, mentorName, menteeName, message);

    res.status(200).json({ message: "Note sent successfully" });
  } catch (error) {
    console.error("Error sending mentor note:", error);
    res.status(500).json({ error: "Failed to send note" });
  }
};