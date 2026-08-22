import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search homemade & regional food...',
  autoFocus = false,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        size={18}
        className="absolute left-4 text-[#111111]/60 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full h-12 pl-11 pr-10 bg-[#FAFAFA] text-[#111111] placeholder:text-[#707070] text-sm font-semibold rounded-[18px] border-2 border-black/10 focus:border-[#111111] focus:bg-white focus:outline-none transition-all shadow-inner"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
