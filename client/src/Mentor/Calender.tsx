import React, { useState } from "react";

interface AvailabilityOption {
  day: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

const Calender: React.FC = () => {
  const [availabilityOptions, setAvailabilityOptions] = useState<
    AvailabilityOption[]
  >([
    {
      day: "Saturday",
      available: true,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Sunday",
      available: true,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Monday",
      available: false,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Tuesday",
      available: false,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Wednesday",
      available: false,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Thursday",
      available: false,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
    {
      day: "Friday",
      available: false,
      startTime: "09:00 AM",
      endTime: "08:00 PM",
    },
  ]);

  const handleToggleAvailability = (index: number) => {
    setAvailabilityOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index].available = !updatedOptions[index].available;
      return updatedOptions;
    });
  };

  const handleTimeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailabilityOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index][field] = value;
      return updatedOptions;
    });
  };

  const handleApplyToAll = (
    available: boolean,
    startTime: string,
    endTime: string
  ) => {
    setAvailabilityOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        available,
        startTime,
        endTime,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6 text-black">
          Set Your Availability
        </h1>

        <div className="space-y-4">
          {availabilityOptions.map((option, index) => (
            <div key={option.day} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={option.available}
                  onChange={() => handleToggleAvailability(index)}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700 font-medium">{option.day}</span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={option.startTime}
                  onChange={(e) =>
                    handleTimeChange(index, "startTime", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(12).keys()].map((hour) => (
                    <option
                      key={hour}
                      value={`${(hour + 1).toString().padStart(2, "0")}:00 AM`}
                    >
                      {hour + 1}:00 AM
                    </option>
                  ))}
                  {[...Array(12).keys()].map((hour) => (
                    <option
                      key={hour + 12}
                      value={`${(hour + 1).toString().padStart(2, "0")}:00 PM`}
                    >
                      {hour + 1}:00 PM
                    </option>
                  ))}
                </select>
                <span>-</span>
                <select
                  value={option.endTime}
                  onChange={(e) =>
                    handleTimeChange(index, "endTime", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(12).keys()].map((hour) => (
                    <option
                      key={hour}
                      value={`${(hour + 1).toString().padStart(2, "0")}:00 AM`}
                    >
                      {hour + 1}:00 AM
                    </option>
                  ))}
                  {[...Array(12).keys()].map((hour) => (
                    <option
                      key={hour + 12}
                      value={`${(hour + 1).toString().padStart(2, "0")}:00 PM`}
                    >
                      {hour + 1}:00 PM
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button className="bg-black text-white px-4 py-2 w-32 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-lg shadow-md">
            Save
          </button>
          <button
            onClick={() =>
              handleApplyToAll(
                availabilityOptions[0].available,
                availabilityOptions[0].startTime,
                availabilityOptions[0].endTime
              )
            }
            className=" text-green-500 underline hover:text-greem-200 transition-colors font-semibold"
          >
            Apply To All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calender;
