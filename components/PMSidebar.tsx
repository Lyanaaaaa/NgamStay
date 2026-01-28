import React from 'react';
import Logo from './Logo';
import Icon from './Icon';
import { PMUser } from '../types';

interface PMSidebarProps {
  user: PMUser;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const PMSidebar: React.FC<PMSidebarProps> = ({ user, activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'listings', label: 'My Listings', iconType: 'home' as const },
    { id: 'add-listing', label: 'Add Property', iconType: 'plus' as const },
    { id: 'settings', label: 'Settings', iconType: 'settings' as const },
    { id: 'help', label: 'Help', iconType: 'help-circle' as const }
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Logo />
          <span className="text-xl font-black text-brand-dark dark:text-brand-light tracking-tighter">JIRAN</span>
        </div>
        <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Property Manager
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-dark to-brand-light rounded-xl flex items-center justify-center text-white font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        {user.isVerified && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-bold text-green-700 dark:text-green-400">Verified PM</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200
              ${activeTab === item.id
                ? 'bg-brand-light text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <Icon type={item.iconType} className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Stats */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Listings</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">{user.listingCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Published</span>
          <span className="text-lg font-bold text-brand-light">{user.approvedListingCount}</span>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <Icon type="log-out" className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default PMSidebar;
