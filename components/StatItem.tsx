import React from 'react';

interface StatItemProps {
  icon: string;
  value: string | number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <div>
      <div className="text-gray-800 dark:text-gray-200 text-xl font-bold">{icon} {value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">{label}</div>
    </div>
  );
};

export default StatItem;
