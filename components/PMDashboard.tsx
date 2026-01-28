import React, { useState } from 'react';
import Icon from './Icon';
import PMSidebar from './PMSidebar';
import PMHeader from './PMHeader';
import PMListingCard from './PMListingCard';
import EmptyState from './EmptyState';
import { PMUser, Listing, ListingStatus } from '../types';

interface PMDashboardProps {
  user: PMUser;
  listings: Listing[];
  onAddListing: () => void;
  onEditListing: (listing: Listing) => void;
  onToggleAvailability: (listingId: string) => void;
  onLogout: () => void;
  onUpdateUser: (user: PMUser) => void;
  onUpdateListings: (listings: Listing[]) => void;
}

const PMDashboard: React.FC<PMDashboardProps> = ({
  user,
  listings,
  onAddListing,
  onEditListing,
  onToggleAvailability,
  onLogout,
  onUpdateUser,
  onUpdateListings
}) => {
  const [activeTab, setActiveTab] = useState('listings');

  const stats = {
    total: listings.length,
    published: listings.filter(l => l.status === ListingStatus.PUBLISHED && l.isAvailable).length,
    pending: listings.filter(l => l.status === ListingStatus.PENDING_REVIEW).length,
    draft: listings.filter(l => l.status === ListingStatus.DRAFT).length
  };

  const renderContent = () => {
    if (activeTab === 'add-listing') {
      onAddListing();
      setActiveTab('listings');
      return null;
    }

    if (activeTab === 'settings') {
      return (
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Account Type
                </label>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-brand-light/10 rounded-lg text-brand-dark dark:text-brand-light font-semibold">
                    {user.accountType}
                  </span>
                  {user.isVerified && (
                    <span className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400 font-semibold text-sm">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'help') {
      return (
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Help & Support</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Getting Started</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Click "Add New Listing" to create your first property listing</li>
                <li>• Upload clear photos and provide accurate details</li>
                <li>• {user.isVerified ? 'Your listings are auto-verified' : 'First 3 listings will be reviewed within 24-48 hours'}</li>
                <li>• Toggle availability when your property is occupied or vacant</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Contact Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Need help? Reach out to our support team:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Email:</span> support@jiran.com
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">WhatsApp:</span> +60 12-345 6789
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Listings view (default)
    return (
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-light/10 rounded-xl flex items-center justify-center">
                <Icon type="building" className="w-5 h-5 text-brand-light" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Listings</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <Icon type="trending-up" className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.published}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Published</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <Icon type="eye" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pending Review</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Icon type="eye" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.draft}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Drafts</p>
          </div>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <EmptyState
            icon=""
            title="No listings yet"
            message="Start by adding your first property listing"
          >
            <button
              onClick={onAddListing}
              className="mt-6 inline-flex items-center gap-2 bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <Icon type="plus" className="w-5 h-5" />
              <span>Add Your First Listing</span>
            </button>
          </EmptyState>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Listings</h2>
              <button
                onClick={onAddListing}
                className="md:hidden flex items-center gap-2 bg-brand-light hover:bg-brand-mid text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-200"
              >
                <Icon type="plus" className="w-5 h-5" />
                <span>Add</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {listings.map(listing => (
                <PMListingCard
                  key={listing.id}
                  listing={listing}
                  isVerifiedPM={user.isVerified}
                  onEdit={onEditListing}
                  onToggleAvailability={onToggleAvailability}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex">
      <PMSidebar
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <PMHeader user={user} onAddListing={onAddListing} />

        <main className="flex-1 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PMDashboard;
