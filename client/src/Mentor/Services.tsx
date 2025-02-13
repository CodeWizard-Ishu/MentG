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
  "Mental Fitness",
  "Fintech",
  "Operations",
  "Compliance",
  "Legal",
  "Tax",
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
  const [isSubmitting, setSubmitting] = useState(false);

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
              "Authorization": token,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDomain(data.domain[0]); // Assuming only one domain is returned
        setService(data.services);
      } catch (error) {
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
  }, [token, userId]);

  const handleSave = async () => {
    setSubmitting(true);
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
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setSubmitting(false);
    } catch (error) {
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
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mb-9">
        <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
          Choose your Domain
        </h1>
        <div className="grid grid-cols-2 gap-2 w-full sm:grid-cols-3 lg:grid-cols-4">
          {domainOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`py-2 px-4 rounded border text-center ${
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
        <label className="block text-lg text-black font-medium mb-4 text-center sm:text-left">
          Which service you want to give?
        </label>
        <div className="grid grid-cols-2 gap-2 w-full sm:grid-cols-3 lg:grid-cols-4">
          {serviceOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`py-2 px-4 rounded border text-center ${
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

      <div className="flex justify-center sm:justify-start mt-10 sm:mt-14">
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
        >
          {isSubmitting ? <Spinner /> : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Services;
