import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
  return (
    <div className="col-span-full py-20 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-serif text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
