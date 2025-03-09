import { getPrismaClient } from "../../prisma";
import { sendReportMail } from "../mailer";

const prisma = getPrismaClient();

export const reportBooking = async (req: any, res: any) => {
  const { id } = req.params;
  const { mentorId, menteeId, report } = req.body;
  const parsedId = parseInt(id);
  const parsedMentorId = parseInt(mentorId);
  const parsedMenteeId = parseInt(menteeId);
  try {
    if(!mentorId || !menteeId || !report) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedId },
    });
    const Mentor = await prisma.user.findUnique({
      where: { id: parsedMentorId },
    });
    const Mentee = await prisma.user.findUnique({
      where: { id: parsedMenteeId },
    });
    if (!user || !Mentor || !Mentee) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const mentor = {
        email: Mentor.email,
        name: `${Mentor.firstName} ${Mentor.lastName}`,
    }
    const mentee = {
        email: Mentee.email,
        name: `${Mentee.firstName} ${Mentee.lastName}`,
    }
    const submitter = {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
    }

    sendReportMail(submitter, mentor, mentee, report);

    return res.status(201).json({ success: true, message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while submitting the report." });
  }
};