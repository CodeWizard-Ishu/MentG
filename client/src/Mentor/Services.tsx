import React, { useState, useEffect } from "react";
import BACKEND_URL from "../endpoint";
import { Bounce, toast } from "react-toastify";
import Spinner from "../components/ui/Spinner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

const MAX_DOMAINS = 3;

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
  const [domains, setDomains] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showMaxDomainsAlert, setShowMaxDomainsAlert] = useState(false);

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
        setDomains(Array.isArray(data.domains) ? data.domains : []);
        setServices(Array.isArray(data.services) ? data.services : []);
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

  const handleDomain = (item: string) => {
    setDomains((prev) => {
      if (prev.includes(item)) {
        // Remove domain if already selected
        return prev.filter((domain) => domain !== item);
      } else if (prev.length >= MAX_DOMAINS) {
        // Show alert if trying to add more than MAX_DOMAINS
        setShowMaxDomainsAlert(true);
        setTimeout(() => setShowMaxDomainsAlert(false), 3000);
        return prev;
      } else {
        // Add new domain
        return [...prev, item];
      }
    });
  };

  const handleService = (item: string) => {
    setServices((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleSave = async () => {
    setSubmitting(true);
    if (domains.length === 0 || services.length === 0) {
      toast.warning("Please select at least one domain and one service.", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
      setSubmitting(false);
      return;
    }

    const payload = {
      domains,
      services,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/update/${userId}`,
        {
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
    } catch (error) {
      toast.error(`Failed to update profile, ${error}`, {
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-semibold">Choose your Domains</h1>
            <p className="text-sm text-gray-600">
              Select up to {MAX_DOMAINS} domains
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4">
            {domainOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={`py-3 px-4 rounded-full border text-center transition-all hover:shadow-md ${
                  domains.includes(option)
                    ? "border-black bg-gray-400 text-black font-medium"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
                onClick={() => handleDomain(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {showMaxDomainsAlert && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can select a maximum of {MAX_DOMAINS} domains
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="mb-9">
          <label className="block text-lg text-black font-medium mb-4">
            Which services do you want to offer?
          </label>
          <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4">
            {serviceOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={`py-3 px-4 rounded-full border text-center transition-all duration-200 hover:shadow-md ${
                  services.includes(option)
                    ? "border-black bg-gray-400 text-black font-medium"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
                onClick={() => handleService(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:justify-start mt-10">
          <button
            onClick={handleSave}
            disabled={isSubmitting || domains.length === 0 || services.length === 0}
            className="bg-black text-white px-6 py-3 w-48 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:hover:bg-black font-semibold text-md shadow-md"
          >
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;