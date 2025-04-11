import { getPrismaClient } from "../../prisma";
import { google } from "googleapis";
import { sendBookingDetails } from "../mailer";
import { getAuthenticatedGoogleClient } from "../mentors/connectCalendar";

const prisma = getPrismaClient();

export const createCalendarEvent = async (req: any, res: any) => {
  try {
    const {
      mentorUsername,
      dateTime,
      duration,
      serviceName,
      serviceDescription,
      menteeEmail,
      mentorName,
      menteeName,
    } = req.body;

    if(serviceName === "Quick Chat" || serviceName === "Priority DMs" || serviceName === "Webinars"){
      return res.status(400).json({ success: false, message: "Service cannot be booked!"});
    }

    const mentor = await prisma.user.findUnique({
      where: { username: mentorUsername}
    })
    if(!mentor) return res.status(404).json({ success: false, message: "Mentor not found!"});

    const oauth2Client = await getAuthenticatedGoogleClient(parseInt(String(mentor.id), 10));

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Creating calendar event
    const endTime = new Date(new Date(dateTime).getTime() + duration * 60000);

    const event = {
      summary: `MentG - ${serviceName}`,
      description: serviceDescription,
      start: {
        dateTime: new Date(dateTime).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: [
        {email: menteeEmail, responseStatus: 'needsAction'},
        {email: mentor.email, responseStatus: 'needsAction', organizer: true}
      ],
      conferenceData: {
        createRequest: {
          requestId: `mentg-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },

      organizer: {
        email: mentor.email,
        self: true
      },

      creator: {
        self: true
      }
    };

    const calendarEvent = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: event
    });

    // Send confirmation emails to mentor & mentee
    sendBookingDetails(
      mentor.email,
      menteeEmail,
      serviceName,
      serviceDescription,
      mentorName,
      menteeName,
      dateTime,
      duration,
      calendarEvent.data.hangoutLink
    );

    res.status(200).json({ message: "Event created successfully!", meetLink: calendarEvent.data.hangoutLink });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    res.status(500).json({ status:false, message: "Failed to create calendar event" });
  }
};
