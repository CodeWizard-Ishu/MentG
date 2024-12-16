import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";

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

// Predefined expertise tags
const PREDEFINED_TAGS: string[] = [
  "Software Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Marketing",
  "Sales",
  "Product Management",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
];

const serviceOptions = [
  "1:1 Sessions",
  "Quick Chat",
  "Priority DMs",
  "Webinars",
];

const Services: React.FC = () => {
  const [domain, setDomain] = useState<string>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(PREDEFINED_TAGS);
  const [customTagInput, setCustomTagInput] = useState<string>("");
  const [isAddingCustomTag, setIsAddingCustomTag] = useState<boolean>(false);
  const [service, setService] = useState<string[]>([]);

  const handleDomain = (item: string) => {
    setDomain(item);
  };

  const handleTagSelect = (tag: string): void => {
    // Prevent duplicate tags
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      // Remove the tag from available tags
      setAvailableTags(availableTags.filter((t) => t !== tag));
    }
  };

  const handleRemoveTag = (tag: string): void => {
    // Remove from selected tags
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    // Add back to available tags if it was a predefined tag
    if (PREDEFINED_TAGS.includes(tag)) {
      setAvailableTags([...availableTags, tag]);
    }
  };

  const handleAddCustomTag = (): void => {
    if (customTagInput.trim()) {
      // Add custom tag to selected tags
      setSelectedTags([...selectedTags, customTagInput.trim()]);
      // Reset custom tag input
      setCustomTagInput("");
      setIsAddingCustomTag(false);
    }
  };

  const handleService = (item: string) => {
    setService((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

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
        <h1 className="text-2xl font-semibold mb-6">Select Your Expertise</h1>
        <div className="bg-gray-300 rounded-lg p-4">
          {/* Selected Tags Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Your Expertise ({selectedTags.length})
            </h2>
            <div className="flex flex-wrap gap-3">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-gray-400 text-black px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:text-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Predefined Tags Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Select from Expertise Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}

              {/* Others Option */}
              <button
                onClick={() => setIsAddingCustomTag(true)}
                className="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center"
              >
                <Plus size={16} className="mr-1" /> Others
              </button>
            </div>
          </div>

          {/* Custom Tag Input */}
          {isAddingCustomTag && (
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  placeholder="Enter your custom expertise"
                  className="w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddCustomTag}
                  disabled={!customTagInput.trim()}
                  className="bg-green-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-green-600 transition-colors"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => {
                    setCustomTagInput("");
                    setIsAddingCustomTag(false);
                  }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
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
        <button className="bg-black text-white px-4 py-2 w-32 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md">
          Save
        </button>
      </div>
    </div>
  );
};

export default Services;
