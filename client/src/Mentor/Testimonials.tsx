import { useEffect, useState } from "react";
import BACKEND_URL from "../endpoint";
import TestimonialCard from "../components/ui/TestimonialCard";

// Define interfaces for the API response data structure
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isMentor: boolean;
  isActive: boolean;
}

interface Mentee {
  user: User;
}

interface Testimonial {
  id: number;
  mentorId: number;
  menteeId: number;
  score: number;
  feedback: string;
  createdAt: string;
  mentee: Mentee;
}

const Testimonials = () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("userToken") ?? "";
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/getRating/${userId}`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!response.ok) {
          setTestimonials([]);
        } else {
          setTestimonials(data as Testimonial[]);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setTestimonials([]);
      }
    };
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl sm:text-3xl font-medium">Your Testimonials</h1>
      <h2 className="text-xs mb-4">
        (Testimonials and ratings from your audience show up here.)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No Feedbacks
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={`${testimonial.mentee.user.firstName} ${testimonial.mentee.user.lastName}`}
              testimonial={testimonial.feedback}
              rating={testimonial.score}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Testimonials;
