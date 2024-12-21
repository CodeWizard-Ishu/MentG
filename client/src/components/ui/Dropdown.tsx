import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Define the type for dropdown options
interface DropdownOption {
  label: string;
  value: string;
}

interface DynamicDropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void; // Add onChange prop type
}

const Dropdown: React.FC<DynamicDropdownProps> = ({
  options,
  placeholder = "Select an option",
  className = "",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option.value); // Call onChange with the selected value
    setIsOpen(false);
  };

  return (
    <div>
      <div className={`relative w-48 ${className}`}>
        {/* Dropdown Header */}
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center 
          px-4 py-2 border border-gray-300 rounded-md 
          bg-white text-left hover:bg-gray-50 focus:outline-none"
        >
          <span className={selectedOption ? "text-black" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-200 
            ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white 
            border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer 
                transition-colors duration-200"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;