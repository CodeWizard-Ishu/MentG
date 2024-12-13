import React from "react";
import ProfileCard from "../components/ui/ProfileCard";
import { ArrowRight } from "lucide-react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const domain = [
    {
      domainName: "Top Mentors",
      profileCard: (
        <ProfileCard
          name="Utkarsh Jaiswal"
          imageUrl=""
          desc="Founder of tech and Target | Helping Students in Placements"
        />
      ),
      link: "/top-mentors",
    },
    {
      domainName: "Hot Sellers🔥",
      profileCard: (
        <ProfileCard
          name="Utkarsh Jaiswal"
          imageUrl=""
          desc="Founder of tech and Target | Helping Students in Placements"
        />
      ),
      link: "/hot-sellers",
    },
    {
      domainName: "Career",
      profileCard: (
        <ProfileCard
          name="Utkarsh Jaiswal"
          imageUrl=""
          desc="Founder of tech and Target | Helping Students in Placements"
        />
      ),
      link: "/career",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto">
        {domain.map((name, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold">{name.domainName}</span>
              <a
                href={name.link}
                className="flex items-center text-xl px-4 underline"
              >
                See all {<ArrowRight />}
              </a>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {name.profileCard}
              {name.profileCard}
              {name.profileCard}
              {name.profileCard}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
