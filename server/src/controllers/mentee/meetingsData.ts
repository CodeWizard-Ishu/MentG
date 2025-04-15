import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getAllMenteeMeetings = async (req: any, res: any) => {
  const { id } = req.params; // Mentee ID
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  // Convert page and limit to numbers
  const pageNumber = Number(page);
  const pageSize = Number(limit);

  // Validate page and limit
  if (pageNumber < 1 || pageSize < 1) {
    return res.status(400).json({ success: false, message: "Page and limit must be greater than 0" });
  }

  try {
    const menteeProfile = await prisma.menteeProfile.findUnique({
      where: { userId: Number(id) }, // Assuming userId is stored as a number
    });

    if (!menteeProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const menteeId = menteeProfile.userId; // Get internal mentee ID
    // Fetch total count of bookings for pagination
    const totalBookingsCount = await prisma.booking.count({
      where: { menteeId: Number(menteeId) },
    });

    // Fetch bookings with pagination and include mentor details
    const bookings = await prisma.booking.findMany({
      where: { menteeId: Number(menteeId) },
      orderBy: { dateTime: "desc" },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        mentor: {
          select: {
            user: true,
          },
        },
      },
    });

    // Prepare response data
    const responseData = {
      totalBookingsCount,
      totalPages: Math.ceil(totalBookingsCount / pageSize),
      currentPage: pageNumber,
      bookings: bookings.map((booking) => ({
        dateTime: booking.dateTime,
        amount: booking.payment,
        status: booking.status,
        duration: booking.duration,
        mentorId: booking.mentorId,
        mentorName: `${booking.mentor.user.firstName} ${booking.mentor.user.lastName || ""}`,
      })),
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
