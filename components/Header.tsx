import React from 'react';
import SearchInput from './SearchInput';
import ViewToggle from './ViewToggle';
import FilterButton from './FilterButton';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  view?: 'list' | 'map';
  onViewChange?: (view: 'list' | 'map') => void;
  filterType?: string;
  onFilterChange?: (type: string) => void;
  propertyTypes?: string[];
  showFilters?: boolean;
  onListPropertyClick?: () => void;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  filterType,
  onFilterChange,
  propertyTypes = [],
  showFilters = true,
  onListPropertyClick,
  onLoginClick
}) => {
  return (
    <header className="p-4 md:p-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-30 flex flex-col md:flex-row gap-4 justify-between items-center">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search Bangsar, Subang..."
      />

      {showFilters && view && onViewChange && (
        <ViewToggle view={view} onViewChange={onViewChange} />
      )}

      <div className="hidden md:flex gap-2 items-center">
        {showFilters && filterType && onFilterChange && propertyTypes.length > 0 && (
          <>
            {propertyTypes.map(t => (
              <FilterButton
                key={t}
                label={t}
                active={filterType === t}
                onClick={() => onFilterChange(t)}
              />
            ))}
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
          </>
        )}
        <ThemeToggle />
        {(onListPropertyClick || onLoginClick) && (
          <>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            {onListPropertyClick && (
              <button
                onClick={onListPropertyClick}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-light dark:hover:text-brand-light hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                List a property
              </button>
            )}
            {onLoginClick && (
              <button
                onClick={onLoginClick}
                className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-brand-dark to-brand-mid hover:from-brand-mid hover:to-brand-dark rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
