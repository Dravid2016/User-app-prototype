import React from 'react';
import { useAppStore } from '../../store/appStore';

interface ActionItem {
  label: string;
  type: 'diet' | 'food' | 'cook';
  route: string;
}

const actions: ActionItem[] = [
  { label: "Diet Meal", type: "diet", route: "explore" },
  { label: "Food App", type: "food", route: "explore" },
  { label: "Book Cook", type: "cook", route: "book-a-cook" },
];

export const QuickActionBar: React.FC = () => {
  const { setPage } = useAppStore();

  return (
    <div className="quick-actions select-none">
      {actions.map((action) => (
        <button
          key={action.type}
          onClick={() => setPage(action.route as any)}
          className="quick-action"
          data-type={action.type}
          type="button"
        >
          <span className="quick-action-dot" />
          {action.label}
        </button>
      ))}
    </div>
  );
};
