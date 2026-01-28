
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { SAMPLE_PROPERTIES, PERSONAS } from './constants';
import { Property, PersonaType, UserPersona } from './types';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import MapView from './components/MapView';
import Logo from './components/Logo';
import NavIcon from './components/NavIcon';
import ViewToggle from './components/ViewToggle';
import FilterButton from './components/FilterButton';
import SearchInput from './components/SearchInput';
import PersonaCard from './components/PersonaCard';
import EmptyState from './components/EmptyState';

const LandingPage = ({ onSelectPersona }: { onSelectPersona: (p: UserPersona) => void }) => (
  <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Logo />
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
          <PersonaCard key={p.id} persona={p} onSelect={onSelectPersona} />
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
        <Logo />
        <nav className="flex flex-col gap-8">
          <NavIcon type="home" active={true} />
          <NavIcon type="search" />
          <NavIcon type="heart" />
          <NavIcon type="clock" />
        </nav>
        <div className="mt-auto">
          <img src={activePersona.avatar} className="w-10 h-10 rounded-full border-2 border-brand-light" alt="Profile" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="p-4 md:p-6 bg-white border-b sticky top-0 z-30 flex flex-col md:flex-row gap-4 justify-between items-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Bangsar, Subang..."
          />

          <ViewToggle view={view} onViewChange={setView} />

          <div className="hidden md:flex gap-4">
            {propertyTypes.map(t => (
              <FilterButton
                key={t}
                label={t}
                active={filterType === t}
                onClick={() => setFilterType(t)}
              />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    onClick={setSelectedProperty}
                  />
                ))}
                {filteredProperties.length === 0 && (
                  <EmptyState
                    icon="🏠"
                    title="No properties found"
                    message="Try adjusting your filters or search query"
                  />
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
        <NavIcon type="home" active={true} />
        <NavIcon type="search" />
        <NavIcon type="heart" />
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
