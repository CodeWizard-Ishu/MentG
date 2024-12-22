import React, { useEffect, useState } from 'react';
import { Users, Target, Clock, Globe2, Star, Zap, ArrowRight } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#FF4D6D]/5" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#4ECDC4]/10" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#FFE66D]/10" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="px-6 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium">
                  Welcome to Our World
                </span>
              </div>
              <h1 className="text-6xl font-bold text-[#2C3E50] mb-8">
                We Build 
                <span className="block text-[#FF4D6D]">Digital Excellence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Crafting innovative digital solutions that transform businesses and inspire growth.
              </p>
              <div className="flex gap-6">
                <button className="px-8 py-4 bg-[#FF4D6D] text-white rounded-xl font-medium hover:scale-105 transition-transform">
                  Get Started
                </button>
                <button className="px-8 py-4 border-2 border-[#FF4D6D] text-[#FF4D6D] rounded-xl font-medium hover:scale-105 transition-transform">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#4ECDC4] to-[#FFE66D] p-1">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <img src="https://i.imgur.com/WbQnbas.png" alt="Hero" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="px-6 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium">
              What Makes Us Different
            </span>
            <h2 className="text-4xl font-bold text-[#2C3E50] mt-6">Our Core Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", icon: <Zap className="w-6 h-6" />, color: "#FF4D6D" },
              { title: "Excellence", icon: <Star className="w-6 h-6" />, color: "#4ECDC4" },
              { title: "Vision", icon: <Target className="w-6 h-6" />, color: "#FFE66D" }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">{feature.title}</h3>
                  <p className="text-gray-600">
                    Transforming ideas into reality through innovative solutions and cutting-edge technology.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-[#FF4D6D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "1M+", label: "Clients", icon: <Users /> },
              { value: "50+", label: "Countries", icon: <Globe2 /> },
              { value: "100+", label: "Team", icon: <Users /> },
              { value: "24/7", label: "Support", icon: <Clock /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                  <div className="text-white/80 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="px-6 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium">
              Our Team
            </span>
            <h2 className="text-4xl font-bold text-[#2C3E50] mt-6">Meet the Experts</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder" },
              { name: "Michael Chen", role: "CTO" },
              { name: "Emma Williams", role: "Head of Design" }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="relative mb-8">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                      <img src="/api/placeholder/400/400" alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">{member.name}</h3>
                  <p className="text-[#FF4D6D]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#4ECDC4] to-[#FFE66D]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-16 shadow-xl">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of satisfied customers who have already taken their business to the next level.
            </p>
            <button className="px-8 py-4 bg-[#FF4D6D] text-white rounded-xl font-medium hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;