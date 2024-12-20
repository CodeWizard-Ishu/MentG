import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const updateAvailablity = async (req:any, res:any) => {
    const { mentorId, availability } = req.body;

    try {
        const parsedMentorId = parseInt(mentorId);
        // Delete existing availability for the mentor
        await prisma.availability.deleteMany({
            where: { id: parsedMentorId},
        });

        // Create new availability entries
        const availabilityEntries = await prisma.availability.createMany({
            data: availability.map((option:any) => ({
                mentorId,
                dayOfWeek: option.dayOfWeek,
                startTime: new Date(`1970-01-01T${option.startTime}:00Z`),
                endTime: new Date(`1970-01-01T${option.endTime}:00Z`),
            })),
        });

        res.status(201).json(availabilityEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving availability.' });
    }
};

export const getAvailablity = async (req:any, res:any) => {
    const {mentorId} = req.params;

    try {
        const parsedMentorId = parseInt(mentorId);
        const availability = await prisma.availability.findMany({
            where: { id:parsedMentorId },
        });

        res.status(200).json(availability);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving availability.' });
    }
};