import React from 'react';

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-brand-dark dark:bg-brand-light text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-600'}`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
