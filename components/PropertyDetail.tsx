
import React, { useEffect, useState } from 'react';
import { Property, UserPersona } from '../types';
import { getNeighborhoodInsight } from '../services/gemini';
import IconButton from './IconButton';
import InfoCard from './InfoCard';
import StatItem from './StatItem';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  activePersona: UserPersona;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose, activePersona }) => {
  const [insight, setInsight] = useState<string>('Loading AI neighborhood insights...');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getNeighborhoodInsight(property.neighborhood).then(setInsight);
  }, [property]);

  return (
    <div className="fixed inset-0 z-50 bg-brand-bg dark:bg-gray-900 flex flex-col md:flex-row animate-in slide-in-from-bottom duration-500">
      <Sidebar activePersona={activePersona} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-30 flex flex-row gap-4 justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-brand-dark dark:hover:text-brand-light transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Listings
          </button>
          <div className="flex gap-2 items-center">
            <IconButton icon="heart" />
            <IconButton icon="share" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 hide-scrollbar">
        {/* Gallery Section Updated */}
        <div className="flex-1 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 px-4 md:px-0 mt-4 md:mt-0">

            {/* Main Image */}
            <img
              src={property.images[0]}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-md border border-gray-100"
              alt="View 1"
            />

            {/* Right Column (Desktop Only) */}
            <div className="hidden md:grid grid-rows-2 gap-3 h-96">

              {/* Secondary Image */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <img
                  src={property.images[1] || property.images[0]}
                  className="w-full h-full object-cover opacity-90"
                  alt="View 2"
                />
              </div>

              {/* View All Button */}
              <div className="bg-brand-dark dark:bg-brand-light rounded-2xl flex items-center justify-center text-white dark:text-gray-900 font-black text-lg cursor-pointer hover:bg-black dark:hover:bg-brand-mid transition-colors shadow-lg">
                View All Photos
              </div>

            </div>
          </div>
        </div>


        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{property.title}</h1>
              <p className="text-lg text-brand-mid dark:text-brand-light font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {property.location}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">RM {property.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span></div>
              <div className="text-sm text-brand-light font-semibold">Verified Listing ✓</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y dark:border-gray-700 py-6 mb-8 text-center">
            <StatItem icon="🛏️" value={property.beds} label="Bedrooms" />
            <StatItem icon="🚿" value={property.baths} label="Bathrooms" />
            <StatItem icon="📏" value={property.sqft} label="Sq Ft" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-gray-800 dark:text-gray-200 text-xl font-bold mb-4">Rental Breakdown</h2>
                <div className="grid grid-cols-2 gap-4">
                  <InfoCard label="Deposit" value={property.deposit} />
                  <InfoCard label="Utilities" value={property.utilities} />
                  <InfoCard label="Lease Duration" value={property.leaseTerms} />
                </div>
              </section>

              <section>
                <h2 className="text-gray-800 dark:text-gray-200 text-xl font-bold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(a => (
                    <span key={a} className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      ✨ {a}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-brand-dark dark:bg-gray-800 rounded-2xl p-6 text-white overflow-hidden relative border dark:border-gray-700">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-brand-light" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" /></svg>
                    Dourr AI Insights
                  </h2>
                  <p className="text-brand-light/90 dark:text-gray-300 italic leading-relaxed">
                    "{insight}"
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/10 dark:bg-brand-light/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800 sticky top-24">
                <h3 className="text-gray-800 dark:text-gray-200 font-bold text-lg mb-4">Contact Landlord</h3>
                <div className="flex items-center gap-3 mb-6">
                  <img src="https://picsum.photos/seed/host/100" className="w-12 h-12 rounded-full" alt="Host" />
                  <div>
                    <div className="text-gray-800 dark:text-gray-200 font-bold">Aiman Hakim</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Verified Professional Host</div>
                  </div>
                </div>
                <button className="w-full bg-brand-dark dark:bg-brand-light text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-black dark:hover:bg-brand-mid transition-colors mb-3">
                  Contact via WhatsApp
                </button>
                <button className="w-full border-2 border-brand-dark dark:border-brand-light text-brand-dark dark:text-brand-light font-bold py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Send Inquiry
                </button>
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-4 px-4 uppercase tracking-tighter">
                  Fast Response Rate: Usually within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <MobileNav activePersona={activePersona} />
    </div>
  );
};

export default PropertyDetail;
