import React, { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  cols = 2,
  className = '',
}) => {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${colStyles[cols]} gap-3.5 ${className}`}>
      {children}
    </div>
  );
};
