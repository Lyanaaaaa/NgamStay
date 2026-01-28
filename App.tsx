
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
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import { ThemeProvider } from './contexts/ThemeContext';

const LandingPage = ({ onSelectPersona }: { onSelectPersona: (p: UserPersona) => void }) => (
  <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
    <div className="absolute top-6 right-6">
      <ThemeToggle />
    </div>
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Logo />
        <span className="text-3xl font-black text-brand-dark dark:text-brand-light tracking-tighter">JIRAN</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        Rent your way, <br /><span className="text-brand-light">the smart way.</span>
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
        Malaysia's first lifestyle-first rental platform designed for the modern generation.
      </p>
    </div>

    <div className="w-full max-w-6xl">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Choose your profile to start discovery</p>
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
    <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col md:flex-row">
      <Sidebar activePersona={activePersona} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          view={view}
          onViewChange={setView}
          filterType={filterType}
          onFilterChange={setFilterType}
          propertyTypes={propertyTypes}
          showFilters={true}
        />

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
          {view === 'list' ? (
            <div className="w-full">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-sm font-bold text-brand-light uppercase tracking-widest mb-1">Recommended for {activePersona.name}</h2>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Handpicked Rentals</h1>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{filteredProperties.length} Properties found</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
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
          activePersona={activePersona}
        />
      )}

      <MobileNav activePersona={activePersona} />
    </div>
  );
};

const App = () => {
  const [activePersona, setActivePersona] = useState<UserPersona | null>(null);

  return (
    <ThemeProvider>
      <HashRouter>
        {!activePersona ? (
          <LandingPage onSelectPersona={setActivePersona} />
        ) : (
          <Dashboard activePersona={activePersona} />
        )}
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;