
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { SAMPLE_PROPERTIES, PERSONAS } from './constants';
import { Property, PersonaType, UserPersona, PMUser, Listing, ListingStatus } from './types';
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
import PMAuth from './components/PMAuth';
import PMOnboarding from './components/PMOnboarding';
import PMDashboard from './components/PMDashboard';
import PMListingForm from './components/PMListingForm';
import { ThemeProvider } from './contexts/ThemeContext';

const LandingPage = ({
  onSelectPersona,
  onSelectPMMode
}: {
  onSelectPersona: (p: UserPersona) => void;
  onSelectPMMode: () => void;
}) => (
  <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
    <div className="absolute top-6 right-6">
      <ThemeToggle />
    </div>

    {/* PM Link - Top Left */}
    <div className="absolute top-6 left-6">
      <button
        onClick={onSelectPMMode}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-brand-light font-semibold rounded-xl hover:border-brand-light hover:shadow-lg transition-all duration-200"
      >
        List Your Property (Free)
      </button>
    </div>

    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Logo />
        <span className="text-3xl font-black text-brand-dark dark:text-brand-light tracking-tighter">Dourr</span>
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

const Dashboard = ({
  activePersona,
  onListPropertyClick,
  onLoginClick
}: {
  activePersona: UserPersona;
  onListPropertyClick: () => void;
  onLoginClick: () => void;
}) => {
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
          onListPropertyClick={onListPropertyClick}
          onLoginClick={onLoginClick}
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
  // Tenant mode state
  const [activePersona, setActivePersona] = useState<UserPersona | null>(null);

  // PM mode state
  const [pmMode, setPMMode] = useState(false);
  const [pmUser, setPMUser] = useState<PMUser | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pmListings, setPMListings] = useState<Listing[]>([]);
  const [showListingForm, setShowListingForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [autoOpenListingForm, setAutoOpenListingForm] = useState(false);

  const handlePMAuthSuccess = (user: PMUser) => {
    setPMUser(user);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (autoOpenListingForm) {
      setShowListingForm(true);
      setAutoOpenListingForm(false);
    }
  };

  const handleAddListing = () => {
    setEditingListing(null);
    setShowListingForm(true);
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing);
    setShowListingForm(true);
  };

  const handleSaveListing = (listingData: Partial<Listing>, isDraft: boolean) => {
    const updatedUser = { ...pmUser! };

    if (editingListing) {
      // Update existing listing
      const updatedListings = pmListings.map(l =>
        l.id === editingListing.id ? { ...l, ...listingData } : l
      );
      setPMListings(updatedListings);

      // Update counts
      updatedUser.listingCount = updatedListings.length;
      updatedUser.approvedListingCount = updatedListings.filter(
        l => l.status === ListingStatus.PUBLISHED || l.status === ListingStatus.APPROVED
      ).length;
    } else {
      // Add new listing
      const newListing = listingData as Listing;
      const updatedListings = [...pmListings, newListing];
      setPMListings(updatedListings);

      // Update counts
      updatedUser.listingCount = updatedListings.length;
      updatedUser.approvedListingCount = updatedListings.filter(
        l => l.status === ListingStatus.PUBLISHED || l.status === ListingStatus.APPROVED
      ).length;
    }

    setPMUser(updatedUser);
    setShowListingForm(false);
    setEditingListing(null);
  };

  const handleToggleAvailability = (listingId: string) => {
    const updatedListings = pmListings.map(l =>
      l.id === listingId ? { ...l, isAvailable: !l.isAvailable } : l
    );
    setPMListings(updatedListings);
  };

  const handlePMLogout = () => {
    setPMUser(null);
    setPMMode(false);
    setPMListings([]);
    setShowOnboarding(false);
    setShowListingForm(false);
    setEditingListing(null);
    setAutoOpenListingForm(false);
  };

  const handleSelectPMMode = () => {
    setPMMode(true);
    setActivePersona(null);
  };

  const handleListPropertyClick = () => {
    setAutoOpenListingForm(true);
    setPMMode(true);
  };

  const handleLoginClick = () => {
    setAutoOpenListingForm(false);
    setPMMode(true);
  };

  const handleBackToTenantMode = () => {
    setPMMode(false);
    setActivePersona(null);
    handlePMLogout();
  };

  return (
    <ThemeProvider>
      <HashRouter>
        {/* Property Manager Flow */}
        {pmMode ? (
          <>
            {!pmUser ? (
              <PMAuth onAuthSuccess={handlePMAuthSuccess} onClose={() => setPMMode(false)} />
            ) : showOnboarding ? (
              <PMOnboarding user={pmUser} onComplete={handleOnboardingComplete} />
            ) : (
              <>
                <PMDashboard
                  user={pmUser}
                  listings={pmListings}
                  onAddListing={handleAddListing}
                  onEditListing={handleEditListing}
                  onToggleAvailability={handleToggleAvailability}
                  onLogout={handlePMLogout}
                  onUpdateUser={setPMUser}
                  onUpdateListings={setPMListings}
                />
                {showListingForm && (
                  <PMListingForm
                    user={pmUser}
                    listing={editingListing}
                    onSave={handleSaveListing}
                    onCancel={() => {
                      setShowListingForm(false);
                      setEditingListing(null);
                    }}
                  />
                )}
              </>
            )}
          </>
        ) : (
          /* Tenant Flow */
          !activePersona ? (
            <LandingPage
              onSelectPersona={setActivePersona}
              onSelectPMMode={handleSelectPMMode}
            />
          ) : (
            <Dashboard
              activePersona={activePersona}
              onListPropertyClick={handleListPropertyClick}
              onLoginClick={handleLoginClick}
            />
          )
        )}
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;