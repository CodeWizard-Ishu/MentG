import React, { useState, useEffect } from "react";
import BACKEND_URL from "../endpoint";
import { Bounce, toast } from "react-toastify";
import Spinner from "../components/ui/Spinner";

const domainOptions = [
  "Technology",
  "Business",
  "Career",
  "Marketing",
  "Finance",
  "Engineering",
  "Health",
  "Fitness",
  "Mental Fitness",
];

const serviceOptions = [
  "1:1 Sessions",
  "Quick Chat",
  "Priority DMs",
  "Webinars",
];

const Services: React.FC = () => {
  const [domain, setDomain] = useState<string>();
  const [service, setService] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/mentor/services/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDomain(data.domain[0]); // Assuming only one domain is returned
        setService(data.services);
      } catch (error) {
        // console.error("Error fetching services:", error);
        toast.error(`${error}`, {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [userId, token]);

  const handleSave = async () => {
    if (!domain || service.length === 0) {
      toast.warning("Please select a domain and at least one service.", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      return;
    }

    const payload = {
      domain,
      services: service,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/update/${userId}`,
        {
          // Replace with your actual URL
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const data = await response.json();
      // console.log("Success:", data);
      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    } catch (error) {
      // console.error("Error:", error);
      toast.error(`Failed to update profile, ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
  };

  const handleDomain = (item: string) => {
    setDomain(item);
  };

  const handleService = (item: string) => {
    setService((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen">
      {/* PAGE BODY from here.. */}

      <div className="mb-9">
        <h1 className="text-2xl font-semibold mb-6">Choose your Domain</h1>
        <div className="grid grid-cols-3 gap-2 w-full md:w-2/4">
          {domainOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`py-2 px-4 rounded border ${
                domain === option
                  ? "border-black bg-gray-400 rounded-full font-medium text-black transition-all"
                  : "bg-white rounded-full text-black"
              }`}
              onClick={() => handleDomain(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-9">
        <label className="block text-gray-700 font-medium mb-2">
          Which service you want to give?
        </label>
        <div className="grid grid-cols-3 gap-2 w-full md:w-2/4">
          {serviceOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`py-2 px-4 rounded border ${
                service.includes(option)
                  ? "border-black bg-gray-400 rounded-full font-medium text-black transition-all"
                  : "bg-white rounded-full text-black"
              }`}
              onClick={() => handleService(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start mt-14">
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 w-32 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Services;
