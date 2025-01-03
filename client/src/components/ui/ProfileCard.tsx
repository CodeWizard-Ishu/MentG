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
      className={`bg-white p-4 shadow-md rounded-lg overflow-hidden w-auto h-auto ${className}`}
    >
      <img src={imageUrl} alt={name} className="h-20 sm:h-44 object-contain rounded-lg" />
      <div className="pt-4">
        <h3 className="text-sm sm:text-md font-bold truncate">{name}</h3>
        <p className="text-xs text-gray-600 mt-2 truncate">{desc}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
