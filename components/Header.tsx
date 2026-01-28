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
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  filterType,
  onFilterChange,
  propertyTypes = [],
  showFilters = true
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
        <ThemeToggle />
        {showFilters && filterType && onFilterChange && propertyTypes.length > 0 && (
          <>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            {propertyTypes.map(t => (
              <FilterButton
                key={t}
                label={t}
                active={filterType === t}
                onClick={() => onFilterChange(t)}
              />
            ))}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
