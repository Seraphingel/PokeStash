import React, { useState } from 'react';
import { Coins, LogIn, TrendingUp, Sparkles, MapPin, Target, Activity, Globe, Mail, Link2, X, ArrowRight, Code2 } from 'lucide-react';
import { getEventsForDate } from '../data/events';

export function HomeTab({ coins, todayClaimedAmount, logTodayCoins, DAILY_COINS }) {
  const percentComplete = Math.min(100, Math.round((coins / 350) * 100)); // Arbitrary weekly goal of 350
  
  const todayEvents = getEventsForDate(new Date());
  const recommendedRaid = todayEvents.megaRaids[0] || todayEvents.fiveStarRaids[0] || { name: 'Free Choice!', bonus: 'Explore nearby gyms' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Bento Grid */}
      <div className="bento-grid">
        {/* Main Status Card */}
        <div className="premium-feature-card bento-wide" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', padding: '40px' }}>
          <div className="premium-liquid" style={{ background: '#fff', opacity: 0.15 }}></div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 24px 0', fontSize: '1.2rem', opacity: 0.9 }}>
            <Sparkles size={20} /> Quick Glance
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Coins size={48} color="#FCD34D" />
                {coins}
              </div>
              <p style={{ opacity: 0.8, fontSize: '1rem', margin: 0 }}>Current Pokécoins balance</p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9, marginBottom: '8px', fontSize: '0.9rem' }}>
                <MapPin size={16} /> Daily Raid Target
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '4px' }}>{recommendedRaid.name}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{recommendedRaid.bonus || 'Prepare your best counters!'}</div>
            </div>
          </div>
        </div>

        {/* Log Coins Premium Card */}
        <div className="premium-feature-card">
          <div className="premium-liquid"></div>
          <div className="premium-icon-box" style={{ background: 'rgba(229,57,53,0.1)', color: 'var(--color-primary)' }}>
            <LogIn size={24} />
          </div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.4rem', color: 'var(--color-text-primary)' }}>Log Today's Coins</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Today's Progress</span>
            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{todayClaimedAmount} / {DAILY_COINS}</span>
          </div>
          <div className="progress-bar" style={{ marginBottom: 'auto' }}>
            <div className="progress-fill" style={{ width: `${(todayClaimedAmount / DAILY_COINS) * 100}%` }} />
          </div>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '24px', padding: '12px', borderRadius: '12px' }}
            onClick={() => logTodayCoins(50)}
            disabled={todayClaimedAmount >= DAILY_COINS}
          >
            Log +50 Coins
          </button>
        </div>

        {/* Weekly Goal Premium Card */}
        <div className="premium-feature-card">
          <div className="premium-liquid" style={{ background: '#10B981' }}></div>
          <div className="premium-icon-box" style={{ background: 'rgba(52,211,153,0.1)', color: '#10B981' }}>
            <TrendingUp size={24} />
          </div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.4rem', color: 'var(--color-text-primary)' }}>Weekly Goal</h3>
          
          <div style={{ marginTop: 'auto', fontWeight: 'bold', fontSize: '2.5rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {percentComplete}% 
            <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>of 350 limit</span>
          </div>
        </div>
      </div>

      {/* Premium Progress Widget UI */}
      <div className="progress-widget-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className="progress-ring-container">
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle className="progress-ring-circle" cx="50" cy="50" r="45" fill="none" strokeWidth="10" />
              <circle className="progress-ring-fill" cx="50" cy="50" r="45" fill="none" strokeWidth="10" style={{ strokeDashoffset: 283 - (283 * percentComplete) / 100 }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
              {percentComplete}%
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
              <Target size={16} color="var(--color-primary)" /> Tracking your progress
            </div>
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Project Progress</h3>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Weekly Activity</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', background: 'rgba(229,57,53,0.1)', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Activity size={14} /> Active
            </span>
          </div>
          <div className="progress-activity-bar">
            {[30, 50, 20, 80, 40, 10, 60].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{h}</span>
                <div className={`activity-col ${i === 3 ? 'active' : ''}`} style={{ height: `${h}%`, width: '100%', maxWidth: '24px' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{['S','M','T','W','T','F','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Profile Card UI */}
      <div className="profile-card">
        <div className="profile-visual" />
        
        <div className="profile-avatar">
          <img 
            src="https://avatars.githubusercontent.com/u/224920784?v=4" 
            alt="Seraphingel" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #FFDE00, #B3A125)', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
            S
          </div>
        </div>

        <div className="profile-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.12)', color: '#059669', padding: '6px 14px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '12px' }}>
            <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 0 2px rgba(16,185,129,0.3)' }} /> Available for projects
          </div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>Seraphingel</h2>
          <a 
            href="https://github.com/Seraphingel" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '14px' }}
          >
            @seraphingel
          </a>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 18px 0', maxWidth: '480px', lineHeight: 1.6, fontSize: '0.98rem' }}>
            I create websites to help me on my gaming experience. I occasionally also make websites for my hyperfixations.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="profile-tag">Fullstack</span>
            <span className="profile-tag">UI/UX Design</span>
            <span className="profile-tag">Web Design</span>
          </div>
        </div>

        <div className="profile-socials">
          <a 
            href="https://github.com/Seraphingel" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn" 
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a 
            href="https://github.com/Seraphingel/PokeStash" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn" 
            title="Repository"
            aria-label="Repository"
          >
            <Link2 size={20} />
          </a>
          <a 
            href="mailto:contact@seraphingel.dev" 
            className="social-btn" 
            title="Contact Mail"
            aria-label="Contact Mail"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Expandable FAQ Section */}
      <div className="bento-card" style={{ background: 'var(--color-surface-solid)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '24px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(229,57,53,0.1)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center' }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Frequently Asked Questions</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Everything you need to know about coin tracking and mechanics</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: "How do I earn the daily 50 PokéCoins in Pokémon GO?",
              a: "You earn 1 PokéCoin for every 10 minutes your defending Pokémon stays in a gym. When it is knocked out, you receive the accumulated coins up to a strict cap of 50 coins per day, regardless of how many Pokémon return."
            },
            {
              q: "When does the weekly Mega Raid tracker reset?",
              a: "PokéStash resets the weekly Mega Raid status every Wednesday at 8:00 AM local time, aligning with the global weekly raid cycle."
            },
            {
              q: "What should I spend my free PokéCoins on first?",
              a: "Most trainers recommend expanding your Item Bag and Pokémon Storage first (+50 capacity each for 200 coins), followed by Premium or Remote Battle Passes for exclusive raid events."
            },
            {
              q: "Is my coin data saved if I share this link or refresh?",
              a: "Yes! All coins and claimed amounts are stored 100% client-side in your device's browser localStorage. Your balance is completely private to your phone or computer."
            }
          ].map((faq, idx) => (
            <details 
              key={idx} 
              style={{
                background: 'rgba(0,0,0,0.02)',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer'
              }}
            >
              <summary style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.98rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {faq.q}
                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem', marginLeft: '12px' }}>+</span>
              </summary>
              <p style={{ margin: '12px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

    </div>
  );
}
