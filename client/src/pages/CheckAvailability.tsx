import React, { useState, useMemo } from "react";
import { Calendar } from "../components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// Types
type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

type AvailabilityProps = {
  onSubmit?: (date: Date, timeSlot: TimeSlot) => void; // Made optional
  maxBookingDays?: number;
};

const CheckAvailability: React.FC<AvailabilityProps> = ({
  onSubmit = (date, timeSlot) => console.log("Booking:", { date, timeSlot }),
  maxBookingDays = 30, // Extended to 30 days by default
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Calculate date bounds once using useMemo
  const dateBounds = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxBookingDays);

    return {
      minDate: today,
      maxDate: maxDate,
    };
  }, [maxBookingDays]);

  // Generate time slots for the selected date
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

      // Generate availability based on date and time
      const isAvailable = selectedDate
        ? // Add more sophisticated availability logic here if needed
          Math.random() > 0.3
        : false;

      slots.push({
        id: `slot-${hour}`,
        startTime,
        endTime,
        available: isAvailable,
      });
    }

    return slots;
  }, [selectedDate]); // Regenerate slots only when date changes

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
    if (!selectedDate || !selectedTimeSlot) {
      setError("Please select both date and time slot");
      return;
    }

    const selectedDateTime = new Date(selectedDate);
    if (
      selectedDateTime < dateBounds.minDate ||
      selectedDateTime > dateBounds.maxDate
    ) {
      setError(`Please select a date within the next ${maxBookingDays} days`);
      return;
    }
    navigate("/booking");
    onSubmit(selectedDate, selectedTimeSlot);
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}:00+05:30`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

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
                  disabled={{
                    before: dateBounds.minDate,
                    after: dateBounds.maxDate,
                  }}
                  className="rounded-md border"
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
                  {selectedDate &&
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
                    ))}
                  {!selectedDate && (
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
                Confirm Slot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckAvailability;
