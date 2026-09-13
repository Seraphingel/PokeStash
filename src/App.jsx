import React from 'react';
import { usePokecoins } from './hooks/usePokecoins';
import { Shop } from './components/Shop';
import { EventCard } from './components/EventCard';
import { Coins, CheckCircle, Circle } from 'lucide-react';
import './index.css';

function App() {
  const { coins, todayClaimed, toggleTodayClaim, deductCoins, DAILY_COINS } = usePokecoins();

  return (
    <div>
      <div className="pokedex-header" style={{ borderRadius: '0 0 24px 24px', marginBottom: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Pokedex OS</h1>
            <p style={{ margin: 0, opacity: 0.8 }}>Companion App • Sept 2026</p>
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '12px 24px', 
            borderRadius: '999px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Coins size={24} color="#FCD34D" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{coins}</span>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        
        {/* Daily Claim Status Card */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Daily Bonus
          </h2>
          <div style={{ 
            background: 'white', 
            borderRadius: 'var(--border-radius-md)', 
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>+{DAILY_COINS} Pokecoins</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                Resets at 12:00 PM
              </div>
            </div>
            
            <button 
              onClick={toggleTodayClaim}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: todayClaimed ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {todayClaimed ? <CheckCircle size={48} /> : <Circle size={48} />}
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '16px', textAlign: 'center' }}>
            Check or uncheck manually. It automatically claims every 12 PM.
          </p>
        </div>

        {/* Shop Simulator Card */}
        <div className="bento-col-span-2">
          <Shop coins={coins} deductCoins={deductCoins} />
        </div>

        {/* Events Card */}
        <EventCard />

      </div>
    </div>
  );
}

export default App;
