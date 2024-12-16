import React from "react";
import ProfileCard from "../components/ui/ProfileCard";
import Dropdown from "../components/ui/Dropdown";

const Home: React.FC = () => {

  const options = [
    {
      label: "Technology",
      value: "option1",
      content: (
        <div className="grid md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }, () => (
            <ProfileCard
              name="Utkarsh Jaiswal"
              imageUrl="https://i.ibb.co/tPzj54M/logo.png"
              desc="Founder of tech and Target | Helping Students in Placements"
            />
          ))}
        </div>
      ),
    },
    {
      label: "Business",
      value: "option2",
      content: (
        <div className="grid md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }, () => (
            <ProfileCard
              name="Utkarsh Jaiswal"
              imageUrl="https://i.ibb.co/tPzj54M/logo.png"
              desc="Founder of tech and Target | Helping Students in Placements"
            />
          ))}
        </div>
      ),
    },
    {
      label: "Career",
      value: "option3",
      content: (
        <div className="grid md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }, () => (
            <ProfileCard
              name="Utkarsh Jaiswal"
              imageUrl="https://i.ibb.co/tPzj54M/logo.png"
              desc="Founder of tech and Target | Helping Students in Placements"
            />
          ))}
        </div>
      ),
    },
    {
      label: "Marketing",
      value: "option4",
      content: (
        <div className="grid md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }, () => (
            <ProfileCard
              name="Utkarsh Jaiswal"
              imageUrl="https://i.ibb.co/tPzj54M/logo.png"
              desc="Founder of tech and Target | Helping Students in Placements"
            />
          ))}
        </div>
      ),
    },
    {
      label: "Finance",
      value: "option5",
      content: (
        <div className="grid md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }, () => (
            <ProfileCard
              name="Utkarsh Jaiswal"
              imageUrl="https://i.ibb.co/tPzj54M/logo.png"
              desc="Founder of tech and Target | Helping Students in Placements"
            />
          ))}
        </div>
      ),
    },
    // Add more options...
  ];

  return (
    <div className="min-h-screen">
        <h1 className="text-2xl font-semibold mb-12">Choose your Domain</h1>
        <Dropdown options={options} />
    </div>
  );
};

export default Home;