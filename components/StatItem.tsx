import React from 'react';

interface StatItemProps {
  icon: string;
  value: string | number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <div>
      <div className="text-gray-800 text-xl font-bold">{icon} {value}</div>
      <div className="text-xs text-gray-500 uppercase">{label}</div>
    </div>
  );
};

export default StatItem;
