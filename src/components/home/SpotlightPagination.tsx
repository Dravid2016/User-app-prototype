import React from 'react';

interface SpotlightPaginationProps {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const SpotlightPagination: React.FC<SpotlightPaginationProps> = ({
  activeIndex,
  total,
  onPrev,
  onNext,
  onDotClick,
}) => {
  return (
    <div className="spotlight-controls select-none">
      <button 
        onClick={onPrev} 
        className="spotlight-nav"
        type="button"
      >
        ← PREV
      </button>

      <div className="pagination-dots">
        {Array.from({ length: total }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            onClick={() => onDotClick(dotIndex)}
            className={
              dotIndex === activeIndex
                ? "pagination-dot active"
                : "pagination-dot"
            }
          />
        ))}
      </div>

      <button 
        onClick={onNext} 
        className="spotlight-nav"
        type="button"
      >
        NEXT →
      </button>
    </div>
  );
};
