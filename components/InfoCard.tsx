import React from 'react';

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-xs text-gray-500 uppercase font-bold mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
};

export default InfoCard;
