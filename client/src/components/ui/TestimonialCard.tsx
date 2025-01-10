import React from "react";
import { Quote, Star } from "lucide-react";

// Testimonial Card Props Interface
interface TestimonialCardProps {
  name: string;
  testimonial: string;
  rating: number;
  avatar?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  testimonial,
  rating,
  className = "",
}) => {
  // Generate star rating display
  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 md:h-5 md:w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-4 md:p-6 relative ${className}`}
    >
      {/* Quote Icon */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 opacity-10">
        <Quote className="h-8 w-8 md:h-12 md:w-12 text-gray-300" />
      </div>

      {/* Testimonial Text */}
      <p className="text-sm md:text-base text-gray-600 italic mb-3 md:mb-4 relative z-10 min-h-[80px] md:min-h-[100px]">
        "{testimonial}"
      </p>

      {/* Rating */}
      <div className="flex justify-center mb-3 md:mb-4 space-x-1 md:space-x-2">
        {renderStarRating()}
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-center space-x-2 md:space-x-4 mt-3 md:mt-4">
        {/* Author Details */}
        <div className="text-center">
          <h3 className="font-semibold text-base md:text-lg text-gray-800">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
