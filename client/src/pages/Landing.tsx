import React, { useState } from 'react';
import { Search, ChevronRight, Star } from 'lucide-react';

const Landing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovators",
      quote: "Incredible platform that transformed our workflow.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Startup Founder",
      quote: "Intuitive design and powerful features.",
      rating: 4
    },
    {
      name: "Emily Chen",
      role: "Product Manager",
      quote: "Seamless integration and amazing support.",
      rating: 5
    }
  ];

  const serviceCards = [
    { title: "Analytics", description: "Advanced data insights" },
    { title: "Collaboration", description: "Team productivity tools" },
    { title: "Security", description: "Enterprise-grade protection" },
    { title: "Scalability", description: "Grow without limitations" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="/api/placeholder/50/50" alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-xl">YourBrand</span>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </header>

      {/* Rest of the page remains the same as previous artifact */}
      {/* Hero Section */}
      <main className="container mx-auto px-6 mt-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Transform Your Business with Smart Solutions
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Streamline operations, boost productivity, and drive growth
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search features, solutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </main>

      {/* Horizontal Scrollable Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="flex overflow-x-auto space-x-6 pb-6 px-6">
            {serviceCards.map((card, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-64 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
                <ChevronRight className="mt-4 text-blue-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
          <div className="flex justify-center space-x-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md w-80 text-left"
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Documentation</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Compliance</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 text-center border-t border-gray-700 pt-6">
          © 2024 YourBrand. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;