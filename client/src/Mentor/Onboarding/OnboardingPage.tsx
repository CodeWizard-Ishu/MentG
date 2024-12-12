import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage: React.FC = () => {
  const [socialLink, setSocialLink] = useState("");
  const [mentgLink, setMentgLink] = useState("{{firstName+lastName}}");
  const [service, setService] = useState<string[]>([]);
  const [domain, setDomain] = useState<string>();
  const navigate = useNavigate();

  const serviceOptions = [
    "1:1 Sessions",
    "Quick Chat",
    "Priority DMs",
    "Webinars",
  ];

  const domainOptions = [
    "Technology",
    "Business",
    "Career",
    "Marketing",
    "Finance",
    "Health",
    "Engineering",
    "Medical",
    "Mental Fitness",
  ];

  const handleService = (item: string) => {
    setService((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleDomain = (item: string) => {
    setDomain(item);
  };

  const onCheck = () => {
    alert("Feature to be implemented");
  };

  const handleSubmit = () => {
    try {
      //logic after submitting details
      navigate("/onboarding/expertise");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100">
      {/* Header */}
      <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/tPzj54M/logo.png"
                alt="Logo"
                className="h-12 w-12"
              />
              <span className="font-bold text-2xl">MentG</span>
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-10 flex justify-center items-center">
        <div className="flex flex-col mb-12">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Welcome to MentG!
          </h1>
          <p className="text-gray-500 mb-8">
            To get started with MentG as Mentor, you have to share some details
            with us
          </p>

          <form>
            <div className="mb-6">
              <label
                htmlFor="social-links"
                className="block text-gray-700 font-medium mb-2"
              >
                Connect your social account
              </label>
              <input
                name="social-links"
                type="url"
                id="social-links"
                required
                className="border rounded-e-md px-4 py-2 w-full"
                value={socialLink}
                placeholder="LinkedIn, Twitter, Instagram"
                onChange={(e) => setSocialLink(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="mentg-page"
                className="block text-gray-700 font-medium mb-2"
              >
                Your MentG page link
              </label>
              <div className="flex">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border bg-gray-50 text-sm text-gray-500">
                  mentg.in/
                </span>
                <input
                  type="text"
                  id="mentg-page"
                  className="border border-gray-300 rounded-e-md p-2 flex-1"
                  value={mentgLink}
                  placeholder="mentg.in/"
                  onChange={(e) => setMentgLink(e.target.value)}
                />
                <button
                  onClick={onCheck}
                  className="bg-green-500 text-white rounded-md px-4 py-2 ml-2"
                >
                  Check Availability
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Choose your Domain
              </label>
              <div className="grid grid-cols-3 gap-2">
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

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Which service you want to give?
              </label>
              <div className="grid grid-cols-3 gap-2">
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

            <div className="text-center">
              <button
                type="submit"
                onSubmit={handleSubmit}
                disabled={
                  (domain ? false : true)}
                className="bg-black text-white px-6 py-3 w-32 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-lg shadow-md"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
