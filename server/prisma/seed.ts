import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        await prisma.domain.createMany({
            data: [
                { name: "Software Development" },
                { name: "Finance" },
                { name: "Tech" },
            ],
            skipDuplicates: true,
        });

        const mentorUsers = await Promise.all(
            [1, 2, 3, 4, 5].map((i) =>
                prisma.user.create({
                    data: {
                        firstName: `Mentor${i}`,
                        lastName: `Lastname${i}`,
                        email: `mentor${i}@example.com`,
                        password: `password${i}`,
                        isMentor: true,
                        isActive: true,
                        mentorProfile: {
                            create: {
                                bio: `Experienced in field ${i}`,
                                experience: `${i} years of experience`,
                                domains: {
                                    connect: [{ id: 1 }, { id: 2 }],
                                },
                            },
                        },
                    },
                    include: { mentorProfile: true },
                })
            )
        );

        const mentors = mentorUsers
            .map((user) => user.mentorProfile)
            .filter((profile): profile is NonNullable<typeof profile> => profile !== null);

        const menteeUsers = await Promise.all(
            [1, 2, 3, 4, 5].map((i) =>
                prisma.user.create({
                    data: {
                        firstName: `Mentee${i}`,
                        lastName: `Lastname${i}`,
                        email: `mentee${i}@example.com`,
                        password: `password${i}`,
                        isMentor: false,
                        isActive: true,
                        menteeProfile: {
                            create: {
                                goals: `Goal ${i}`,
                                domains: {
                                    connect: [{ id: 2 }, { id: 3 }],
                                },
                            },
                        },
                    },
                    include: { menteeProfile: true },
                })
            )
        );

        const mentees = menteeUsers
            .map((user) => user.menteeProfile)
            .filter((profile): profile is NonNullable<typeof profile> => profile !== null);

        // Create bookings
        const bookings = await Promise.all(
            mentors.map((mentor, i) =>
                prisma.booking.create({
                    data: {
                        mentorId: mentor.id,
                        menteeId: mentees[i].id,
                        dateTime: new Date(),
                        duration: 60,
                        payment: Math.random() * 500,
                        status: "COMPLETED",
                    },
                })
            )
        );

        // Create ratings
        await Promise.all(
            bookings.map((booking, i) =>
                prisma.rating.create({
                    data: {
                        mentorId: booking.mentorId,
                        menteeId: booking.menteeId,
                        score: 4,
                        feedback: "Great session!",
                    },
                })
            )
        );

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();