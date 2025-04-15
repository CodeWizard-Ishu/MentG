import { useState } from 'react';
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";

interface BookingDetails {
  mentorUsername: string;
  menteeId: string;
  dateTime: Date;
  duration: number;
  serviceName: string;
  serviceDescription: string;
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
          mentorUsername: bookingDetails.mentorUsername,
          dateTime: bookingDetails.dateTime.toISOString(),
          duration: bookingDetails.duration,
          serviceName: bookingDetails.serviceName,
          serviceDescription: bookingDetails.serviceDescription,
          menteeEmail: bookingDetails.menteeEmail,
          mentorName: bookingDetails.mentorName,
          menteeName: bookingDetails.menteeName
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      const data = await response.json();
      return data.meetLink;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
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