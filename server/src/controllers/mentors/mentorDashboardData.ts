import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getMentorData = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const mentorData = await prisma.mentorProfile.findUnique({
      where: { userId: Number(id) },
      include: {
        bookings: true, // Include bookings to calculate totals
      },
    });

    if (!mentorData) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Calculate total earnings, total bookings, and unique mentees
    const totalEarnings = mentorData.bookings.reduce(
      (sum, booking) => sum + booking.payment,
      0
    );
    const totalBookings = mentorData.bookings.length;
    const uniqueMentees = new Set(
      mentorData.bookings.map((booking) => booking.menteeId)
    ).size;
    const profilePicture = mentorData.profilePicture;
    // Get recent meetings (last 5 bookings)
    const recentMeetings = await prisma.booking.findMany({
      where: { mentorId: mentorData.userId },
      orderBy: { dateTime: "desc" },
      take: 3,
      include: {
        mentee: {
          select: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
    });

    // Prepare response data without full name
    const responseData = {
      profilePicture,
      totalEarnings,
      totalBookings,
      uniqueMentees,
      recentMeetings: recentMeetings.map((meeting: any) => ({
        dateTime: meeting.dateTime,
        menteeName: `${meeting.mentee.user.firstName} ${
          meeting.mentee.user.lastName || ""
        }`,
        duration: meeting.duration,
        status: meeting.status,
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
