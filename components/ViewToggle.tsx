import React from 'react';

interface ViewToggleProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-full border dark:border-gray-700">
      <button
        onClick={() => onViewChange('list')}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${view === 'list' ? 'bg-white dark:bg-gray-900 shadow-sm text-brand-dark dark:text-brand-light' : 'text-gray-400 dark:text-gray-500'}`}
      >
        List
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${view === 'map' ? 'bg-white dark:bg-gray-900 shadow-sm text-brand-dark dark:text-brand-light' : 'text-gray-400 dark:text-gray-500'}`}
      >
        Map
      </button>
    </div>
  );
};

export default ViewToggle;
