import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../endpoint";
import { toast } from "react-toastify";
import Spinner from "../../components/ui/Spinner";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Progress } from "../../components/ui/progress";
import Header from "../../components/Header";

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

const OnboardingServices: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [domains, setDomains] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [showMaxDomainsAlert, setShowMaxDomainsAlert] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/mentor/services/${userId}`,{
            method: "GET",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            pauseOnHover: false,
            draggable: true,
          });
          return;
        }

        const data = await response.json();
        setDomains(Array.isArray(data.domains) ? data.domains : []);
        setServices(Array.isArray(data.services) ? data.services : []);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(`Error, Check your Connection: ${error.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
      } finally {
        setFetchLoading(false);
      }
    };
    fetchServices();
  }, [token, userId]);

  const handleDomain = (item: string) => {
    setDomains((prev) => {
      if (prev.includes(item)) {
        return prev.filter((domain) => domain !== item);
      } else if (prev.length >= MAX_DOMAINS) {
        setShowMaxDomainsAlert(true);
        setTimeout(() => setShowMaxDomainsAlert(false), 3000);
        return prev;
      } else {
        return [...prev, item];
      }
    });
  };

  const handleService = (item: string) => {
    setServices((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const validateStep1 = () => {
    if (domains.length === 0) {
      toast.warning("Please select at least one domain", {
        pauseOnHover: false,
        draggable: true,
      });
      return false;
    }
    if (services.length === 0) {
      toast.warning("Please select at least one service", {
        pauseOnHover: false,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/update/${userId}`,{
          method: "PUT",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domains,
            services,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      navigate("/onboarding/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = ["Choose Your Expertise", "Complete Your Profile"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/95 shadow-xl rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
            Complete Your Profile
          </h1>

          {/* Stepper */}
          <div className="mb-8 sm:mb-10">
            <div className="relative">
              <Progress
                value={50}
                className="h-1 mx-auto w-52 sm:w-72 md:w-96 mb-6 absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2"
              />

              <div className="flex justify-center gap-32 sm:gap-48 md:gap-72 relative z-10 -mt-3">
                {stepTitles.map((title, index) => {
                  const stepNum = index + 1;
                  const isActive = 1 >= stepNum;
                  const isComplete = 1 > stepNum;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-400 border-2 border-gray-200"
                          }
                          ${isComplete ? "bg-green-600 border-green-500" : ""}`}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <span className="text-sm font-medium">{stepNum}</span>
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[100px] sm:max-w-[120px] 
                        ${isActive ? "text-blue-600" : "text-gray-500"}
                        ${isComplete ? "text-blue-600" : ""}`}
                      >
                        {title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {fetchLoading ? (
            <Spinner clasName="content-center"/>
          ) : (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Select Your Domains
                  </h2>
                  <p className="text-sm text-gray-600">
                    Select up to {MAX_DOMAINS} domains
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4">
                  {domainOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`py-3 px-4 rounded-xl border-2 text-center text-sm sm:text-base transition-all duration-200 hover:shadow-md ${
                        domains.includes(option)
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleDomain(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showMaxDomainsAlert && (
                  <Alert variant="destructive" className="mt-4 animate-fadeIn">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You can select maximum {MAX_DOMAINS} domains
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Select Services You Want to Offer
                </h2>
                <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-2 lg:grid-cols-4">
                  {serviceOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`py-3 px-4 rounded-xl border-2 text-center text-sm sm:text-base transition-all duration-200 hover:shadow-md ${
                        services.includes(option)
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleService(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6 sm:mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black min-w-48 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:hover:bg-gray-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {loading ? <Spinner /> : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingServices;
