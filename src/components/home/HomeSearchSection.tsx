import React from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface HomeSearchSectionProps {
  location?: string;
  onLocationClick?: () => void;
  onSearch?: (value: string) => void;
}

export const HomeSearchSection: React.FC<HomeSearchSectionProps> = ({
  location = "Anna Nagar, Chennai",
  onLocationClick,
  onSearch,
}) => {
  const { page, setPage, searchTerm, setSearchTerm, showToast } = useAppStore();

  const handleLocationClick = onLocationClick || (() => {
    showToast(`Location set to ${location}`);
  });

  const handleSearchChange = (value: string) => {
    if (onSearch) {
      onSearch(value);
    } else {
      setSearchTerm(value);
      if (value && page !== 'explore') {
        setPage('explore');
      }
    }
  };

  return (
    <div className="home-search-section select-none">
      {/* Context Row: Location & Tagline */}
      <div className="home-search-context">
        <button
          type="button"
          className="home-search-location"
          onClick={handleLocationClick}
          aria-label={`Change location. Current location: ${location}`}
        >
          <MapPin size={11} strokeWidth={2} className="text-[#111111] fill-[#FFD21F]" />
          <span>{location}</span>
          <ChevronDown size={10} strokeWidth={2} />
        </button>

        <span className="home-search-tagline">
          food · culture · connect
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="home-search-bar">
        <Search
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchTerm}
          placeholder="Search homemade & regional food..."
          aria-label="Search homemade and regional food"
          onChange={(event) => handleSearchChange(event.target.value)}
        />
      </div>
    </div>
  );
};
