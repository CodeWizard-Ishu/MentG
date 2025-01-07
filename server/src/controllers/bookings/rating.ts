import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const submitRating = async (req:any, res:any) => {
    const { mentorId, menteeId, score, feedback } = req.body;

    try {
        // Validate score
        if (score < 1 || score > 5) {
            return res.status(400).json({ error: 'Score must be between 1 and 5.' });
        }

        // Create new rating entry in the database
        const newRating = await prisma.rating.create({
            data: {
                mentorId,
                menteeId,
                score,
                feedback,
            },
        });

        return res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while submitting the rating.' });
    }
};