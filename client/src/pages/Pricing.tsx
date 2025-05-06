import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import contactImage from "../assets/pricing-image.jpg";
import { Button } from "../components/ui/button";
import { CalendarCheck, Star, Award, BookUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const features = [
    { 
      icon: <BookUser className="h-6 w-6 text-blue-500" />, 
      text: "Personalized 1:1 sessions" 
    },
    { 
      icon: <CalendarCheck className="h-6 w-6 text-blue-500" />, 
      text: "Flexible scheduling" 
    },
    { 
      icon: <Star className="h-6 w-6 text-blue-500" />, 
      text: "Top industry mentors" 
    },
    { 
      icon: <Award className="h-6 w-6 text-blue-500" />, 
      text: "Career growth strategies" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50">
      {/* Sticky Header */}
      <Header/>

      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_10px_40px_-15px_rgba(0,118,255,0.3)] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 md:p-12 relative">
            <div className="flex items-center justify-center p-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <img 
                    src={contactImage} 
                    alt="Mentorship session" 
                    className="rounded-xl shadow-xl object-cover w-full h-auto max-h-[500px]" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-800 font-bold">
                            {String.fromCharCode(65 + i)} 
                          </div>
                        ))}
                      </div>
                      <span className="text-white text-sm">+150 mentors available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full">Limited Time Offer</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Get 1:1 Mentorship from
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Top Industry Experts</span>
              </h2>
              
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="text-3xl sm:text-5xl font-bold text-gray-900">₹500</div>
                <div className="ml-2 text-lg text-gray-500 line-through">₹2,000</div>
                <div className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">75% OFF</div>
              </div>
              
              <p className="text-lg text-gray-700 mb-8">
                Accelerate your career with personalized guidance from seasoned professionals.
                <span className="font-semibold"> Limited slots available</span> – book now!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {feature.icon}
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => {
                    return localStorage.getItem("loggedIn") ? navigate("/dashboard/mentee") : navigate("/login");
                  }}
                  className={`${isHovered ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 text-lg shadow-lg hover:shadow-blue-200 hover:shadow-xl`}
                >
                  Book Now
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 font-medium hover:bg-blue-50" onClick={() => navigate("/")}>
                  Learn More
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
