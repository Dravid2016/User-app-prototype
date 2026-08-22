import React, { ReactNode } from 'react';

interface BentoSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  onAction?: () => void;
  children: ReactNode;
  className?: string;
}

export const BentoSection: React.FC<BentoSectionProps> = ({
  title,
  subtitle,
  badge,
  actionText,
  onAction,
  children,
  className = '',
}) => {
  return (
    <section className={`mb-6 ${className}`}>
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          {badge && (
            <span className="inline-block px-2.5 py-0.5 mb-1 text-[10px] font-extrabold uppercase letter-spacing-wider bg-[#FFD21F] text-[#111111] rounded-full">
              {badge}
            </span>
          )}
          <h2 className="text-lg font-black text-[#111111] tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-medium text-[#707070] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actionText && (
          <button
            onClick={onAction}
            className="text-xs font-bold text-[#111111] hover:underline cursor-pointer py-1"
          >
            {actionText} →
          </button>
        )}
      </div>
      {children}
    </section>
  );
};
