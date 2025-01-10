import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getAllMeetings = async (req: any, res: any) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  // Convert page and limit to numbers
  const pageNumber = Number(page);
  const pageSize = Number(limit);

  // Validate page and limit
  if (pageNumber < 1 || pageSize < 1) {
    return res
      .status(400)
      .json({ error: "Page and limit must be greater than 0" });
  }

  try {
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: Number(id) },
    });
    const parsedId = mProfile?.id;
    // Fetch total count of bookings for pagination
    const totalBookingsCount = await prisma.booking.count({
      where: { mentorId: Number(parsedId) },
    });

    // Fetch bookings with pagination and include mentee details
    const bookings = await prisma.booking.findMany({
      where: { mentorId: Number(parsedId) },
      orderBy: { dateTime: "desc" },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        mentee: {
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
      bookings: bookings.map((booking: any) => ({
        dateTime: booking.dateTime,
        amount: booking.payment, // Amount of each booking
        status: booking.status,
        duration: booking.duration,
        menteeId: booking.menteeId,
        menteeName: `${booking.mentee.user.firstName} ${
          booking.mentee.user.lastName || ""
        }`, // Concatenate first and last name
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
