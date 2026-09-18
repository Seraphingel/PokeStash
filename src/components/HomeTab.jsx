import React, { useState, useMemo } from 'react';
import { 
  Coins, LogIn, Sparkles, Calendar, 
  ArrowRight, Clock, Award, Swords, ChevronRight, 
  Compass, Link2, Mail, Flame, CheckCircle2, Globe
} from 'lucide-react';
import { getEventsForDate, getUpcomingEvents, EVENT_COLORS } from '../data/events';
import { EventDetailsModal } from './EventDetailsModal';
import { getAssetUrl } from '../utils/assets';
import { formatEventDateRange, formatUntilDate, getSubtleRegionDisplay } from '../utils/date';
import { getPokemon3DIconUrl } from '../utils/pokemonAssets';

const RaidBossCard = ({ event, badgeLabel, badgeColor, subtitle, onClick }) => {
  return (
    <div 
      className="bento-card" 
      style={{ 
        background: 'var(--color-surface-solid)', 
        border: '1px solid var(--color-border)', 
        padding: '20px', 
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="home-event-thumb" style={{ width: '64px', height: '64px' }}>
        <img 
          src={getAssetUrl(getPokemon3DIconUrl(event) || event.imageUrl)} 
          alt={event.name} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'white', background: badgeColor, padding: '2px 8px', borderRadius: '8px' }}>
            {badgeLabel}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            {badgeLabel === 'SHADOW RAID' 
              ? (event.end ? formatUntilDate(event.end) : 'Weekend Boss')
              : formatUntilDate(event.end)}
          </span>
        </div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {event.name}
        </h4>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          {subtitle}
        </div>
      </div>
      <ChevronRight size={18} color="var(--color-text-secondary)" style={{ flexShrink: 0 }} />
    </div>
  );
};

