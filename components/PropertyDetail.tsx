
import React, { useEffect, useState } from 'react';
import { Property } from '../types';
import { getNeighborhoodInsight } from '../services/gemini';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  const [insight, setInsight] = useState<string>('Loading AI neighborhood insights...');

  useEffect(() => {
    getNeighborhoodInsight(property.neighborhood).then(setInsight);
  }, [property]);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
      <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pb-24">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-64 md:h-96">
          <img src={property.images[0]} className="w-full h-full object-cover" alt="Primary" />
          <img src={property.images[1]} className="hidden md:block w-full h-full object-cover" alt="Secondary" />
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-lg text-brand-mid font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {property.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-gray-900">RM {property.price} <span className="text-sm font-normal text-gray-500">/month</span></div>
              <div className="text-sm text-brand-light font-semibold">Verified Listing ✓</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y py-6 mb-8 text-center">
            <div><div className="text-gray-800 text-xl font-bold">🛏️ {property.beds}</div><div className="text-xs text-gray-500 uppercase">Bedrooms</div></div>
            <div><div className="text-gray-800 text-xl font-bold">🚿 {property.baths}</div><div className="text-xs text-gray-500 uppercase">Bathrooms</div></div>
            <div><div className="text-gray-800 text-xl font-bold">📏 {property.sqft}</div><div className="text-xs text-gray-500 uppercase">Sq Ft</div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-gray-800 text-xl font-bold mb-4">Rental Breakdown</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Deposit</p>
                    <p className="font-medium text-gray-800">{property.deposit}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Utilities</p>
                    <p className="font-medium text-gray-800">{property.utilities}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Lease Duration</p>
                    <p className="font-medium text-gray-800">{property.leaseTerms}</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-gray-800 text-xl font-bold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(a => (
                    <span key={a} className="text-gray-800 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      ✨ {a}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-brand-dark rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-brand-light" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z"/></svg>
                    Jiran AI Insights
                  </h2>
                  <p className="text-brand-light/90 italic leading-relaxed">
                    "{insight}"
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white sticky top-24">
                <h3 className="text-gray-800 font-bold text-lg mb-4">Contact Landlord</h3>
                <div className="flex items-center gap-3 mb-6">
                  <img src="https://picsum.photos/seed/host/100" className="w-12 h-12 rounded-full" alt="Host" />
                  <div>
                    <div className="text-gray-800 font-bold">Aiman Hakim</div>
                    <div className="text-xs text-gray-500">Verified Professional Host</div>
                  </div>
                </div>
                <button className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-black transition-colors mb-3">
                  Schedule a Visit
                </button>
                <button className="w-full border-2 border-brand-dark text-brand-dark font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">
                  Send Inquiry
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4 px-4 uppercase tracking-tighter">
                  Fast Response Rate: Usually within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
