import React from 'react';
import { ChefSpotlightItem } from '../../data/chefSpotlights';
import { Rating } from '../common/Rating';

interface SpotlightCardProps {
  item: ChefSpotlightItem;
  isFav: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onAdd: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  item,
  isFav,
  onToggleFavorite,
  onAdd,
  onClick,
}) => {
  return (
    <article onClick={onClick} className="spotlight-card select-none cursor-pointer">
      <div className="spotlight-image-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="spotlight-image"
        />

        <span className="chef-badge">
          {item.chef}
        </span>

        <button
          className="favorite-button"
          aria-label="Save recipe"
          onClick={onToggleFavorite}
          type="button"
        >
          {isFav ? '★' : '+'}
        </button>
      </div>

      <div className="spotlight-content text-left">
        <div className="spotlight-meta">
          <span>{item.region}</span>
          <span>{item.prepTime}</span>
        </div>

        <h2>{item.title}</h2>
        <p>{item.description}</p>

        <button
          className="spotlight-add"
          onClick={onAdd}
          type="button"
        >
          Add
        </button>
      </div>
    </article>
  );
};
