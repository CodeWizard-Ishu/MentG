// // import { PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient();

// // async function seedDatabase() {
// //   try {
// //     // Seed domains
// //     await prisma.domain.createMany({
// //       data: [
// //         { name: "Technology" },
// //         { name: "Business" },
// //         { name: "Career" },
// //         { name: "Marketing" },
// //         { name: "Finance" },
// //         { name: "Health" },
// //         { name: "Engineering" },
// //         { name: "Medical" },
// //         { name: "Mental Fitness" },
// //       ],
// //       skipDuplicates: true,
// //     });

// //     // Seed mentors
// //     const mentorUsers = await Promise.all(
// //       [1,2,3,4,5].map((i) =>
// //         prisma.user.create({
// //           data: {
// //             firstName: `Mentor${i}`,
// //             lastName: `Lastname${i}`,
// //             email: `mentor${i}@example.com`,
// //             password: `password${i}`,
// //             isMentor: true,
// //             isActive: true,
// //             mentorProfile: {
// //               create: {
// //                 bio: `Experienced in field ${i}`,
// //                 experience: `${i} years of experience`,
// //                 domains: {
// //                   connect: [{ id: (9*Math.random()+1)}],
// //                 },
// //               },
// //             },
// //           },
// //         })
// //       )
// //     );

// //     // Seed mentees
// //     const menteeUsers = await Promise.all(
// //       [1,2,3,4,5].map((i) =>
// //         prisma.user.create({
// //           data: {
// //             firstName: `Mentee${i}`,
// //             lastName: `Lastname${i}`,
// //             email: `mentee${i}@example.com`,
// //             password: `password${i}`,
// //             isMentor: false,
// //             isActive: true,
// //             menteeProfile: {
// //               create: {
// //                 goals: `Goal ${i}`,
// //                 domains: {
// //                   connect: [{ id: 2 }, { id: 3 }],
// //                 },
// //               },
// //             },
// //           },
// //         })
// //       )
// //     );

// //     console.log("Database seeded successfully!");
// //   } catch (error) {
// //     console.error("Error seeding database:", error);
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }

