import React from "react";
import TestimonialCard from "../components/ui/TestimonialCard";

const Testimonials: React.FC = () => {
  return (
    <div>
      <TestimonialCard
        name="John Doe"
        position="CEO"
        company="Acme Inc"
        testimonial="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        rating={5}
        className="w-full md:w-1/3"
      />
    </div>
  );
};

export default Testimonials;
