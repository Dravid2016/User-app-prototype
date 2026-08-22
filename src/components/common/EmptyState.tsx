import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { BentoButton } from '../bento/BentoButton';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-[#FAFAFA] rounded-[24px] border-2 border-dashed border-black/10 my-4">
      <div className="w-16 h-16 rounded-2xl bg-[#FFD21F] text-[#111111] flex items-center justify-center mb-4 border-2 border-[#111111] shadow-[0_4px_16px_rgba(255,210,31,0.3)]">
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <h3 className="text-lg font-black text-[#111111] mb-1">{title}</h3>
      <p className="text-xs font-medium text-[#707070] max-w-xs mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <BentoButton variant="primary" onClick={onAction}>
          {actionText}
        </BentoButton>
      )}
      {children}
    </div>
  );
};
