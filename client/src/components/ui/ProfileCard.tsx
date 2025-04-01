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
      className={`max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="aspect-square w-full relative p-4">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover"
          title={`${name}`}
        />
      </div>
      <div className="pl-4 pr-4 pb-4">
        <h3 className="text-sm sm:text-md lg:text-lg font-bold text-gray-800 mb-1 truncate" title={name}>
          {name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">{desc}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
