/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import BACKEND_URL from "../endpoint";
import { Bounce, toast } from "react-toastify";
import Spinner from "../components/ui/Spinner";
import CalendarIntegration from "./CalenderConnection";

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

interface DaySchedule {
  enabled: boolean;
  timeSlot: TimeSlot;
}

interface WeeklySchedule {
  [key: string]: DaySchedule;
}

interface ApiTimeSlot {
  dayOfWeek: string;
  enabled: boolean;
  startTime: string; // ISO string in UTC
  endTime: string; // ISO string in UTC
}

interface CalendarProps {
  onCalendarConnectionChange?: (isConnected: boolean) => void;
}

const DEFAULT_START_TIME = "09:00";
const DEFAULT_END_TIME = "20:00";
const EMPTY_TIME = "--:--";
const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30

// Helper functions for date-time conversion
const toUTCDate = (timeString: string, dayOfWeek: string): Date => {
  const now = new Date();
  const [hours, minutes] = timeString.split(":").map(Number);

  // Get the date of the next occurrence of this day
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDay = daysOfWeek.indexOf(dayOfWeek);
  const currentDay = now.getUTCDay();
  const daysToAdd = (targetDay + 7 - currentDay) % 7;

  // Create UTC date
  const date = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysToAdd,
      hours,
      minutes
    )
  );

  // Convert IST input to UTC for storage
  return new Date(date.getTime() - IST_OFFSET);
};

const fromUTCDate = (date: Date): string => {
  if (!date || date.getTime() === 0) return EMPTY_TIME;

  // Convert UTC to IST for display
  const istDate = new Date(date.getTime() + IST_OFFSET);
  const hours = istDate.getUTCHours().toString().padStart(2, "0");
  const minutes = istDate.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const generateTimeOptions = (): string[] => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }
  return times;
};

const TimeSelect: React.FC<{
  value: Date;
  onChange: (value: Date) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled }) => {
  const times = generateTimeOptions();

  return (
    <select
      value={fromUTCDate(value)}
      onChange={(e) => {
        const timeString = e.target.value;
        if (timeString === EMPTY_TIME) {
          onChange(new Date(0));
        } else {
          const newDate = toUTCDate(timeString, "Monday");
          onChange(newDate);
        }
      }}
      disabled={disabled}
      className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 disabled:opacity-50"
    >
      <option value={EMPTY_TIME}>--:--</option>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

const Calendar: React.FC<CalendarProps> = ({ onCalendarConnectionChange }) => {
  const initialSchedule: WeeklySchedule = {
    Monday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Tuesday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Wednesday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Thursday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Friday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Saturday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
    Sunday: {
      enabled: false,
      timeSlot: { startTime: new Date(0), endTime: new Date(0) },
    },
  };

  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule);
  const [, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchAvailability = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/getAvailability/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Failed to fetch availability", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        return;
      }

      const responseData = await response.json();
      const data: ApiTimeSlot[] = responseData.data;

      if (!Array.isArray(data)) {
        throw new Error(
          "Expected an array in the 'data' field of the response."
        );
      }

      const newSchedule = { ...initialSchedule };

      data.forEach(({ dayOfWeek, startTime, endTime, enabled }) => {
        const day =
          dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
        newSchedule[day] = {
          enabled: enabled,
          timeSlot: {
            startTime: new Date(startTime), // API returns UTC timestamp
            endTime: new Date(endTime), // API returns UTC timestamp
          },
        };
      });

      setSchedule(newSchedule);
    } catch (err) {
      toast.error(`${err}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        timeSlot: !prev[day].enabled
          ? {
              startTime: toUTCDate(DEFAULT_START_TIME, day),
              endTime: toUTCDate(DEFAULT_END_TIME, day),
            }
          : {
              startTime: new Date(0),
              endTime: new Date(0),
            },
      },
    }));
    setSaved(false);
  };

  const updateTime = (
    day: string,
    type: "startTime" | "endTime",
    value: Date
  ) => {
    setSchedule((prev) => {
      const currentDaySchedule = prev[day];

      // Validate end time is after start time
      if (
        type === "endTime" &&
        value.getTime() !== 0 &&
        currentDaySchedule.timeSlot.startTime.getTime() !== 0 &&
        value <= currentDaySchedule.timeSlot.startTime
      ) {
        toast.warning("End time must be after start time.", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        return prev;
      }

      // Validate start time is before end time
      if (
        type === "startTime" &&
        value.getTime() !== 0 &&
        currentDaySchedule.timeSlot.endTime.getTime() !== 0 &&
        value >= currentDaySchedule.timeSlot.endTime
      ) {
        toast.warning("Start time must be before end time.", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
        return prev;
      }

      return {
        ...prev,
        [day]: {
          ...currentDaySchedule,
          timeSlot: {
            ...currentDaySchedule.timeSlot,
            [type]: value,
          },
        },
      };
    });
    setSaved(false);
  };

  const applyToAll = () => {
    const enabledSchedules = Object.entries(schedule)
      .filter(([_, daySchedule]) => daySchedule.enabled)
      .map(([_, daySchedule]) => daySchedule.timeSlot);

    if (enabledSchedules.length === 0) return;

    setSchedule((prev) => {
      const newSchedule = { ...prev };
      Object.keys(newSchedule).forEach((day) => {
        if (!newSchedule[day].enabled) {
          newSchedule[day] = {
            ...newSchedule[day],
            timeSlot: { ...enabledSchedules[0] },
          };
        }
      });
      return newSchedule;
    });
    setSaved(false);
  };

  const handleSave = async () => {

    if (!isCalendarConnected) {
      toast.error("Please connect your calendar account before saving availability.", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      return;
    }

    setSubmitting(true);
    try {
      const availabilityData = Object.entries(schedule).map(
        ([day, { enabled, timeSlot }]) => ({
          dayOfWeek: day.toUpperCase(),
          enabled,
          startTime: timeSlot.startTime.toISOString(), // Sends UTC timestamp to API
          endTime: timeSlot.endTime.toISOString(), // Sends UTC timestamp to API
        })
      );

      const response = await fetch(
        `${BACKEND_URL}/api/mentor/updateAvailability/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availability: availabilityData,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Your changes have been saved successfully!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      toast.error(`Failed to save schedule: ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <CalendarIntegration
        onConnectionChange={(isConnected) => {
          setIsCalendarConnected(isConnected);
          onCalendarConnectionChange?.(isConnected);
        }}
      />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <Clock className="w-6 h-6" />
            Set Your Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(schedule).map(([day, { enabled, timeSlot }]) => (
              <div
                key={day}
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <label className="flex items-center space-x-2 min-w-[120px]">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleDay(day)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="font-medium">{day}</span>
                </label>
                <div className="flex items-center space-x-2 flex-1">
                  <TimeSelect
                    value={timeSlot.startTime}
                    onChange={(value) => updateTime(day, "startTime", value)}
                    disabled={!enabled}
                  />
                  <span className="text-gray-500">-</span>
                  <TimeSelect
                    value={timeSlot.endTime}
                    onChange={(value) => updateTime(day, "endTime", value)}
                    disabled={!enabled}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
          <Button
            variant="ghost"
            className="text-green-500 hover:text-green-600 hover:bg-green-50"
            onClick={applyToAll}
          >
            Apply To All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Calendar;