// // seedDatabase();
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function seedAdditionalBookingsAndRatings() {
//     try {
//         // Fetch all mentors and mentees
//         const mentors = await prisma.mentorProfile.findMany({
//             include: { user: true }, // Include user details if needed
//         });

//         const mentees = await prisma.menteeProfile.findMany({
//             include: { user: true }, // Include user details if needed
//         });

//         if (mentees.length === 0) {
//             console.error("No mentees found. Cannot create bookings.");
//             return;
//         }

//         // Create additional bookings and ratings for each mentor
//         const additionalBookings = await Promise.all(
//             mentors.map(async (mentor) => {
//                 const randomMentee = mentees[Math.floor(Math.random() * mentees.length)];

//                 // Randomly determine the booking status
//                 const isUpcoming = Math.random() < 0.5; // 50% chance for upcoming
//                 const status = isUpcoming ? "PENDING" : "COMPLETED";

//                 // Set dateTime based on the status
//                 const dateTime = isUpcoming
//                     ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within the next week for upcoming
//                     : new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random past date for completed

//                 const booking = await prisma.booking.create({
//                     data: {
//                         mentorId: mentor.id,
//                         menteeId: randomMentee.id,
//                         dateTime: dateTime,
//                         duration: 60, // Duration in minutes
//                         payment: Math.random() * 500, // Random payment amount
//                         status: status,
//                     },
//                 });

//                 // Create a rating for the booking only if it's completed
//                 if (status === "COMPLETED") {
//                     await prisma.rating.create({
//                         data: {
//                             mentorId: mentor.id,
//                             menteeId: randomMentee.id,
//                             score: Math.floor(Math.random() * 5) + 1, // Random score between 1 and 5
//                             feedback: "Great session! Looking forward to more.", // Sample feedback
//                         },
//                     });
//                 }

//                 return booking; // Return the booking for reference (if needed)
//             })
//         );

//         console.log("Additional bookings and ratings created successfully!");
//     } catch (error) {
//         console.error("Error creating additional bookings and ratings:", error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// seedAdditionalBookingsAndRatings();
// import { PrismaClient, BookingStatus } from '@prisma/client'; // Import BookingStatus enum

// const prisma = new PrismaClient();

// async function seedConsistentBookings() {
//     try {
//         // Define mentors and mentees
//         const mentors = await prisma.mentorProfile.findMany({
//             include: { user: true },
//         });

//         const mentees = await prisma.menteeProfile.findMany({
//             include: { user: true },
//         });

//         if (mentees.length === 0 || mentors.length === 0) {
//             console.error("No mentees or mentors found. Cannot create bookings.");
//             return;
//         }

//         // Define consistent bookings with correct enum values
//         const bookings = [
//             {
//                 mentorId: mentors[0].id,
//                 menteeId: mentees[0].id,
//                 dateTime: new Date('2023-01-11T23:27:44.075Z'),
//                 duration: 60,
//                 payment: 128.06,
//                 status: BookingStatus.COMPLETED, // Use enum value here
//             },
//             {
//                 mentorId: mentors[1].id,
//                 menteeId: mentees[1].id,
//                 dateTime: new Date('2025-01-18T04:48:47.102Z'),
//                 duration: 60,
//                 payment: 285.24,
//                 status: BookingStatus.PENDING, // Use enum value here
//             },
//             {
//                 mentorId: mentors[2].id,
//                 menteeId: mentees[2].id,
//                 dateTime: new Date('2023-01-12T17:45:36.096Z'),
//                 duration: 60,
//                 payment: 212.23,
//                 status: BookingStatus.COMPLETED, // Use enum value here
//             },
//             {
//                 mentorId: mentors[3].id,
//                 menteeId: mentees[3].id,
//                 dateTime: new Date('2025-01-20T18:38:37.725Z'),
//                 duration: 60,
//                 payment: 452.01,
//                 status: BookingStatus.PENDING, // Use enum value here
//             },
//             {
//                 mentorId: mentors[4].id,
//                 menteeId: mentees[4].id,
//                 dateTime: new Date('2025-01-18T21:22:03.470Z'),
//                 duration: 60,
//                 payment: 252.03,
//                 status: BookingStatus.PENDING, // Use enum value here
//             },
//         ];

//         // Create consistent bookings
//         await Promise.all(
//             bookings.map(async (booking) => {
//                 await prisma.booking.create({
//                     data: booking,
//                 });
//             })
//         );

//         console.log("Consistent bookings created successfully!");
//     } catch (error) {
//         console.error("Error creating consistent bookings:", error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// seedConsistentBookings();

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//     // Seed Services
//     const services = [
//         { name: '1:1 Sessions', description: 'Personalized sessions.', mentorId: 1 }, // Example mentorId
//         { name: 'Quick Chat', description: 'Short discussions & tips.', mentorId: 1 }, // Example mentorId
//         { name: 'Priority DMs', description: 'Quick Response.', mentorId: 1 }, // Example mentorId
//         { name: 'Webinars', description: 'Interactive workshops for groups.', mentorId: 1 }, // Example mentorId
//     ];

//     for (const service of services) {
//         // Check if service exists by name (not ideal since it's not unique)
//         const existingService = await prisma.service.findFirst({
//             where: { name: service.name }, // Use findFirst since name is not unique
//         });

//         if (existingService) {
//             // If it exists, update it
//             await prisma.service.update({
//                 where: { id: existingService.id }, // Use the existing service's id
//                 data: {
//                     description: service.description,
//                 },
//             });
//         } else {
//             // If it does not exist, create it
//             await prisma.service.create({
//                 data: service,
//             });
//         }
//     }

//     console.log('Seeding completed!');
// }

// main()
//     .catch(e => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//     // Remove duplicate Domains
//     const domains = await prisma.domain.findMany();
//     const uniqueDomains = new Set();

//     for (const domain of domains) {
//         if (uniqueDomains.has(domain.name)) {
//             // If domain name already exists, delete the duplicate
//             await prisma.domain.delete({
//                 where: { id: domain.id },
//             });
//             console.log(`Deleted duplicate domain: ${domain.name}`);
//         } else {
//             uniqueDomains.add(domain.name);
//         }
//     }

//     // Remove duplicate Services
//     const services = await prisma.service.findMany();
//     const uniqueServices = new Map();

//     for (const service of services) {
//         const key = `${service.name}-${service.mentorId}`; // Use name and mentorId to identify duplicates

//         if (uniqueServices.has(key)) {
//             // If service with the same name and mentorId already exists, delete the duplicate
//             await prisma.service.delete({
//                 where: { id: service.id },
//             });
//             console.log(`Deleted duplicate service: ${service.name} for mentor ID: ${service.mentorId}`);
//         } else {
//             uniqueServices.set(key, service);
//         }
//     }

//     console.log('Duplicate removal completed!');
// }

// main()
//     .catch(e => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//     // Delete all Services
//     await prisma.service.deleteMany({});
//     console.log('All services have been deleted.');

//     // Delete all Domains
//     await prisma.domain.deleteMany({});
//     console.log('All domains have been deleted.');

//     console.log('Deletion completed!');
// }

// main()
//     .catch(e => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllMentorProfiles = async() => {
    const result = await prisma.availability.findMany();
    console.log(result);
};

getAllMentorProfiles();
