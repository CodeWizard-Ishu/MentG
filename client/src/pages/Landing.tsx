import React, { useEffect, useState } from "react";
import BACKEND_URL from "../endpoint";
import Logo from "../assets/logo.png";
import jobImage from "../assets/job-image.jpg";
import defaultImage from "../assets/defautProfilePic.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  ArrowRight,
  TabletSmartphone,
  Target,
  Calendar,
  MessageSquare,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Rocket,
  Search,
  Star,
} from "lucide-react";
import ProfileCard from "../components/ui/ProfileCard";
import Footer from "../components/Footer";
import LandingSkeleton from "../components/ui/Skeletons/LandingSkeleton";
import SearchBox from "../components/SearchBox";

interface LandingPageProps {
  loggedIn: boolean;
  mentor: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ loggedIn, mentor }) => {
  const [category, setCategory] = useState("Technology");
  const [mentorsData, setMentorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalize = (string : string) => {
    return string.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  useEffect(() => {}, [loggedIn, mentor]);

  useEffect(() => {
    fetchTopMentors([category]); // Call with an array containing the selected category
  }, [category]);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategory(e.currentTarget.innerText);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchTopMentors = async (selectedDomainNames: any) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentor/topMentors?domainNames=${selectedDomainNames.join(
          ","
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sortedMentors = data[0].mentors.sort((a: any, b: any) => {
        const aHasPicture = a.profilePicture !== null;
        const bHasPicture = b.profilePicture !== null;
        return aHasPicture === bHasPicture ? 0 : aHasPicture ? -1 : 1;
      });

      if (Array.isArray(data) && data.length > 0 && data[0].mentors) {
        setMentorsData(sortedMentors);
      } else {
        setMentorsData([]);
      }
    } catch (error) {
      console.error("Error fetching top mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const expertCategories = [
    "Technology",
    "Business",
    "Career",
    "Marketing",
    "Finance",
    "Engineering",
    "Mental Fitness",
    "Fintech",
    "Operations",
    "Compliance",
    "Legal",
    "Tax",
  ];

  const features = [
    {
      icon: <Building2 size={32} className="text-blue-500" />,
      title: "Experienced & Verified Mentors",
      description: "Industry leaders with proven expertise in their fields",
    },
    {
      icon: <Target size={32} className="text-green-500" />,
      title: "Tailored Mentorship",
      description: "Customized plans for your specific career stage and goals",
    },
    {
      icon: <TabletSmartphone size={32} className="text-purple-500" />,
      title: "Flexible Learning",
      description: "Choose from one-on-one sessions, groups, or on-demand consultations",
    },
  ];

  const mentorshipProcess = [
    {
      icon: <GraduationCap size={28} className="text-white" />,
      title: "Create Your Profile",
      description: "Tell us about your career goals and mentorship needs",
    },
    {
      icon: <Search size={28} className="text-white" />,
      title: "Find the Right Mentor",
      description: "Browse experienced mentors matching your requirements",
    },
    {
      icon: <Calendar size={28} className="text-white" />,
      title: "Book a Session",
      description: "Schedule one-time or recurring sessions that fit your schedule",
    },
    {
      icon: <MessageSquare size={28} className="text-white" />,
      title: "Get Personalized Guidance",
      description: "Receive practical advice and actionable steps",
    },
    {
      icon: <TrendingUp size={28} className="text-white" />,
      title: "Track Your Growth",
      description: "Monitor progress and refine your strategy continuously",
    },
  ];

  const audienceCategories = [
    {
      icon: <GraduationCap size={32} className="text-blue-600" />,
      title: "Students & Graduates",
      points: [
        "Get career guidance and industry exposure",
        "Learn essential skills to bridge the academic-corporate gap",
        "Build a strong resume and prepare for interviews"
      ]
    },
    {
      icon: <Briefcase size={32} className="text-green-600" />,
      title: "Working Professionals",
      points: [
        "Advance in your career with strategic advice",
        "Improve leadership and communication skills",
        "Navigate career transitions effectively"
      ]
    },
    {
      icon: <Rocket size={32} className="text-purple-600" />,
      title: "Entrepreneurs & Founders",
      points: [
        "Gain insights on business growth and funding",
        "Learn to build strong teams and improve decisions",
        "Avoid common pitfalls with expert guidance"
      ]
    },
    {
      icon: <Search size={32} className="text-amber-600" />,
      title: "Job Seekers & Career Changers",
      points: [
        "Get expert advice on resume building",
        "Prepare for interviews with mock sessions",
        "Identify new career opportunities aligned with your skills"
      ]
    }
  ];

  const industryInsights = [
    { name: "Fintech & Digital Lending", description: "Navigate the fast-evolving financial landscape" },
    { name: "E-commerce & Retail", description: "Learn from experts who have scaled successful platforms" },
    { name: "Enterprise Sales & B2B", description: "Master high-ticket sales and client acquisition" },
    { name: "Startups & Entrepreneurship", description: "Gain practical insights on building and growing your business" }
  ];

  const testimonials = [
    {
      text: "The personalized mentorship helped me pivot from being a backend developer to a blockchain specialist. My mentor's roadmap and weekly coding challenges accelerated my learning curve. I now lead blockchain initiatives at my company!",
      name: "Karan Malhotra",
      title: "Blockchain Lead, CoinDCX"
    },
    {
      text: "As a woman in SaaS sales, I faced unique challenges breaking into leadership roles. My mentor provided tactical negotiation strategies and helped me build executive presence. I've since closed our company's largest enterprise deal to date!",
      name: "Divya Reddy",
      title: "Head of Enterprise Sales, Freshworks"
    },
    {
      text: "Coming from a tier-3 city, I lacked the network and guidance to break into product management. My mentor's frameworks and mock interviews prepared me perfectly. I received offers from three top startups within two months!",
      name: "Aditya Singh",
      title: "Product Manager, CRED"
    },
    {
      text: "When I started my D2C business, I was overwhelmed with manufacturing and logistics challenges. My mentor, who had scaled similar operations, provided step-by-step guidance that helped me reduce costs by 28% while improving product quality.",
      name: "Ritu Agarwal",
      title: "Founder, Sustainable Fashion Brand"
    },
    {
      text: "After 12 years in IT services, I was struggling to transition to cloud architecture. My mentor identified my knowledge gaps and created a personalized upskilling plan. Within six months, I landed a role at a leading cloud provider!",
      name: "Santosh Narayanan",
      title: "Cloud Solutions Architect, AWS India"
    },
    {
      text: "My family business was struggling to adapt to digital transformation. The mentorship program connected me with an expert who helped modernize our operations and e-commerce strategy. Our revenue has grown by 65% year-over-year!",
      name: "Vihaan Joshi",
      title: "Director, Joshi Handicrafts"
    },
    {
      text: "As a content creator trying to monetize my work, I was lost in the digital landscape. My mentor helped me create a sustainable business model and negotiate better brand partnerships. My income has tripled in just one year!",
      name: "Meera Krishnan",
      title: "Founder, Wellness Content Platform"
    },
    {
      text: "Transitioning from a corporate role to building a fintech startup was daunting. My mentor's guidance on regulatory compliance and fundraising strategies was invaluable. We recently closed our seed round of $1.2 million!",
      name: "Rohit Verma",
      title: "Co-founder & CEO, PaySmart"
    },
  ];

  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-sky-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#08286b] flex justify-between items-center p-3 md:p-4 lg:p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-24 md:h-10 md:w-28 lg:h-12 lg:w-36"
            />
          </a>
        </div>
        {!loggedIn ? (
          <div className="space-x-2 md:space-x-4">
            <a href="/login">
              <button className="px-2 md:px-4 py-1.5 md:py-2 text-white text-sm md:text-base lg:text-base border rounded-lg hover:border-gray-500 transition">
                Login
              </button>
            </a>

            <a href="/signup">
              <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-sm md:text-base lg:text-base text-black rounded-md hover:bg-gray-300 transition-colors">
                Join Now
              </button>
            </a>
          </div>
        ) : (
          <div className="space-x-2 md:space-x-4">
            {mentor ? (
              <a href="/dashboard/">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </a>
            ) : (
              <a href="/dashboard/mentee/">
                <button className="px-2 md:px-4 py-1.5 md:py-2 bg-white text-black text-sm md:text-base lg:text-base rounded-md hover:bg-gray-300 transition-colors">
                  Dashboard
                </button>
              </a>
            )}
          </div>
        )}
      </header>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <main className="container mx-auto px-4 pt-8 sm:pt-16 text-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Empower Your Growth with
              <span className="text-[#08286b]"> Expert Mentorship</span>
            </h1>
            <p className="text-md sm:text-lg text-gray-800 max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              Success is not just only about hard work, it's also about the right guidance. Connect with experienced mentors
              who provide personalized support, strategic insights, and career advice.
            </p>
          </div>

          {/* Search Section */}
          <div>
            <SearchBox />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <a href="/all-mentors">
              <button className="bg-[#08286b] text-white text-sm sm:text-base px-6 py-3 rounded-lg hover:bg-[#08276bcc] transition flex items-center">
                Find a Mentor <ArrowRight className="ml-2" size={16} />
              </button>
            </a>
            <a href="#benefits">
              <button className="border border-gray-400 text-black text-sm sm:text-base px-6 py-3 rounded-lg hover:border-black transition">
                Learn More
              </button>
            </a>
          </div>

          {/* Quick Category Links */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
          <p className="w-full mb-2 text-black text-lg font-semibold">Explore mentors by domains:</p>
            {expertCategories.map((cat) => (
              <span
                onClick={handleCategory}
                key={cat}
                className={`text-black px-3 py-1 rounded-full text-sm ${category === cat ? 'bg-[#08286b] text-white' : 'bg-white hover:bg-gray-200'} cursor-pointer transition-colors shadow-sm`}
              >
                {cat}
              </span>
            ))}
          </div>
        </main>

        {/* Top Mentors Section */}
        <section className="container mx-auto px-4 sm:px-16 py-8">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-xl sm:text-2xl font-semibold">
                {category} Mentors
              </span>
              <a
                href={`/see-all/${category}`}
                className="flex items-center text-xl px-4 underline"
              >
                See all {<ArrowRight />}
              </a>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
              <div className="flex grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4">
                  {mentorsData.length === 0 && loading ? <LandingSkeleton/> : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    mentorsData.map((mentor: any) => (
                      <div 
                        key={mentor.id} 
                        className="w-40 sm:w-48 md:w-44"
                      >
                        <a
                          href={`/profile/${mentor.userId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ProfileCard
                            key={mentor.id}
                            name={`${capitalize(mentor.firstName)} ${capitalize(mentor.lastName)}`}
                            imageUrl={mentor.profilePicture || defaultImage}
                            desc={mentor.bio || "No bio available."}
                          />
                        </a>
                      </div>
                    )))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <motion.section
          id="benefits"
          className="bg-sky-300 py-16 rounded-2xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg max-w-2xl mx-auto">
                We connect ambitious professionals, entrepreneurs, and students with experienced mentors
                who have walked the path you're on.
              </p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                  variants={itemVariants}
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Diverse Industry Insights</h3>
                <ul className="space-y-4">
                  {industryInsights.map((industry, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-[#08286b] flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium block">{industry.name}</span>
                        <span className="text-sm text-gray-700">{industry.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="md:w-1/2 mt-8 md:mt-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src={jobImage}
                  alt="Platform Benefits"
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section className="py-16 bg-white/80 rounded-2xl mb-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Our simple process helps you find the right mentor and get start your growth journey
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row justify-between"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mentorshipProcess.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="text-center px-4 relative mb-8 md:mb-0"
                  variants={itemVariants}
                >
                  <div className="w-16 h-16 bg-[#08286b] rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${step.title}`}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  
                  {/* Connector line between steps (hidden on mobile) */}
                  {index < mentorshipProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-0.5 bg-gray-300"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Who Can Benefit Section */}
        <section className="py-16 bg-sky-300 rounded-2xl mb-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Who Can Benefit</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Our mentorship program is designed to help individuals at every stage of their career journey
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {audienceCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                  variants={itemVariants}
                >
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.points.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={16} style={{ marginTop: '2px' }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="pt-16 bg-white/80 rounded-2xl mb-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Hear from mentees who have transformed their growth journey with our platform
              </p>
            </motion.div>

            <motion.div
              className="w-full mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Slider {...slickSettings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-5">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                      <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400 text-2xl"><Star className="fill-yellow-400 text-yellow-400"/></span>
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-6 text-center">"{testimonial.text}"</p>
                      <div className="text-center">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="container mx-auto px-4 text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-sky-300 py-12 sm:py-16 rounded-2xl relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black px-4">
                Ready to Unlock Your Potential?
              </h2>
              <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-black px-4 max-w-2xl mx-auto">
                Join with the industry professionals who have accelerated their growth through expert mentorship
              </p>
              <div className="flex justify-center">
                <a href="/signup">
                  <button className="bg-[#08286b] text-white text-sm sm:text-base px-8 py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center w-auto sm:w-auto">
                    Get Started <ArrowRight className="ml-2" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;