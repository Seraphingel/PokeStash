import React from 'react';
import { getAssetUrl } from '../utils/assets';

const FALLBACK_SRC = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1401.png';

/**
 * Reusable PokéCoin image with automatic fallback to the PokeMiners CDN.
 * Centralizes the repeated onError pattern used across Shop and App.
 */
export function PokeCoinImg({ size = 18, className = '', style = {}, alt = 'PokéCoin' }) {
  return (
    <img 
      src={getAssetUrl('/assets/items/pokecoin.png')} 
      alt={alt}
      className={className}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        objectFit: 'contain',
        ...style 
      }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_SRC;
      }}
    />
  );
}
