import React from 'react';

interface ViewToggleProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border">
      <button
        onClick={() => onViewChange('list')}
        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'list' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-400'}`}
      >
        List
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'map' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-400'}`}
      >
        Map
      </button>
    </div>
  );
};

export default ViewToggle;
