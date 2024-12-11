import React, { useState } from "react";
import { Progress } from "../../components/ui/progress";

const OnboardingPage: React.FC = () => {
  const [mentgLink, setMentgLink] = useState("mentg.in/{{firstName+lastName}}");
  const [service, setService] = useState<string[]>([]);

  const expertiseOptions = [
    "1:1 Sessions",
    "Quick Chat",
    "Priority DMs",
    "Webinars",
  ];

  const handleServiceToggle = (item: string) => {
    setService((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
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
          <div className="container ml-72 mr-72">
            <Progress value={25} />
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-10 flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Welcome to MentG!
          </h1>
          <p className="text-gray-500 mb-8">
            To get started with MentG as Mentor, you have to share some details
            with us
          </p>

          <div className="mb-4">
            <label
              htmlFor="social-accounts"
              className="block text-gray-700 font-medium mb-2"
            >
              Connect your social account
            </label>
            <input
              type="text"
              id="social-accounts"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="LinkedIn, Twitter, Instagram"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mentg-page"
              className="block text-gray-700 font-medium mb-2"
            >
              Your MentG page link
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="mentg-page"
                className="border border-gray-300 rounded-md p-2 flex-1"
                value={mentgLink}
                placeholder="mentg.in/"
                onChange={(e) => setMentgLink(e.target.value)}
              />
              <button className="bg-green-500 text-white rounded-md px-4 py-2 ml-2">
                Check Availability
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              What do you want to give services on MentG?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {expertiseOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`py-2 px-4 rounded border ${
                    service.includes(option)
                      ? "border-black bg-gray-400 font-medium text-black transition-all"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleServiceToggle(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <a href="/onboarding/expertise">
              <button className="bg-black text-white rounded-md px-4 py-2 w-28">
                Next
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
