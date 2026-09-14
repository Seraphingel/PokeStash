import React, { useState } from 'react';
import { Coins, LogIn, TrendingUp, Sparkles, MapPin, Target, Activity, Globe, Mail, Link2, X, ArrowRight } from 'lucide-react';
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
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #FFDE00, #B3A125)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
            S
          </div>
        </div>

        <div className="profile-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52,211,153,0.1)', color: '#10B981', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '12px' }}>
            <span style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} /> Available for projects
          </div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.8rem' }}>Seraphingel</h2>
          <div style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '12px' }}>@seraphingel</div>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 16px 0', maxWidth: '400px', lineHeight: 1.5 }}>
            I create clean digital experiences with modern visuals and usability. Simple ideas, better experiences.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 12px', background: '#f0f0f5', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' }}>UI/UX Design</span>
            <span style={{ padding: '6px 12px', background: '#f0f0f5', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' }}>Web Design</span>
            <span style={{ padding: '6px 12px', background: '#f0f0f5', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' }}>Frontend</span>
          </div>
        </div>

        <div className="profile-socials">
          <button className="social-btn"><Globe size={20} /></button>
          <button className="social-btn"><Link2 size={20} /></button>
          <button className="social-btn" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white' }}><Mail size={20} /></button>
          <button className="social-btn"><X size={20} /></button>
        </div>
      </div>

    </div>
  );
}
