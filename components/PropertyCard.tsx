
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: (p: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => onClick(property)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          {property.isVerified && (
            <span className="bg-brand-light text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414z"/></svg>
              Verified
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold">
          RM {property.price} / mo
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 line-clamp-1">{property.title}</h3>
          <span className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
            ★ {property.rating}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {property.location}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.lifestyleTags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-brand-mid bg-brand-bg px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-3 text-gray-400 text-xs">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">🛏️ {property.beds}</span>
            <span className="flex items-center gap-1">🚿 {property.baths}</span>
          </div>
          <span>{property.sqft} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
