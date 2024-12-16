import React from 'react';
import { Quote, Star} from 'lucide-react';

// Testimonial Card Props Interface
interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number;
  avatar?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  position,
  company,
  testimonial,
  rating,
  className = ''
}) => {
  // Generate star rating display
  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      {/* Quote Icon */}
      <div className="absolute top-4 left-4 opacity-10">
        <Quote className="h-12 w-12 text-gray-300" />
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-600 italic mb-4 relative z-10 min-h-[100px]">
        "{testimonial}"
      </p>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        {renderStarRating()}
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-center space-x-4 mt-4">

        {/* Author Details */}
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800">
            {name}
          </h3>
          <p className="text-sm text-gray-500">
            {position} at {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;