import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getServiceDetail = async (req: any, res: any) => {
  const { mentorId,name } = req.params;

  try {
    const parsedMentorId = parseInt(mentorId);
    const mProfile = await prisma.mentorProfile.findUnique({
      where: { userId: parsedMentorId },
    });
    const id = mProfile?.id;

    const service = await prisma.service.findFirst({
        where : {
            mentorId : id,
            name : name
        }
    })

    res.status(200).json({ data: service });
  } catch (error) {
    console.error("Error retrieving prices:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving prices." });
  }
};
