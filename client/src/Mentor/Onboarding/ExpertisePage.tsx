import React, { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface ExpertiseSelectionPageProps {}

const ExpertisePage: React.FC<ExpertiseSelectionPageProps> = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(PREDEFINED_TAGS);
  const [customTagInput, setCustomTagInput] = useState<string>("");
  const [isAddingCustomTag, setIsAddingCustomTag] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleNext = () => {
    try {
      //logic after submitting details
      navigate("/onboarding/availability");
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

      {/* PAGE BODY from here.. */}
      <div className="flex items-center justify-center p-4">
        <div className="p-8 w-full max-w-2xl">
          <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
            Select Your Expertise
          </h1>

          {/* Selected Tags Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
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
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleNext}
              disabled={selectedTags.length === 0}
              className="bg-black text-white px-6 py-3 w-32 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-lg shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertisePage;
