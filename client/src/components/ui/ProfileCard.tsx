import React from "react";

interface ProfileCardProps {
  name: string;
  imageUrl: string;
  desc: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  imageUrl,
  desc,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-4 shadow-md rounded-lg overflow-hidden w-48 ${className}`}
    >
      <img src={imageUrl} alt={name} className="object-cover" />
      <div className="pt-4">
        <h3 className="text-md font-bold">{name}</h3>
        <p className="text-xs text-gray-600 mt-2">{desc}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
