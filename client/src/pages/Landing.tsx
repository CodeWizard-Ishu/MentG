import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Globe,
  ChevronRight,
  CheckCircle,
  Search,
} from "lucide-react";

interface LandingPageProps {
  loggedIn: boolean;
  mentor: boolean;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn, mentor, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
  }, [loggedIn, mentor]);

  const expertCategories = [
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Finance",
    "Coaching",
    "Writing",
    "Engineering",
  ];

  const features = [
    {
      icon: <Building2 size={32} className="text-blue-500" />,
      title: "Professional Network",
      description: "Connect with experts across industries",
    },
    {
      icon: <Users size={32} className="text-green-500" />,
      title: "Direct Consultations",
      description: "Book 1:1 sessions with top professionals",
    },
    {
      icon: <Globe size={32} className="text-purple-500" />,
      title: "Global Reach",
      description: "Access talent from anywhere in the world",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="../assets/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-xl">MentG</span>
        </div>
        {!loggedIn ? (
          <div className="space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Join Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/">
              <button
                onClick={onLogout}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                Logout
              </button>
            </Link>
            {mentor ? (
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 pt-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Connect with Top Professionals Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Book personalized consultation sessions with experts from tech,
          business, creative fields, and more.
        </p>

        {/* Search Section */}
        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto mb-8 relative"
        >
          <div className="flex items-center">
            <Search className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Find experts by name, category, or skill"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Start Exploring
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
            Learn More
          </button>
        </div>

        {/* Quick Category Links */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {expertCategories.map((category) => (
            <span
              key={category}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </main>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Platform</h2>
            <ul className="space-y-4">
              {[
                "Verified Expert Profiles",
                "Flexible Scheduling",
                "Secure Payment System",
                "Transparent Pricing",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://img.freepik.com/free-vector/internship-job-illustration_52683-50829.jpg?t=st=1733331624~exp=1733335224~hmac=e3e9781622115c757183070a44cfee180c65ac111ac0ede0c3936c10971610df&w=900"
              alt="Platform Benefits"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blue-600 text-white py-16 rounded-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Professional Journey
          </h2>
          <p className="text-xl mb-8">
            Discover opportunities, gain insights, and accelerate your growth
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition flex items-center">
              Get Started <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              {["How it Works", "Features", "Pricing"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Help Center", "Community"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              {["Contact", "Support"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
