import React from 'react';

export const LiveStatusStrip: React.FC = () => {
  return (
    <div className="live-strip select-none">
      <span className="live-indicator" />
      <strong>LIVE IN CHENNAI</strong>
      <span className="live-divider">|</span>
      <span>42 Home Chefs Active</span>
      <span className="live-location">Anna Nagar</span>
    </div>
  );
};
