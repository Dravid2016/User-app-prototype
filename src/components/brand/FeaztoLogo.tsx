import React from 'react';

interface FeaztoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const FeaztoLogo: React.FC<FeaztoLogoProps> = ({
  size = 'md',
  onClick,
  className = '',
}) => {
  const heightMap = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${
        onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''
      } ${className}`}
      title="FEAZTO"
    >
      <img
        src="/brand/feazto-logo.png"
        alt="FEAZTO"
        className={`${heightMap[size]} w-auto object-contain block filter contrast-105`}
      />
    </div>
  );
};
