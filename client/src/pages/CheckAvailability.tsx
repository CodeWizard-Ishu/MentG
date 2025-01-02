import React, { useState, useEffect, useMemo } from "react";
import { Calendar } from "../components/ui/calendar"; // Import your custom Calendar component
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import BACKEND_URL from "../endpoint"; // Adjust your endpoint import
import Spinner from "../components/ui/Spinner";
import useBookingStore from "../Hooks/useBookingStore";

// Types
type AvailabilitySlot = {
  id: number;
  mentorId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

type AvailabilityProps = {
  // onSubmit?: (date: Date, timeSlot: TimeSlot) => void; // Made optional
  maxBookingDays?: number;
};

const CheckAvailability: React.FC<AvailabilityProps> = ({
  maxBookingDays = 30,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [error, setError] = useState<string>("");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const { setSelectedSlot } = useBookingStore();

  const navigate = useNavigate();
  const { mentorId } = useParams(); // Get mentorId from URL parameters

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/availability/${mentorId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setAvailability(result.data);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setError("Failed to load mentor's availability. Please try again later.");
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [mentorId]); // Fetch availability whenever mentorId changes

  // Calculate date bounds
  const dateBounds = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxBookingDays);
    return {
      minDate: today,
      maxDate,
    };
  }, [maxBookingDays]);

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const dayName = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    return !availability.some(slot => slot.dayOfWeek === dayName);
  };

  // Generate time slots for the selected date
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    
    if (!selectedDate) return slots;

    // Find if the selected day has availability
    const selectedDayName = selectedDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    const availableDay = availability.find(
      slot => slot.dayOfWeek === selectedDayName
    );

    if (!availableDay) return slots;

    // Parse the start and end times
    const startHour = new Date(availableDay.startTime).getUTCHours();
    const endHour = new Date(availableDay.endTime).getUTCHours();

    // Generate hourly slots between start and end time
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

      slots.push({
        id: `slot-${hour}`,
        startTime,
        endTime,
        available: true
      });
    }

    return slots;
  }, [selectedDate, availability]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setError("");
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) {
      setError("This time slot is not available");
      return;
    }

    setSelectedTimeSlot(slot);
    setError("");
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (!selectedDate || !selectedTimeSlot) {
      setError("Please select both date and time slot");
      return;
    }

    setSelectedSlot({
      date: selectedDate,
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime
    });

    setSubmitting(false);
    navigate(`/booking/${mentorId}`);
  };

  // Helper function to format time
  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}:00+05:30`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading availability...</p>
        </div>
      </div>
    );
  }

  // Render the component
  return (
    <div className="min-h-screen bg-sky-200">
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        <Card className="mt-16 max-w-3xl mx-auto">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              Book Your Appointment
            </CardTitle>
            <p className="text-center text-gray-600">
              Book up to {maxBookingDays} days in advance
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const isBefore = date < dateBounds.minDate;
                    const isAfter = date > dateBounds.maxDate;
                    const isUnavailable = isDateDisabled(date);
                    return isBefore || isAfter || isUnavailable;
                  }}
                  className='rounded-md border'
                />
              </div>

              {/* Time Slots Section */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedDate
                    ? `Available Time Slots for ${selectedDate.toLocaleDateString(
                        "en-IN"
                      )} (IST)`
                    : "Please select a date to view available time slots"}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDate && timeSlots.length > 0 ? (
                    timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={
                          selectedTimeSlot?.id === slot.id
                            ? "default"
                            : "outline"
                        }
                        disabled={!slot.available}
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={`flex items-center justify-center p-2 ${
                          !slot.available ? "bg-gray-100" : ""
                        } ${
                          selectedTimeSlot?.id === slot.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </span>
                      </Button>
                    ))
                  ) : selectedDate ? (
                    <p className="text-gray-500 text-center p-4">
                      No available time slots for this date
                    </p>
                  ) : (
                    <p className="text-gray-500 text-center p-4">
                      Select a date to view available time slots
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Selected Details */}
            {selectedDate && selectedTimeSlot && (
              <div className="mt-4 p-4 bg-gray-300 rounded-lg">
                <h4 className="font-semibold">Selected Slot:</h4>
                <p>
                  Date: {selectedDate.toLocaleDateString("en-IN")}
                  <br />
                  Time: {formatTime(selectedTimeSlot.startTime)} -{" "}
                  {formatTime(selectedTimeSlot.endTime)} IST
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmit}
                disabled={!selectedDate || !selectedTimeSlot}
                className="w-full md:w-auto bg-[#08286b] hover:bg-[#08276bcc]"
              >
                {isSubmitting ? <Spinner/> : "Confirm Slot"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckAvailability;
