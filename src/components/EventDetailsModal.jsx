import React, { useEffect } from 'react';
import { X, Info, Star, Target, Zap, Globe, Shield, ShoppingBag, Sparkles, Clock, Gift, Copy } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';
import { formatEventDateRange } from '../utils/date';

export function EventDetailsModal({ evt, onClose }) {
  if (!evt) return null;

  const rawFeatured = Array.isArray(evt.details?.featured) ? evt.details.featured : [];
  const cleanFeatured = rawFeatured.filter(f => 
    typeof f === 'string' &&
    !f.toLowerCase().includes('will be in') && 
    !f.toLowerCase().includes('raid battle') && 
    f.length <= 45
  );

  // Helper to filter out long sentence paragraphs from scraped lists
  const filterCleanPokemonNames = (list) => {
    if (!Array.isArray(list)) return [];
    return list.filter(item => {
      if (typeof item !== 'string') return false;
      const lower = item.toLowerCase();
      if (item.length > 60) return false;
      if (lower.includes('will appear') || lower.includes('reach major milestones') || lower.includes('you might find') || lower.includes('complete field research')) return false;
      return true;
    });
  };

  const wildEncountersList = evt.details?.['Wild Encounters'] || evt.details?.Spawns || [];
  const cleanWildSpawns = filterCleanPokemonNames(wildEncountersList);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '24px'
    }} onClick={onClose}>
      
      <div 
        className="event-modal-dialog"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
      >
        
        {/* Header */}
        <div style={{
          background: evt.typeColor || evt.color || evt.iconColor || 'var(--color-primary)',
          padding: '24px',
          color: 'white',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {evt.imageUrl && (
            <img 
              src={getAssetUrl(evt.imageUrl)} 
              alt={evt.name} 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }} 
            />
          )}
          <div>
            <h2 id="event-modal-title" style={{ margin: '0 0 8px 0', fontSize: '1.5rem', lineHeight: '1.2' }}>{evt.name}</h2>
            <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              {evt.start ? formatEventDateRange(evt.start, evt.end, evt.type) : (evt.date || evt.description)}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(0,0,0,0.2)', border: 'none', color: 'white',
              borderRadius: '50%', padding: '6px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* Regional Exclusives (Top Priority) */}
          {(evt.details?.regions || evt.regions) && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#60A5FA' }}>
                <Globe size={18} /> Regional Exclusives
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(evt.details?.regions || evt.regions).map((r, i) => (
                  <span key={i} className="modal-region-chip">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 1. Pokémon Debuts */}
          {['Pokémon Debuts', 'Mega-Evolved Pokémon', 'Max Pokémon Debuts'].map(sectionKey => {
            const rawList = evt.details?.[sectionKey];
            if (!rawList || rawList.length === 0) return null;
            const cleanDebuts = filterCleanPokemonNames(rawList);
            if (cleanDebuts.length === 0) return null;

            const isMega = sectionKey.includes('Mega');
            const isMax = sectionKey.includes('Max');
            const titleColor = isMega ? '#F472B6' : (isMax ? '#A78BFA' : '#818CF8');
            
            const featureImg = isMega 
              ? '/assets/events/twilight-mega-evolved.png' 
              : (isMax ? '/assets/events/twilight-max-pokemon.png' : '/assets/events/twilight-pokemon-debuts.png');

            return (
              <div key={sectionKey} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 className="modal-section-title" style={{ color: titleColor }}>
                  {isMega || isMax ? <Zap size={18} /> : <Sparkles size={18} />} {sectionKey}
                </h4>

                {evt.name.toLowerCase().includes('twilight') && (
                  <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#F8FAFC', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                    <img 
                      src={getAssetUrl(featureImg)} 
                      alt={sectionKey} 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cleanDebuts.map((item, i) => (
                    <span key={i} className="modal-chip-neutral" style={{ fontWeight: '600' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 2. Wild Encounters Section */}
          {cleanWildSpawns.length > 0 && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#818CF8' }}>
                <Star size={18} /> Wild Encounters
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cleanWildSpawns.map((item, i) => {
                  const isTimeHeader = item.toLowerCase().includes('a.m.') || item.toLowerCase().includes('p.m.');
                  if (isTimeHeader) {
                    return (
                      <div key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '6px', margin: '6px 0 2px 0', color: '#818CF8', fontSize: '0.85rem', fontWeight: '700' }}>
                        <Clock size={14} /> {item}
                      </div>
                    );
                  }
                  return (
                    <span key={i} className="modal-chip-neutral">
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Promo Codes */}
          {evt.details?.promoCodes && evt.details.promoCodes.length > 0 && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#FACC15' }}>
                <Gift size={18} /> Promo Codes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {evt.details.promoCodes.map((promo, i) => (
                  <div key={i} className="modal-promo-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.05rem', fontFamily: 'monospace' }}>{promo.code}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(promo.code)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
                        title="Copy to clipboard"
                      >
                        <Copy size={14} /> COPY
                      </button>
                    </div>
                    {promo.description && (
                      <div style={{ fontSize: '0.9rem', marginTop: '4px', opacity: 0.9 }}>
                        {promo.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Pokémon (if applicable and different from debuts) */}
          {cleanFeatured.length > 0 && !evt.details?.['Pokémon Debuts'] && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#F87171' }}>
                <Star size={18} /> Featured Pokémon
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cleanFeatured.map((f, i) => (
                  <span key={i} className="modal-chip-neutral" style={{ fontWeight: '600' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Type (for Raids) */}
          {evt.details?.type && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#A78BFA' }}>
                <Shield size={18} /> Type
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(evt.details.type) ? evt.details.type : [evt.details.type]).map((t, i) => (
                  <span key={i} className="modal-type-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Event Bonuses */}
          {(evt.details?.bonuses || evt.details?.Bonuses) && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#FB923C' }}>
                <Gift size={18} /> Event Bonuses
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(Array.isArray(evt.details.bonuses || evt.details.Bonuses)
                  ? (evt.details.bonuses || evt.details.Bonuses)
                  : [evt.details.bonuses || evt.details.Bonuses]
                ).map((b, i) => (
                  <div key={i} className="modal-bonus-box">
                    {typeof b === 'object' ? JSON.stringify(b) : b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timed Research & Special Challenges */}
          {['Timed Research', 'Timed Research: Pick Your Side', 'Field Research', 'Collection Challenges'].map(sectionKey => {
            const rawItems = evt.details?.[sectionKey];
            if (!rawItems || (Array.isArray(rawItems) && rawItems.length === 0)) return null;
            const items = Array.isArray(rawItems) ? rawItems : [rawItems];
            return (
              <div key={sectionKey}>
                <h4 className="modal-section-title" style={{ color: '#818CF8' }}>
                  <Target size={18} /> {sectionKey}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map((item, i) => (
                    <div key={i} className="modal-research-box">
                      {typeof item === 'object' ? JSON.stringify(item) : item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Sales & Web Store Deals Section */}
          {evt.details?.Sales && (Array.isArray(evt.details.Sales) ? evt.details.Sales.length > 0 : true) && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#34D399' }}>
                <ShoppingBag size={18} /> Sales & Web Store Deals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(Array.isArray(evt.details.Sales) ? evt.details.Sales : [evt.details.Sales]).map((s, i) => {
                  const saleStr = typeof s === 'string' ? s : JSON.stringify(s);
                  const parts = saleStr.split(' - ');
                  if (parts.length > 1) {
                    return (
                      <div key={i} className="modal-sale-box">
                        <strong style={{ color: 'inherit' }}>{parts[0]}</strong>: {parts.slice(1).join(' - ')}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="modal-sale-box">
                      {saleStr}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other sections like Eggs / New Items if present */}
          {['Eggs', 'New Items'].map(sectionKey => {
            if (!evt.details?.[sectionKey] || evt.details[sectionKey].length === 0) return null;
            const cleanItems = filterCleanPokemonNames(evt.details[sectionKey]);
            if (cleanItems.length === 0) return null;
            return (
              <div key={sectionKey}>
                <h4 className="modal-section-title" style={{ color: '#818CF8' }}>
                  <Star size={18} /> {sectionKey}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cleanItems.map((item, i) => (
                    <span key={i} className="modal-chip-neutral">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Weaknesses */}
          {evt.details?.weaknesses && (
            <div>
              <h4 className="modal-section-title" style={{ color: 'var(--color-text-secondary)' }}>
                Weaknesses
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(evt.details.weaknesses) ? evt.details.weaknesses : [evt.details.weaknesses]).map((w, i) => (
                  <span key={i} className="modal-weakness-chip">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Counters */}
          {evt.details?.counters && (
            <div>
              <h4 className="modal-section-title" style={{ color: '#F59E0B' }}>
                <Target size={18} /> Top Counters
              </h4>
              <div className="modal-counters-container">
                {(Array.isArray(evt.details.counters) 
                  ? evt.details.counters 
                  : (typeof evt.details.counters === 'string' ? evt.details.counters.split(',').map(s => s.trim()).filter(Boolean) : [evt.details.counters])
                ).map((c, i) => (
                  <span key={i} className="modal-counter-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Advice */}
          {evt.details?.advice && (
            <div className="modal-advice-box">
              <Info size={16} style={{ verticalAlign: 'middle', marginRight: '6px', display: 'inline-block' }} />
              {evt.details.advice}
            </div>
          )}

          {/* Difficulty */}
          {evt.details?.difficulty && (
            <div style={{ fontSize: '0.92rem', fontWeight: 'bold' }}>
              Difficulty: <span style={{ color: '#EF4444', fontWeight: '800' }}>{evt.details.difficulty}</span>
            </div>
          )}

          {!evt.details && !evt.bonus && (
            <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '20px' }}>
              No additional details available for this event.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
