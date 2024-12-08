import React, { useState } from "react";
import {
  MessageCircle,
  Share2,
  Heart,
  CheckCircle,
  Award,
  Zap,
  Users,
  Star,
  Calendar,
  Video,
  Monitor,
  BookOpen,
  Briefcase,
} from "lucide-react";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("sessions");

  const profileData = {
    name: "Rahul Sharma",
    username: "@rahulsharma",
    headline: "Tech Entrepreneur | Product Strategy Consultant",
    description:
      "Ex-Google PM with a decade of experience in transforming innovative ideas into successful digital products. Passionate about helping startups navigate complex technological landscapes and achieve sustainable growth.",
    followers: 2450,
    rating: 4.8,
    profileViews: 15670,
    background: {
      experience: [
        {
          company: "Google",
          role: "Senior Product Manager",
          duration: "2015-2022",
        },
        {
          company: "Microsoft",
          role: "Product Strategy Lead",
          duration: "2012-2015",
        },
      ],
      achievements: [
        "Scaled 3 startups to Series A",
        "Created product roadmaps for 10+ successful tech companies",
        "Speaker at multiple international tech conferences",
      ],
    },

    expertise: [
      "Product Strategy",
      "Tech Innovation",
      "Startup Consulting",
      "Digital Transformation",
      "Agile Methodologies",
    ],
    services: [
      {
        icon: Monitor,
        title: "Startup Consulting",
        duration: "45 min",
        price: "₹1,499",
      },
      {
        icon: Video,
        title: "1:1 Mentorship",
        duration: "60 min",
        price: "₹2,499",
      },
      {
        icon: Calendar,
        title: "Career Guidance",
        duration: "30 min",
        price: "₹999",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="top-0 z-50 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 shadow-sm">
        <div>
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/tPzj54M/logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl">MentG</span>
          </a>
        </div>
      </header>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid grid-cols-3 overflow-hidden">
          {/* Sidebar Profile Section */}
          <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 relative">
            <div className="absolute top-6 right-6 flex space-x-3">
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                <Share2 className="w-6 h-6 text-white" />
              </button>
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://img.freepik.com/free-vector/internship-job-illustration_52683-50829.jpg?t=st=1733331624~exp=1733335224~hmac=e3e9781622115c757183070a44cfee180c65ac111ac0ede0c3936c10971610df&w=900"
                //   src="/api/placeholder/200/200"
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white/30 mb-6 shadow-lg"
              />
              <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
              <p className="text-sm text-purple-200 mb-4">
                {profileData.username}
              </p>
              <p className="text-center text-sm text-purple-100 mb-6">
                {profileData.headline}
              </p>

              <div className="grid grid-cols-3 gap-4 w-full text-center mb-6">
                {[
                  {
                    icon: Users,
                    value: profileData.followers,
                    label: "Followers",
                  },
                  { icon: Star, value: profileData.rating, label: "Rating" },
                  {
                    icon: Zap,
                    value: profileData.profileViews,
                    label: "Views",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/20 rounded-lg p-3">
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <stat.icon className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs text-purple-200">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2 bg-white">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {["sessions", "about", "experience", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-indigo-500 text-indigo-500"
                        : "border-transparent text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "sessions" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Available Services
                  </h2>
                  <div className="space-y-4 mb-8">
                    {profileData.services.map((service) => (
                      <div
                        key={service.title}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-indigo-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-indigo-100 p-3 rounded-full">
                            <service.icon className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                              {service.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {service.duration}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-indigo-600">
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 pt-0">
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-3">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Book a Session
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Professional Journey
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {profileData.description}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Key Highlights
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <span>10+ years of product management experience</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span>Worked with multiple successful startups</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Professional Journey
                  </h3>
                  <div className="space-y-4">
                    {profileData.background.experience.map((exp) => (
                      <div
                        key={exp.company}
                        className="bg-gray-50 p-4 rounded-xl"
                      >
                        <div className="flex items-center mb-2">
                          <Briefcase className="mr-3 text-indigo-600" />
                          <h4 className="font-semibold">{exp.role}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-500">{exp.duration}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-4">
                    Key Achievements
                  </h3>
                  <div className="space-y-2">
                    {profileData.background.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center">
                        <CheckCircle className="mr-3 text-green-500" />
                        <p className="text-gray-600">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center text-gray-500 py-12">
                  No reviews yet
                </div>
              )}
            </div>

            {/* Book Session Button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
