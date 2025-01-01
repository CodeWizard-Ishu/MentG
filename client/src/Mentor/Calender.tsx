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

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  enabled: boolean;
  timeSlot: TimeSlot;
}

interface WeeklySchedule {
  [key: string]: DaySchedule;
}

const DEFAULT_START_TIME = "09:00";
const DEFAULT_END_TIME = "20:00";
const EMPTY_TIME = "--:--";

const TimeSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled }) => {
  const times = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

const Calender = () => {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    Monday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Tuesday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Wednesday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Thursday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Friday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Saturday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
    Sunday: {
      enabled: false,
      timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
    },
  });

  const [, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem('userToken')??"";

  const fetchAvailability = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mentor/getAvailability/${userId}`,{
        method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
      });
      if (!response.ok) {
        // throw new Error("Failed to fetch availability");
        toast.error("Failed to fetch availability", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        })
      }
  
      const responseData = await response.json();
      // console.log("Raw response data:", responseData);
  
      const data = responseData.data; // Adjust based on the actual structure of responseData
      // console.log("Processed data array:", data);
  
      if (!Array.isArray(data)) {
        throw new Error("Expected an array in the 'data' field of the response.");
      }
  
      const newSchedule: WeeklySchedule = {
        Monday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Tuesday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Wednesday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Thursday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Friday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Saturday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
        Sunday: {
          enabled: false,
          timeSlot: { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
        },
      };
  
      data.forEach(({ dayOfWeek, startTime, endTime }) => {
        const day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
        newSchedule[day] = {
          enabled: true,
          timeSlot: {
            startTime: startTime.split("T")[1].slice(0, 5),
            endTime: endTime.split("T")[1].slice(0, 5),
          },
        };
      });
  
      setSchedule(newSchedule);
    } catch (err) {
      // console.error("Error fetching availability:", err);
      toast.error(`${err}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })
    }
    finally{
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
          ? { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME }
          : { startTime: EMPTY_TIME, endTime: EMPTY_TIME },
      },
    }));
    setSaved(false);
  };

  const updateTime = (
    day: string,
    type: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) => {
      const currentDaySchedule = prev[day];

      // Validate end time is after start time
      if (
        type === "endTime" &&
        value !== EMPTY_TIME &&
        currentDaySchedule.timeSlot.startTime !== EMPTY_TIME &&
        value <= currentDaySchedule.timeSlot.startTime
      ) {
        // alert("End time must be after start time.");
        toast.warning("End time must be after start time.",{
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        })
        return prev; // Return previous state if validation fails
      }
      // Validate start time is before end time
      if (
        type === "startTime" &&
        value !== EMPTY_TIME &&
        currentDaySchedule.timeSlot.endTime !== EMPTY_TIME &&
        value >= currentDaySchedule.timeSlot.endTime
      ) {
        // alert("End time must be after start time.");
        toast.warning("Start time must be before end time.",{
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        })
        return prev; // Return previous state if validation fails
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
    // Get all enabled days' schedules
    const enabledSchedules = Object.entries(schedule)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, daySchedule]) => daySchedule.enabled)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, daySchedule]) => daySchedule.timeSlot);

    if (enabledSchedules.length === 0) return;

    // Apply to all unchecked days
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      Object.keys(newSchedule).forEach((day) => {
        if (!newSchedule[day].enabled) {
          newSchedule[day] = {
            ...newSchedule[day],
            timeSlot: { ...enabledSchedules[0] }, // Apply the first enabled schedule
          };
        }
      });
      return newSchedule;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/updateAvailability`,
        {
          // Adjust the URL as needed
          method: "POST",
          headers: {
            Authorization :token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mentorId: userId, // Replace with actual mentor ID
            availability: Object.entries(schedule).map(
              ([day, { enabled, timeSlot }]) => ({
                dayOfWeek: day.toUpperCase(), // Convert day to uppercase to match enum
                enabled,
                timeSlot,
              })
            ),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const result = await response.json();
      // console.log("Schedule saved successfully:", result);
      toast.success("Your changes have been saved successfully!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })

      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Reset saved state after a short delay
    } catch (error) {
      // console.error("Error saving schedule:", error);
      toast.error(`Failed to save schedule, ${error}`,{
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })
    }
  };

  if(loading) return <Spinner/>

  return (
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
          variant="default"
          className="bg-black text-white hover:bg-gray-800"
          onClick={handleSave}
        >
          Save Changes
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
  );
};

export default Calender;
