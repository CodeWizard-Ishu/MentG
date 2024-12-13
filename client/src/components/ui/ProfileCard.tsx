import React from 'react';

interface ProfileCardProps {
  name: string;
  imageUrl: string;
  desc: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  imageUrl,
  desc,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600 mt-2">{desc}</p>
      </div>
    </div>
  );
};

export default ProfileCard;