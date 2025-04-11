import { getPrismaClient } from "../../prisma";
import { sendNote } from "../mailer";

const prisma = getPrismaClient();

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const getBookingAvailablity = async (req: any, res: any) => {
  const { username } = req.params;

  try {
    const parsedUsername = String(username);
    const mProfile = await prisma.user.findUnique({
      where: { username: parsedUsername },
    });
    if(!mProfile){
      return res.status(404).json({ success: false, message: "User not Found!"})
    }

    const availability = await prisma.availability.findMany({
      where: { mentorId: mProfile.id },
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

    res.status(200).json({ success: true, data: transformedAvailability });
  } catch (error) {
    console.error("Error retrieving availability:", error);
    res.status(500).json({ success: false, message: "Error retrieving availability" });
  }
};

export const sendMentorNote = async (req: any, res: any) => {
  const { mentorUsername, menteeId, message, menteeEmail } = req.body;

  try {
    if(!mentorUsername || !menteeId) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }
    if (!menteeEmail || !message) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
    if (emailRegex.test(menteeEmail)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Fetch mentor's profile with associated user
    const mentorProfile = await prisma.user.findUnique({
      where: { username: String(mentorUsername) },
    });

    // Fetch mentee's profile with associated user
    const menteeProfile = await prisma.user.findUnique({
      where: { id: parseInt(menteeId, 10) }
    });

    // Validate profiles
    if (!mentorProfile || !menteeProfile) {
      return res.status(404).json({ success: false, message: "Mentor or Mentee not found" });
    }

    const mentorName = `${mentorProfile.firstName} ${mentorProfile.lastName}`;
    const menteeName = `${menteeProfile.firstName} ${menteeProfile.lastName}`;

    sendNote(mentorProfile.email, menteeEmail, mentorName, menteeName, message);

    res.status(200).json({ success: true, message: "Note sent successfully" });
  } catch (error) {
    console.error("Error sending mentor note:", error);
    res.status(500).json({ success: false, message: "Failed to send note" });
  }
};