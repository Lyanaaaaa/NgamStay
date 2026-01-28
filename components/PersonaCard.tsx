import React from 'react';
import { UserPersona } from '../types';

interface PersonaCardProps {
  persona: UserPersona;
  onSelect: (persona: UserPersona) => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(persona)}
      className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 text-left"
    >
      <img src={persona.avatar} alt={persona.name} className="w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-xl font-bold text-gray-900 mb-1">{persona.name}</h3>
      <p className="text-brand-mid font-medium text-sm mb-4">{persona.role}</p>
      <div className="space-y-2">
        {persona.preferences.map(pref => (
          <div key={pref} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1 h-1 bg-brand-light rounded-full"></span>
            {pref}
          </div>
        ))}
      </div>
    </button>
  );
};

export default PersonaCard;
