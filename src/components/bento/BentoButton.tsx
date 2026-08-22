import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface BentoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const BentoButton: React.FC<BentoButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#FFD21F] text-[#111111] border-2 border-[#111111] hover:bg-[#FFCC00] shadow-[0_4px_14px_rgba(255,210,31,0.3)]',
    secondary: 'bg-[#FAFAFA] text-[#111111] border border-[#E8E8E8] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    dark: 'bg-[#111111] text-white border-2 border-[#111111] hover:bg-black shadow-[0_4px_16px_rgba(17,17,17,0.2)]',
    outline: 'bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111]/5',
  };

  const sizeStyles = {
    sm: 'min-h-10 px-4 py-2 text-xs font-bold rounded-[14px]',
    md: 'min-h-12 px-5 py-3 text-sm font-bold rounded-[18px]',
    lg: 'min-h-14 px-6 py-3.5 text-base font-extrabold rounded-[22px]',
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 text-center transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none ${
        fullWidth ? 'w-full' : ''
      } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
