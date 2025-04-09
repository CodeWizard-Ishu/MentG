import { getPrismaClient } from "../../prisma";
import { google } from "googleapis";
import { sendBookingDetails } from "../mailer";
import { getAuthenticatedGoogleClient } from "../mentors/connectCalendar";

const prisma = getPrismaClient();

export const createCalendarEvent = async (req: any, res: any) => {
  try {
    const {
      mentorId,
      dateTime,
      duration,
      serviceName,
      serviceDescription,
      mentorEmail,
      menteeEmail,
      mentorName,
      menteeName,
    } = req.body;

    if(serviceName === "Quick Chat" || serviceName === "Priority DMs" || serviceName === "Webinars"){
      throw new Error("Service cannot be booked");
    }

    const oauth2Client = await getAuthenticatedGoogleClient(parseInt(mentorId));

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Create calendar event
    const endTime = new Date(new Date(dateTime).getTime() + duration * 60000);

    const event = {
      summary: `MentG : ${serviceName}`,
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
        {email: mentorEmail, responseStatus: 'needsAction', organizer: true}
      ],
      conferenceData: {
        createRequest: {
          requestId: `mentg-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },

      organizer: {
        email: mentorEmail,
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

    // Send confirmation emails
    sendBookingDetails(
      mentorEmail,
      menteeEmail,
      serviceName,
      serviceDescription,
      mentorName,
      menteeName,
      dateTime,
      duration,
      calendarEvent.data.hangoutLink
    );

    res.status(200).json({
      message: "Calendar event created successfully",
      meetLink: calendarEvent.data.hangoutLink,
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    res.status(500).json({ error: "Failed to create calendar event" });
  }
};
