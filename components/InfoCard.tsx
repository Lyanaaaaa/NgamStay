import React from 'react';

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">{label}</p>
      <p className="font-medium text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  );
};

export default InfoCard;
