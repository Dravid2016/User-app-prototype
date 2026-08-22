import React, { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'yellow' | 'dark' | 'soft';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  padding = 'md',
}) => {
  const variantStyles = {
    default: 'bg-white border-black/10 text-[#111111] shadow-[0_6px_24px_rgba(17,17,17,0.06)]',
    yellow: 'bg-[#FFD21F] border-[#111111] text-[#111111] shadow-[0_8px_28px_rgba(255,210,31,0.25)]',
    dark: 'bg-[#111111] border-white/10 text-white shadow-[0_8px_30px_rgba(17,17,17,0.25)]',
    soft: 'bg-[#FAFAFA] border-black/5 text-[#111111] shadow-[0_4px_16px_rgba(17,17,17,0.04)]',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <article
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] border transition-all duration-200 ${
        variantStyles[variant]
      } ${paddingStyles[padding]} ${
        onClick
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(17,17,17,0.12)] active:scale-[0.985]'
          : ''
      } ${className}`}
    >
      {children}
    </article>
  );
};
