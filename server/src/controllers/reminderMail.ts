import { getPrismaClient } from "../prisma";
import { transporter } from "./mailer";
import dotenv from "dotenv";

const prisma = getPrismaClient();
dotenv.config();

interface ProfileStatus {
  hasServices: boolean;
  hasCalendar: boolean;
  hasAvailability: boolean;
  hasProfileDetails: boolean;
}

async function checkProfileStatus(mentorId: number): Promise<ProfileStatus> {
  const profile = await prisma.mentorProfile.findUnique({
    where: { userId: mentorId },
    include: {
      services: true,
      calendarConnections: true,
      availability: true,
      domains: true,
    },
  });

  if (!profile) throw new Error("Mentor profile not found");

  return {
    hasServices: profile.services.length > 0 && profile.domains.length > 0,
    hasCalendar: profile.calendarConnections.length > 0,
    hasAvailability: profile.availability.length > 0,
    hasProfileDetails: !!(
      profile.bio &&
      profile.profilePicture &&
      profile.linkedin
    ),
  };
}

function generateEmailContent(
  mentorName: string,
  status: ProfileStatus
): string {
  const incompleteItems: string[] = [];

  if (!status.hasServices) {
    incompleteItems.push(`
      <li style="margin-bottom: 15px;">
        <strong>Domain & Services Setup:</strong> Choose your expertise domains (up to 3) and add your mentoring services
      </li>`);
  }

  if (!status.hasCalendar) {
    incompleteItems.push(`
      <li style="margin-bottom: 15px;">
        <strong>Calendar Connection:</strong> Connect your Google Calendar for session bookings
      </li>`);
  }

  if (!status.hasAvailability) {
    incompleteItems.push(`
      <li style="margin-bottom: 15px;">
        <strong>Availability Settings:</strong> Set your weekly availability for mentoring sessions
      </li>`);
  }

  if (!status.hasProfileDetails) {
    incompleteItems.push(`
      <li style="margin-bottom: 15px;">
        <strong>Profile Details:</strong> Add your professional photo, bio and LinkedIn profile link
      </li>`);
  }

  return `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Complete Your MentG Profile</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.5; color: #2D3748; background-color: #EDF2F7;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #EDF2F7;">
            <tr>
                <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <tr>
                            <td align="center" style="padding: 30px 20px; background-color: #08286b; border-radius: 12px 12px 0 0;">
                                <img src="https://res.cloudinary.com/dophukeh5/image/upload/v1739828250/logo_nrrg9b.png" alt="MentG Logo" width="150" style="display: block; margin: 0 auto;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 20px;">
                                <h1 style="margin: 0 0 20px 0; color: #1A237E; font-size: 28px; font-weight: 700; text-align: center;">Complete Your Mentor Profile</h1>
                                
                                <p style="margin: 0 0 20px 0; font-size: 15px;">Dear ${mentorName},</p>
                                
                                <p style="margin: 0 0 25px 0; font-size: 15px; color: #4A5568;">We noticed that there are a few missing details in your MentG profile. Completing these items will help mentees better understand your expertise and make it easier for them to connect with you.</p>
                                
                                <div style="background-color: #F7FAFC; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                                    <h2 style="margin: 0 0 20px 0; color: #2D3748; font-size: 17px;">Please complete the following items:</h2>
                                    <ol style="margin: 0; padding-left: 25px; color: #4A5568;">
                                        ${incompleteItems.join("\n")}
                                    </ol>
                                </div>
                                
                                <div style="background-color: #FFF5F5; border-left: 4px solid #E53E3E; border-radius: 4px; padding: 20px; margin-bottom: 30px;">
                                    <p style="margin: 0; color: #C53030; font-size: 14px;">
                                        <strong>Important Note:</strong> To enable the booking system, please ensure that you have connected your Google Calendar and set your availability. Mentees will only be able to book 1:1 sessions after this step is completed.
                                    </p>
                                </div>

                                <p style="margin: 0 0 25px 0; font-size: 15px; color: #4A5568;">Once your profile is complete, mentees will be able to view your profile and book 1:1 sessions with you. This is an excellent opportunity to share your expertise and make a meaningful impact in your field.</p>

                                <!-- CTA Button -->
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 35px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="https://mentg.in/dashboard" style="background-color: #08286b; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; transition: background-color 0.3s ease;">Complete Your Profile</a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 12px 0; color: #4A5568; font-size: 15px;">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
                                
                                <p style="margin: 0 0 12px 0; color: #4A5568; font-size: 15px;">Best regards,<br/>MentG Team</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #F7FAFC; border-radius: 0 0 12px 12px; padding: 30px 40px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <p style="margin: 0; color: #4A5568; font-size: 14px;">Need assistance? Contact us at:</p>
                                            <a href="mailto:support@mentg.in" style="color: #1A237E; text-decoration: none; font-weight: 600; font-size: 14px;">support@mentg.in</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <div>
                                                <p style="margin: 20px 0 0 0; color: #718096; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} MentG. All rights reserved.</p>

                                                <a href="https://www.linkedin.com/company/mentg" style="color: #1A237E; text-decoration: none; margin: 0 5px; font-size: 14px;">LinkedIn</a>
                                                <span style="color: #CBD5E0;">•</span>
                                                <a href="https://www.instagram.com/mentg.in" style="color: #1A237E; text-decoration: none; margin: 0 5px; font-size: 14px;">Instagram</a>
                                                <span style="color: #CBD5E0;">•</span>
                                                <a href="https://x.com/mentg_in" style="color: #1A237E; text-decoration: none; margin: 0 5px; font-size: 14px;">X (Twitter)</a>
                                                <span style="color: #CBD5E0;">•</span>
                                                <a href="https://www.youtube.com/@MentG_in" style="color: #1A237E; text-decoration: none; margin: 0 5px; font-size: 14px;">YouTube</a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
}

export async function sendReminderEmails() {
  try {
    // Get all mentor users
    const mentors = await prisma.user.findMany({
      where: {
        isMentor: true,
        isActive: true,
      },
      include: {
        mentorProfile: true,
      },
    });

    for (const mentor of mentors) {
      try {
        const status = await checkProfileStatus(mentor.id);

        // Only send email if any section is incomplete
        if (
          !status.hasServices ||
          !status.hasCalendar ||
          !status.hasAvailability ||
          !status.hasProfileDetails
        ) {
          const mailOptions = {
            from: "MentG Team <info@mentg.in>",
            to: mentor.email,
            subject: "Need your attention here!",
            html: generateEmailContent(
              `${mentor.firstName} ${mentor.lastName}`,
              status
            ),
          };

          await transporter.sendMail(mailOptions);
          console.log(`Reminder email sent to ${mentor.email}`);
        }
      } catch (error) {
        console.error(`Error processing mentor ${mentor.id}:`, error);
        continue; // Continue with next mentor even if one fails
      }
    }
  } catch (error) {
    console.error("Error in sendTargetedEmails:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
