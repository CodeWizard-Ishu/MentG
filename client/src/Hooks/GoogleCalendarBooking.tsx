import { useState } from 'react';
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";

interface BookingDetails {
  mentorId: string;
  menteeId: string;
  dateTime: Date;
  duration: number;
  serviceName: string;
  serviceDescription: string;
  mentorEmail: string;
  menteeEmail: string;
  mentorName: string;
  menteeName: string;
}

const useGoogleCalendarBooking = () => {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const token = localStorage.getItem("userToken") ?? "";

  const createCalendarEvent = async (bookingDetails: BookingDetails) => {
    setIsCreatingEvent(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/calendar/create-event/${bookingDetails.menteeId}`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorId: bookingDetails.mentorId,
          dateTime: bookingDetails.dateTime.toISOString(),
          duration: bookingDetails.duration,
          serviceName: bookingDetails.serviceName,
          serviceDescription: bookingDetails.serviceDescription,
          mentorEmail: bookingDetails.mentorEmail,
          menteeEmail: bookingDetails.menteeEmail,
          mentorName: bookingDetails.mentorName,
          menteeName: bookingDetails.menteeName
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to create calendar event');
      }

      const data = await response.json();
      return data.meetLink;

    } catch (error) {
      toast.error(`Error creating calendar event: ${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsCreatingEvent(false);
    }
  };

  return {
    createCalendarEvent,
    isCreatingEvent
  };
};

export default useGoogleCalendarBooking;