import React from "react";
import TestimonialCard from "../components/ui/TestimonialCard";

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl sm:text-3xl font-medium">Your Testimonials</h1>
      <h2 className="text-xs mb-4">
        (Testimonials and ratings from your audience show up here.)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        <TestimonialCard
          name="John Doe"
          position="CEO"
          company="Acme Inc"
          testimonial="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          rating={5}
          className="w-full md:w-1/3"
        />
        <TestimonialCard
          name="John Doe"
          position="CEO"
          company="Acme Inc"
          testimonial="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          rating={5}
          className="w-full md:w-1/3"
        />
        <TestimonialCard
          name="John Doe"
          position="CEO"
          company="Acme Inc"
          testimonial="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          rating={5}
          className="w-full md:w-1/3"
        />
      </div>
    </div>
  );
};

export default Testimonials;
