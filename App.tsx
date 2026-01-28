
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { SAMPLE_PROPERTIES, PERSONAS } from './constants';
import { Property, PersonaType, UserPersona } from './types';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import MapView from './components/MapView';

const LandingPage = ({ onSelectPersona }: { onSelectPersona: (p: UserPersona) => void }) => (
  <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center text-white font-black text-xl italic">J</div>
        <span className="text-3xl font-black text-brand-dark tracking-tighter">JIRAN</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Rent your way, <br /><span className="text-brand-light">the smart way.</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-lg mx-auto">
        Malaysia's first lifestyle-first rental platform designed for the modern generation.
      </p>
    </div>

    <div className="w-full max-w-4xl">
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Choose your profile to start discovery</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERSONAS.map(p => (
          <button 
            key={p.id}
            onClick={() => onSelectPersona(p)}
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 text-left"
          >
            <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
            <p className="text-brand-mid font-medium text-sm mb-4">{p.role}</p>
            <div className="space-y-2">
              {p.preferences.map(pref => (
                <div key={pref} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1 h-1 bg-brand-light rounded-full"></span>
                  {pref}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = ({ activePersona }: { activePersona: UserPersona }) => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All' || p.type.includes(filterType);
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const propertyTypes = ['All', 'Serviced Apartment', 'Condo', 'Room Rental', 'Duplex'];

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-20 flex-col items-center py-8 bg-white border-r gap-8 sticky top-0 h-screen">
        <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center text-white font-black italic">J</div>
        <nav className="flex flex-col gap-8">
          <button className="text-brand-dark"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></button>
          <button className="text-gray-300 hover:text-brand-mid transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
          <button className="text-gray-300 hover:text-brand-mid transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
          <button className="text-gray-300 hover:text-brand-mid transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
        </nav>
        <div className="mt-auto">
          <img src={activePersona.avatar} className="w-10 h-10 rounded-full border-2 border-brand-light" alt="Profile" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="p-4 md:p-6 bg-white border-b sticky top-0 z-30 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96 relative">
            <input 
              type="text" 
              placeholder="Search Bangsar, Subang..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-light transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border">
            <button 
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'list' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-400'}`}
            >
              List
            </button>
            <button 
              onClick={() => setView('map')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'map' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-400'}`}
            >
              Map
            </button>
          </div>

          <div className="hidden md:flex gap-4">
            {propertyTypes.map(t => (
              <button 
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === t ? 'bg-brand-dark text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
          {view === 'list' ? (
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-1">Recommended for {activePersona.name}</h2>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">Handpicked Rentals</h1>
                </div>
                <div className="text-gray-500 text-sm font-medium">{filteredProperties.length} Properties found</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map(p => (
                  <PropertyCard 
                    key={p.id} 
                    property={p} 
                    onClick={setSelectedProperty} 
                  />
                ))}
                {filteredProperties.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="text-4xl mb-4">🏠</div>
                    <h3 className="text-xl font-bold text-gray-900">No properties found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <MapView 
              properties={filteredProperties} 
              onSelectProperty={setSelectedProperty} 
            />
          )}
        </div>
      </main>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t flex justify-around p-4 z-40">
        <button className="text-brand-dark"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></button>
        <button className="text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
        <button className="text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
        <img src={activePersona.avatar} className="w-6 h-6 rounded-full" alt="Me" />
      </nav>
    </div>
  );
};

const App = () => {
  const [activePersona, setActivePersona] = useState<UserPersona | null>(null);

  return (
    <HashRouter>
      {!activePersona ? (
        <LandingPage onSelectPersona={setActivePersona} />
      ) : (
        <Dashboard activePersona={activePersona} />
      )}
    </HashRouter>
  );
};

export default App;