export function HomeTab({ coins, todayClaimedAmount, logTodayCoins, DAILY_COINS, setActiveTab }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(6);

  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const todayEvents = useMemo(() => getEventsForDate(today), [today]);
  const upcomingEvents = useMemo(() => getUpcomingEvents(today), [today]);

  const activeFiveStar = todayEvents.fiveStarRaids[0];
  const activeMega = todayEvents.megaRaids[0];
  const activeShadow = todayEvents.shadowRaids[0];
  const activeDiscovery = todayEvents.discoveries[0];
  const activeSpotlight = todayEvents.spotlightHours[0];

  // Filter upcoming events by chosen category
  const filteredUpcoming = useMemo(() => {
    if (activeCategory === 'all') return upcomingEvents;
    if (activeCategory === 'events') return upcomingEvents.filter(e => e.category === 'event');
    if (activeCategory === 'raids') return upcomingEvents.filter(e => e.category === 'raid' || e.category === 'mega' || e.category === 'shadow');
    if (activeCategory === 'spotlights') return upcomingEvents.filter(e => e.category === 'spotlight');
    return upcomingEvents;
  }, [upcomingEvents, activeCategory]);

  const visibleEvents = useMemo(() => {
    return filteredUpcoming.slice(0, displayCount);
  }, [filteredUpcoming, displayCount]);

  // Calculate human-friendly relative date badge
  const getCountdownBadge = (startStr, endStr) => {
    if (!startStr) return { text: 'SPECIAL', cls: 'home-countdown-later' };

    if (startStr <= todayStr && endStr >= todayStr) {
      if (startStr === endStr) {
        return { text: 'TODAY ONLY', cls: 'home-countdown-today' };
      }
      return { text: 'ACTIVE NOW', cls: 'home-countdown-today' };
    }

    try {
      const [ty, tm, td] = todayStr.split('-').map(Number);
      const [sy, sm, sd] = startStr.split('-').map(Number);
      const tDate = new Date(ty, tm - 1, td);
      const sDate = new Date(sy, sm - 1, sd);
      const diffTime = sDate - tDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return { text: 'STARTS TOMORROW', cls: 'home-countdown-tomorrow' };
      if (diffDays === 2) return { text: 'IN 2 DAYS', cls: 'home-countdown-soon' };
      if (diffDays > 2 && diffDays <= 7) return { text: `IN ${diffDays} DAYS`, cls: 'home-countdown-soon' };
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return { text: `${monthNames[sm - 1]} ${sd}`, cls: 'home-countdown-later' };
    } catch (e) {
      return { text: startStr, cls: 'home-countdown-later' };
    }
  };

  const formattedToday = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* ------------------------------------- */}
      {/* TOP BENTO GRID: DAILY STATUS & ACTIONS */}
      {/* ------------------------------------- */}
      <div className="bento-grid">
        
        {/* Card 1: Today's Briefing & Season Accent */}
        <div className="premium-feature-card bento-wide" style={{ background: 'linear-gradient(135deg, #1E293B, #0F172A)', color: 'white', padding: '32px' }}>
          <div className="premium-liquid" style={{ background: '#38BDF8', opacity: 0.12 }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '600', backdropFilter: 'blur(8px)' }}>
              <Calendar size={15} color="#38BDF8" /> {formattedToday}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={15} color="#F59E0B" /> Season of Twilight Trails
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {/* Quick Balance */}
            <div>
              <span style={{ color: '#94A3B8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>Your Stash</span>
              <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.1, margin: '6px 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Coins size={38} color="#FCD34D" />
                <span>{coins}</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0 }}>
                Total recorded PokéCoins
              </p>
            </div>

            {/* Daily Discovery / Spotlight Pill */}
            {(activeSpotlight || activeDiscovery) && (
              <div 
                style={{ 
                  background: 'rgba(255,255,255,0.06)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '16px 20px', 
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: activeSpotlight ? 'pointer' : 'default',
                  transition: 'background 0.2s ease'
                }}
                onClick={() => activeSpotlight && setSelectedEvent(activeSpotlight)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activeSpotlight && setSelectedEvent(activeSpotlight); } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FCD34D', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Sparkles size={14} /> Today's Highlight
                </div>
                <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '4px' }}>
                  {activeSpotlight ? activeSpotlight.name : activeDiscovery.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                  {activeSpotlight ? '6:00 PM – 7:00 PM Local Time • Click for details' : activeDiscovery.description}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Daily 50-Coin Quick Logger */}
        <div className="premium-feature-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="premium-liquid" style={{ background: 'var(--color-primary)' }}></div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="premium-icon-box" style={{ background: 'rgba(229,57,53,0.1)', color: 'var(--color-primary)', margin: 0 }}>
                <LogIn size={22} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: todayClaimedAmount >= DAILY_COINS ? '#059669' : 'var(--color-text-secondary)', background: todayClaimedAmount >= DAILY_COINS ? 'rgba(16,185,129,0.12)' : 'var(--color-border)', padding: '4px 10px', borderRadius: '12px' }}>
                {todayClaimedAmount >= DAILY_COINS ? 'Limit Reached' : 'Daily Task'}
              </span>
            </div>
            
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>Today's Coins</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Defend gyms to earn up to 50 free coins daily.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Progress</span>
              <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{todayClaimedAmount} / {DAILY_COINS}</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: '16px' }}>
              <div className="progress-fill" style={{ width: `${Math.min(100, (todayClaimedAmount / DAILY_COINS) * 100)}%` }} />
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '11px', borderRadius: '12px', fontSize: '0.92rem', fontWeight: '700' }}
            onClick={() => logTodayCoins(50)}
            disabled={todayClaimedAmount >= DAILY_COINS}
          >
            {todayClaimedAmount >= DAILY_COINS ? '✓ 50 Coins Logged' : '+50 Coins'}
          </button>
        </div>

      </div>

      {/* ------------------------------------- */}
      {/* ACTIVE RAID BOSSES SHOWCASE           */}
      {/* ------------------------------------- */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Swords size={20} color="var(--color-primary)" /> Active Raid Bosses
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              Current raid rotation in gyms worldwide
            </p>
          </div>
          {setActiveTab && (
            <button 
              onClick={() => setActiveTab('events')} 
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Full Rotation <ArrowRight size={15} />
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* 5-Star Raid Boss */}
          {activeFiveStar && (
            <RaidBossCard 
              event={activeFiveStar}
              badgeLabel="5-STAR RAID"
              badgeColor="#DC2626"
              subtitle={activeFiveStar.details?.weaknesses ? `Weak: ${activeFiveStar.details.weaknesses.slice(0, 3).join(', ')}` : 'Tap for raid counters'}
              onClick={() => setSelectedEvent(activeFiveStar)}
            />
          )}

          {/* Mega Raid Boss */}
          {activeMega && (
            <RaidBossCard 
              event={activeMega}
              badgeLabel="MEGA RAID"
              badgeColor="#D96958"
              subtitle={activeMega.details?.weaknesses ? `Weak: ${activeMega.details.weaknesses.slice(0, 3).join(', ')}` : 'Tap for raid counters'}
              onClick={() => setSelectedEvent(activeMega)}
            />
          )}

          {/* Shadow Raid Boss */}
          {activeShadow && (
            <RaidBossCard 
              event={activeShadow}
              badgeLabel="SHADOW RAID"
              badgeColor="#7C3AED"
              subtitle="Purified Gems recommended"
              onClick={() => setSelectedEvent(activeShadow)}
            />
          )}

        </div>
      </div>

      {/* ------------------------------------- */}
      {/* UPCOMING EVENTS & SCHEDULE SHOWCASE   */}
      {/* ------------------------------------- */}
      <section className="home-events-section">
        
        <div className="home-events-header">
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={22} color="#F97316" /> Upcoming Events & Adventures
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Upcoming Community Days, Raid Days, Spotlight Hours, and limited-time events
            </p>
          </div>

          {/* Filter Pills */}
          <div className="home-filter-pills">
            <button 
              className={`home-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('all'); setDisplayCount(6); }}
            >
              All Events ({upcomingEvents.length})
            </button>
            <button 
              className={`home-filter-pill ${activeCategory === 'events' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('events'); setDisplayCount(6); }}
            >
              Special Events
            </button>
            <button 
              className={`home-filter-pill ${activeCategory === 'raids' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('raids'); setDisplayCount(6); }}
            >
              Raids & Bosses
            </button>
            <button 
              className={`home-filter-pill ${activeCategory === 'spotlights' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('spotlights'); setDisplayCount(6); }}
            >
              Spotlight Hours
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="home-events-grid">
          {visibleEvents.map((evt, idx) => {
            const badge = getCountdownBadge(evt.start, evt.end);
            const regions = evt.details?.regions || evt.regions;
            const subtleRegion = getSubtleRegionDisplay(regions);
            const rawFeatured = Array.isArray(evt.details?.featured) ? evt.details.featured : [];
            const rawWild = Array.isArray(evt.details?.['Wild Encounters']) ? evt.details['Wild Encounters'] : [];
            const rawBonuses = Array.isArray(evt.details?.bonuses || evt.details?.Bonuses) ? (evt.details.bonuses || evt.details.Bonuses) : [];
            
            const highlightSnippet = rawBonuses[0] || rawFeatured[0] || rawWild[0] || evt.details?.advice || null;

            return (
              <div 
                key={`${evt.name}-${idx}`} 
                className="home-event-card"
                onClick={() => setSelectedEvent(evt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEvent(evt); } }}
              >
                {/* Top Badge & Category Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '8px' }}>
                  <span className={`home-countdown-badge ${badge.cls}`}>
                    <Clock size={12} /> {badge.text}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {subtleRegion && (
                      <span 
                        className="event-subtle-region-pill" 
                        title={regions.join(', ')}
                      >
                        <Globe size={11} style={{ flexShrink: 0 }} />
                        <span>{subtleRegion}</span>
                      </span>
                    )}
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: '700', 
                      padding: '3px 9px', 
                      borderRadius: '8px', 
                      background: `${evt.color || EVENT_COLORS.Event}20`, 
                      color: evt.color || EVENT_COLORS.Event 
                    }}>
                      {evt.typeLabel || 'Event'}
                    </span>
                  </div>
                </div>

                {/* Event Thumbnail & Title Row */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div className="home-event-thumb">
                    <img 
                      src={getAssetUrl(getPokemon3DIconUrl(evt) || evt.imageUrl)} 
                      alt={evt.name} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                      <Sparkles size={20} />
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '1.08rem', 
                      fontWeight: '800', 
                      color: 'var(--color-text-primary)', 
                      lineHeight: 1.3 
                    }}>
                      {evt.name}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      <span>{formatEventDateRange(evt.start, evt.end, evt.category)}</span>
                    </div>
                  </div>
                </div>

                {/* Event Snippet / Highlight */}
                {highlightSnippet && (
                  <div style={{ 
                    marginTop: 'auto', 
                    padding: '10px 12px', 
                    borderRadius: '12px', 
                    background: 'var(--color-surface-subtle)', 
                    border: '1px solid var(--color-border)',
                    fontSize: '0.82rem', 
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>Bonus: </strong> 
                    {highlightSnippet}
                  </div>
                )}

                {/* Footer Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {evt.details?.regions ? `📍 ${evt.details.regions[0]}` : 'Global Event'}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Show More & Open Calendar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
          {visibleEvents.length < filteredUpcoming.length && (
            <button 
              className="btn btn-secondary"
              style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: '600', fontSize: '0.92rem' }}
              onClick={() => setDisplayCount(prev => prev + 6)}
            >
              Load More Upcoming ({filteredUpcoming.length - visibleEvents.length} left)
            </button>
          )}

          {setActiveTab && (
            <button 
              className="btn btn-primary"
              style={{ padding: '12px 28px', borderRadius: '12px', fontWeight: '700', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={18} /> Open Full Calendar
            </button>
          )}
        </div>

      </section>

      {/* ------------------------------------- */}
      {/* SEASON HIGHLIGHTS & PERKS WIDGET      */}
      {/* ------------------------------------- */}
      <div className="bento-card" style={{ background: 'var(--color-surface-solid)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#2563EB', display: 'grid', placeItems: 'center' }}>
            <Award size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text-primary)', fontWeight: '800' }}>
              Active Season Perks: Twilight Trails
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Ongoing seasonal bonuses active through December 1, 2026
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {[
            { title: "Guaranteed Candy XL", desc: "Guaranteed Candy XL when trading Pokémon with friends." },
            { title: "Extra Daily Free Pass", desc: "Spin Gym photo discs for one additional free Raid Pass per day." },
            { title: "Remote Raid Power Boost", desc: "Increased damage for Pokémon participating in Remote Raids." },
            { title: "7-Day Spin Streak XP", desc: "Significantly increased XP reward for completing 7-day PokéStop streaks." }
          ].map((perk, i) => (
            <div 
              key={i} 
              style={{ 
                background: 'var(--color-surface-subtle)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '16px', 
                padding: '16px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                  {perk.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------- */}
      {/* CREATOR PROFILE CARD UI               */}
      {/* ------------------------------------- */}
      <div className="profile-card">
        <div className="profile-visual" />
        
        <div className="profile-avatar">
          <img 
            src="https://avatars.githubusercontent.com/u/224920784?v=4" 
            alt="Seraphingel" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
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

      {/* ------------------------------------- */}
      {/* EXPANDABLE FAQ SECTION                */}
      {/* ------------------------------------- */}
      <div className="bento-card" style={{ background: 'var(--color-surface-solid)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '32px' }}>
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
                background: 'var(--color-surface-subtle)',
                borderRadius: '14px',
                padding: '16px 20px',
                border: '1px solid var(--color-border)',
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

      {/* ------------------------------------- */}
      {/* EVENT DETAILS MODAL                   */}
      {/* ------------------------------------- */}
      {selectedEvent && (
        <EventDetailsModal 
          evt={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

    </div>
  );
}
