import React from 'react';
import { X, Info, Star, Target, Zap, Globe, Shield, ShoppingBag, Sparkles, Clock, Gift, Copy } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export function EventDetailsModal({ evt, onClose }) {
  if (!evt) return null;

  const rawFeatured = evt.details?.featured || [];
  const cleanFeatured = rawFeatured.filter(f => 
    !f.toLowerCase().includes('will be in') && 
    !f.toLowerCase().includes('raid battle') && 
    f.length <= 45
  );

  // Helper to filter out long sentence paragraphs from scraped lists
  const filterCleanPokemonNames = (list) => {
    if (!Array.isArray(list)) return [];
    return list.filter(item => {
      const lower = item.toLowerCase();
      if (item.length > 60) return false;
      if (lower.includes('will appear') || lower.includes('reach major milestones') || lower.includes('you might find') || lower.includes('complete field research')) return false;
      return true;
    });
  };

  const wildEncountersList = evt.details?.['Wild Encounters'] || evt.details?.Spawns || [];
  const cleanWildSpawns = filterCleanPokemonNames(wildEncountersList);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }} onClick={onClose}>
      
      <div style={{
        background: 'var(--color-bg)',
        width: '100%',
        maxWidth: '560px',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease'
      }} onClick={e => e.stopPropagation()}>
        
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
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', lineHeight: '1.2' }}>{evt.name}</h2>
            <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
              {evt.start ? `${evt.start} to ${evt.end}` : (evt.date || evt.description)}
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
          
          {/* 1. Pokémon Debuts (Placed at the top) */}
          {['Pokémon Debuts', 'Mega-Evolved Pokémon', 'Max Pokémon Debuts'].map(sectionKey => {
            const rawList = evt.details?.[sectionKey];
            if (!rawList || rawList.length === 0) return null;
            const cleanDebuts = filterCleanPokemonNames(rawList);
            if (cleanDebuts.length === 0) return null;

            const isMega = sectionKey.includes('Mega');
            const isMax = sectionKey.includes('Max');
            const badgeBg = isMega ? 'rgba(236,72,153,0.1)' : (isMax ? 'rgba(139,92,246,0.1)' : 'rgba(99,102,241,0.1)');
            const badgeColor = isMega ? '#BE185D' : (isMax ? '#6D28D9' : '#4338CA');
            
            const featureImg = isMega 
              ? '/assets/events/twilight-mega-evolved.png' 
              : (isMax ? '/assets/events/twilight-max-pokemon.png' : '/assets/events/twilight-pokemon-debuts.png');

            return (
              <div key={sectionKey} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: badgeColor, fontSize: '1.05rem', fontWeight: '700' }}>
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
                    <span key={i} style={{ background: badgeBg, color: badgeColor, padding: '6px 14px', borderRadius: '999px', fontSize: '0.88rem', fontWeight: '600' }}>
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
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px 0', color: '#6366F1', fontSize: '1.05rem', fontWeight: '700' }}>
                <Star size={18} /> Wild Encounters
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cleanWildSpawns.map((item, i) => {
                  const isTimeHeader = item.toLowerCase().includes('a.m.') || item.toLowerCase().includes('p.m.');
                  if (isTimeHeader) {
                    return (
                      <div key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '6px', margin: '6px 0 2px 0', color: '#4F46E5', fontSize: '0.85rem', fontWeight: '700' }}>
                        <Clock size={14} /> {item}
                      </div>
                    );
                  }
                  return (
                    <span key={i} style={{ background: 'rgba(99,102,241,0.08)', color: '#4338CA', padding: '6px 12px', borderRadius: '999px', fontSize: '0.88rem', fontWeight: '500' }}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regional Exclusives */}
          {evt.details?.regions && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: '#3B82F6' }}>
                <Globe size={16} /> Regional Exclusives
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {evt.details.regions.map((r, i) => (
                  <span key={i} style={{ background: 'rgba(59,130,246,0.1)', color: '#1D4ED8', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Promo Codes */}
          {evt.details?.promoCodes && evt.details.promoCodes.length > 0 && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: '#EAB308' }}>
                <Gift size={16} /> Promo Codes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {evt.details.promoCodes.map((promo, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(234,179,8,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(234,179,8,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#A16207', fontSize: '1.05rem', fontFamily: 'monospace' }}>{promo.code}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(promo.code)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#CA8A04', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
                        title="Copy to clipboard"
                      >
                        <Copy size={14} /> COPY
                      </button>
                    </div>
                    {promo.description && (
                      <div style={{ fontSize: '0.9rem', color: '#854D0E' }}>
                        {promo.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Bonus removed */}

          {/* Featured Pokémon (if applicable and different from debuts) */}
          {cleanFeatured.length > 0 && !evt.details?.['Pokémon Debuts'] && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: 'var(--color-primary)' }}>
                <Star size={16} /> Featured Pokémon
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cleanFeatured.map((f, i) => (
                  <span key={i} style={{ background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: '500' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Type (for Raids) */}
          {evt.details?.type && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: '#8B5CF6' }}>
                <Shield size={16} /> Type
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(evt.details.type) ? evt.details.type : [evt.details.type]).map((t, i) => (
                  <span key={i} style={{ background: 'rgba(139,92,246,0.15)', color: '#6D28D9', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Event Bonuses removed */}

          {/* 3. Sales & Web Store Deals Section */}
          {evt.details?.Sales && evt.details.Sales.length > 0 && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px 0', color: '#059669', fontSize: '1.05rem', fontWeight: '700' }}>
                <ShoppingBag size={18} /> Sales & Web Store Deals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {evt.details.Sales.map((s, i) => {
                  const parts = s.split(' - ');
                  if (parts.length > 1) {
                    return (
                      <div key={i} style={{ background: 'rgba(16,185,129,0.08)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.9rem', color: '#065F46' }}>
                        <span style={{ fontWeight: '700', color: '#047857' }}>{parts[0]}</span>: {parts.slice(1).join(' - ')}
                      </div>
                    );
                  }
                  return (
                    <div key={i} style={{ background: 'rgba(16,185,129,0.08)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.9rem', color: '#065F46', fontWeight: '500' }}>
                      {s}
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
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: '#6366f1' }}>
                  <Star size={16} /> {sectionKey}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cleanItems.map((item, i) => (
                    <span key={i} style={{ background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.88rem' }}>
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
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--color-text-secondary)' }}>Weaknesses</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {evt.details.weaknesses.map((w, i) => (
                  <span key={i} style={{ background: '#fce8e8', color: '#d94444', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Counters */}
          {evt.details?.counters && (
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0', color: '#F59E0B' }}>
                <Target size={16} /> Top Counters
              </h4>
              <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {Array.isArray(evt.details.counters) ? evt.details.counters.join(', ') : evt.details.counters}
              </div>
            </div>
          )}

          {/* Advice */}
          {evt.details?.advice && (
            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <Info size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              {evt.details.advice}
            </div>
          )}

          {/* Difficulty */}
          {evt.details?.difficulty && (
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
              Difficulty: <span style={{ color: 'var(--color-primary)' }}>{evt.details.difficulty}</span>
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
