import React, { useState } from "react";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";

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
    Sunday: {
      enabled: true,
      timeSlot: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME },
    },
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
      enabled: true,
      timeSlot: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME },
    },
  });

  const [saved, setSaved] = useState(false);

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
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlot: {
          ...prev[day].timeSlot,
          [type]: value,
        },
      },
    }));
    setSaved(false);
  };

  const applyToAll = () => {
    // Get all enabled days' schedules
    const enabledSchedules = Object.entries(schedule)
      .filter(([_, daySchedule]) => daySchedule.enabled)
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

  const handleSave = () => {
    // Here you would typically make an API call to save the schedule
    console.log("Saving schedule:", schedule);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
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
      {saved && (
        <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>
            Your changes has been saved successfully!
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default Calender;
