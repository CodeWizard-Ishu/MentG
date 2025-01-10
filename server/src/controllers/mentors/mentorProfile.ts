import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getProfileData = async (req: any, res: any) => {
  const mentorId = parseInt(req.params.id);

  try {
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: mentorId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        ratings: true,
        domains: true,
        services: true,
        bookings: true,
      },
    });

    if (!mentorProfile) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Calculate unique mentees and completed sessions
    const uniqueMentees = new Set(
      mentorProfile.bookings.map((booking) => booking.menteeId)
    ).size;
    const completedSessions = mentorProfile.bookings.length;

    // Calculate average rating
    const averageRating =
      mentorProfile.ratings.length > 0
        ? (
            mentorProfile.ratings.reduce(
              (acc, rating) => acc + rating.score,
              0
            ) / mentorProfile.ratings.length
          ).toFixed(2)
        : 0;

    // Prepare response data
    const responseData = {
      fullName: `${mentorProfile.user.firstName} ${mentorProfile.user.lastName}`,
      bio: mentorProfile.bio,
      linkedin: mentorProfile.linkedin,
      twitter: mentorProfile.twitter,
      instagram: mentorProfile.instagram,
      profilePicture: mentorProfile.profilePicture,
      uniqueMentees,
      completedSessions,
      averageRating,
      domains: mentorProfile.domains.map((domain) => domain.name),
      services: mentorProfile.services.map((service) => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
      })),
    };

    return res.json(responseData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching mentor profile" });
  }
};
