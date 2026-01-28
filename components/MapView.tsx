
import React from 'react';
import { Property } from '../types';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (p: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ properties, onSelectProperty }) => {
  return (
    <div className="relative w-full h-[calc(100vh-140px)] bg-[#e5e7eb] dark:bg-gray-800 overflow-hidden rounded-3xl border-4 border-white dark:border-gray-700 shadow-2xl">
      {/* Visual background simulation of a map */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ccc" strokeWidth="1" className="dark:stroke-gray-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated Roads */}
          <line x1="0" y1="30%" x2="100%" y2="35%" stroke="white" strokeWidth="12" className="dark:stroke-gray-600" />
          <line x1="40%" y1="0" x2="45%" y2="100%" stroke="white" strokeWidth="12" className="dark:stroke-gray-600" />
        </svg>
      </div>

      {properties.map(p => (
        <button
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:z-20 scale-100 hover:scale-110"
          style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
          onClick={() => onSelectProperty(p)}
        >
          <div className="bg-brand-dark dark:bg-brand-light text-white dark:text-gray-900 px-3 py-1.5 rounded-full font-bold shadow-lg border-2 border-white dark:border-gray-600 flex items-center gap-1 group-hover:bg-brand-light dark:group-hover:bg-brand-mid">
            <span className="text-xs">RM</span>
            {p.price}
          </div>
          <div className="w-0.5 h-3 bg-white dark:bg-gray-600 mx-auto shadow-sm"></div>
        </button>
      ))}

      <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Neighborhood Insights</div>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-tight">
          Exploring <b>Klang Valley</b>. Most properties near MRT lines are showing 15% higher demand this month.
        </p>
      </div>
    </div>
  );
};

export default MapView;
