import { getPrismaClient } from "../../prisma";

const prisma = getPrismaClient();

export const getBookingFormData = async (req: any, res:any) => {
  const { id, username, name } = req.params;

  const parsedUsername = String(username);
  const parsedId = parseInt(id, 10);
  const parsedName = String(name);

  try {
    const menteeProfile = await prisma.menteeProfile.findUnique({
      where: { userId : parsedId },
      include: { user: true }
    })
    if(!menteeProfile) return res.status(404).json({ success: false, message: "Mentee not found!"});

    const mentorId = await prisma.user.findUnique({
      where: { username: parsedUsername }
    })
    if(!mentorId) return res.status(404).json({ success: false, message: "Mentor not found!"});
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: mentorId.id },
      include: { services: true } 
    })
    if(!mentorProfile) return res.status(404).json({ success: false, message: "Mentor Profile not found!"});
  
    const service = mentorProfile.services.find((service) => service.name === parsedName);
    if(!service) return res.status(404).json({ success: false, message: "Service not found!"});

    res.status(200).json({
      Mentee: {
        email: menteeProfile.user.email,
        firstName: menteeProfile.user.firstName,
        lastName: menteeProfile.user.lastName,
        phoneNumber: menteeProfile.phoneNumber
      },
      service: {
        price: service.price
      }
    })
  } catch (error) {
    
  }

}
