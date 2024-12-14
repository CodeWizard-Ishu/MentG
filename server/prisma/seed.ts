// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function seedDatabase() {
//     try {
//         // Seed domains
//         await prisma.domain.createMany({
//             data: [
//                 { name: "Software Development" },
//                 { name: "Finance" },
//                 { name: "Tech" },
//             ],
//             skipDuplicates: true,
//         });

//         // Seed mentors
//         const mentorUsers = await Promise.all(
//             [1, 2, 3, 4, 5].map((i) =>
//                 prisma.user.create({
//                     data: {
//                         firstName: `Mentor${i}`,
//                         lastName: `Lastname${i}`,
//                         email: `mentor${i}@example.com`,
//                         password: `password${i}`,
//                         isMentor: true,
//                         isActive: true,
//                         mentorProfile: {
//                             create: {
//                                 bio: `Experienced in field ${i}`,
//                                 experience: `${i} years of experience`,
//                                 domains: {
//                                     connect: [{ id: 1 }, { id: 2 }],
//                                 },
//                             },
//                         },
//                     },
//                 })
//             )
//         );

//         // Seed mentees
//         const menteeUsers = await Promise.all(
//             [1, 2, 3, 4, 5].map((i) =>
//                 prisma.user.create({
//                     data: {
//                         firstName: `Mentee${i}`,
//                         lastName: `Lastname${i}`,
//                         email: `mentee${i}@example.com`,
//                         password: `password${i}`,
//                         isMentor: false,
//                         isActive: true,
//                         menteeProfile: {
//                             create: {
//                                 goals: `Goal ${i}`,
//                                 domains: {
//                                     connect: [{ id: 2 }, { id: 3 }],
//                                 },
//                             },
//                         },
//                     },
//                 })
//             )
//         );

//         console.log("Database seeded successfully!");
//     } catch (error) {
//         console.error("Error seeding database:", error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// seedDatabase();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedAdditionalBookingsAndRatings() {
    try {
        // Fetch all mentors and mentees
        const mentors = await prisma.mentorProfile.findMany({
            include: { user: true }, // Include user details if needed
        });

        const mentees = await prisma.menteeProfile.findMany({
            include: { user: true }, // Include user details if needed
        });

        if (mentees.length === 0) {
            console.error("No mentees found. Cannot create bookings.");
            return;
        }

        // Create additional bookings and ratings for each mentor
        const additionalBookings = await Promise.all(
            mentors.map(async (mentor) => {
                const randomMentee = mentees[Math.floor(Math.random() * mentees.length)];

                // Randomly determine the booking status
                const isUpcoming = Math.random() < 0.5; // 50% chance for upcoming
                const status = isUpcoming ? "PENDING" : "COMPLETED";
                
                // Set dateTime based on the status
                const dateTime = isUpcoming 
                    ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within the next week for upcoming
                    : new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random past date for completed

                const booking = await prisma.booking.create({
                    data: {
                        mentorId: mentor.id,
                        menteeId: randomMentee.id,
                        dateTime: dateTime,
                        duration: 60, // Duration in minutes
                        payment: Math.random() * 500, // Random payment amount
                        status: status,
                    },
                });

                // Create a rating for the booking only if it's completed
                if (status === "COMPLETED") {
                    await prisma.rating.create({
                        data: {
                            mentorId: mentor.id,
                            menteeId: randomMentee.id,
                            score: Math.floor(Math.random() * 5) + 1, // Random score between 1 and 5
                            feedback: "Great session! Looking forward to more.", // Sample feedback
                        },
                    });
                }

                return booking; // Return the booking for reference (if needed)
            })
        );

        console.log("Additional bookings and ratings created successfully!");
    } catch (error) {
        console.error("Error creating additional bookings and ratings:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdditionalBookingsAndRatings();