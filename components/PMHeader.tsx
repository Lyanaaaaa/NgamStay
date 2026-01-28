import React from 'react';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import { PMUser } from '../types';

interface PMHeaderProps {
  user: PMUser;
  onAddListing: () => void;
}

const PMHeader: React.FC<PMHeaderProps> = ({ user, onAddListing }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left - Mobile Logo */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="w-8 h-8 bg-brand-dark dark:bg-brand-light rounded-lg flex items-center justify-center text-white dark:text-gray-900 font-black text-sm italic">
            J
          </div>
          <span className="text-sm font-bold text-gray-400 dark:text-gray-500">PM</span>
        </div>

        {/* Center - Quick Add Button (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onAddListing}
            className="flex items-center gap-2 bg-brand-light hover:bg-brand-mid text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <Icon type="plus" className="w-5 h-5" />
            <span>Add New Listing</span>
          </button>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-brand-light hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200">
            <Icon type="bell" className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile User Avatar */}
          <div className="md:hidden w-8 h-8 bg-gradient-to-br from-brand-dark to-brand-light rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PMHeader;
