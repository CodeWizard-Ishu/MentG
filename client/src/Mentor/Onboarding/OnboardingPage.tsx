import React, { useState } from "react";

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    // if(currentStep > 4)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md w-full px-4">
        <div className="flex items-center justify-center mb-8">
          <div
            className={`w-8 h-8 rounded-full z-1 ${
              currentStep === 1 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-12 h-4 bg-gray-300 z-0 rounded-lg ${
              currentStep === 2 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-8 h-8 rounded-full z-1 ${
              currentStep === 2 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-12 h-4 bg-gray-300 z-0 rounded-lg${
              currentStep === 3 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-8 h-8 rounded-full z-1 ${
              currentStep === 3 ? "bg-red-500" : "bg-gray-300"
            }`}
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">Hello there!</h1>
        <p className="text-gray-500 mb-8">
          In a few moments you will be ready to share your expertise & time
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
              placeholder="mentg.in/mithilesh_jaiswal"
            />
            <button className="bg-green-500 text-white rounded-md px-4 py-2 ml-2">
              Connect
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Your primary reason to use MentG
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="radio" name="primary-reason" className="mr-2" />
              Find Expertise
            </label>
            <label className="flex items-center">
              <input type="radio" name="primary-reason" className="mr-2" />
              Provide Expertise
            </label>
          </div>
        </div>

        <button
          className="bg-black text-white rounded-md px-4 py-2 w-full"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
