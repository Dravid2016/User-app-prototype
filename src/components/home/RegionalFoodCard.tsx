import React from 'react';
import { RegionalFood } from '../../data/regionalFoods';
import { useAppStore } from '../../store/appStore';

interface RegionalFoodCardProps {
  region: RegionalFood;
}

export const RegionalFoodCard: React.FC<RegionalFoodCardProps> = ({ region }) => {
  const { setSelectedRegion, setPage } = useAppStore();

  const handleClick = () => {
    setSelectedRegion(region.id);
    setPage('regional-food');
  };

  return (
    <article
      onClick={handleClick}
      className="regional-item select-none cursor-pointer group flex flex-col"
    >
      <div className="regional-card-image-wrap">
        <img
          src={region.image}
          alt={region.name}
          className="regional-card-img"
        />
        <span className="regional-card-badge">
          {region.name}
        </span>
      </div>

      <div className="regional-card-content text-left">
        <h4 className="regional-card-name">{region.name}</h4>
        <p className="regional-card-subtitle">{region.subtitle}</p>
      </div>
    </article>
  );
};
