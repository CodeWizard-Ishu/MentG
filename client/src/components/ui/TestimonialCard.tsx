import React, { useState } from "react";
import { Quote, Star, ChevronDown, ChevronUp } from "lucide-react";

// Testimonial Card Props Interface
interface TestimonialCardProps {
  name: string;
  testimonial: string;
  rating: number;
  createdAt?: string;
  avatar?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  testimonial,
  rating,
  createdAt,
  avatar,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLongTestimonial = testimonial.length > 150;
  
  // Generate star rating display
  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 md:h-4 md:w-4 ${
          index < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Generate initials from name
  const getInitials = () => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return parts[0][0];
  };

  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {/* Header - Name, Avatar and Rating */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
              {getInitials()}
            </div>
          )}
          <div className="ml-3">
            <h4 className="text-sm font-semibold text-gray-800">
              {name}
            </h4>
            {createdAt && (
              <p className="text-xs text-gray-500">
                {createdAt}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center px-2 py-1 bg-blue-50 rounded">
            <span className="text-sm font-semibold mr-1">{rating.toFixed(1)}</span>
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="flex mt-1">
            {renderStarRating()}
          </div>
        </div>
      </div>

      {/* Quote Icon - Subtle Background Element */}
      <div className="absolute opacity-5">
        <Quote className="h-8 w-8 md:h-10 md:w-10 text-gray-500" />
      </div>

      {/* Testimonial Text */}
      <div className="relative mt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {isLongTestimonial && !expanded 
            ? `${testimonial.substring(0, 150)}...` 
            : testimonial}
        </p>
        
        {isLongTestimonial && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-xs font-medium text-blue-600 mt-2 hover:text-blue-800"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="ml-1 w-3 h-3" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="ml-1 w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;