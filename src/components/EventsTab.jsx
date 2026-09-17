import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, ChevronDown, MapPin, Tag } from 'lucide-react';
import { getEventsForDate } from '../data/events';
import { EventDetailsModal } from './EventDetailsModal';
import { getAssetUrl } from '../utils/assets';

export function EventsTab({ megaRaidDoneThisWeek, toggleMegaRaid }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d;
  });
  
  const [currentMonth, setCurrentMonth] = useState(() => selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(() => selectedDate.getFullYear());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  
  const [dates, setDates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthsList = [
    { label: 'September 2026', m: 8, y: 2026 },
    { label: 'October 2026', m: 9, y: 2026 },
    { label: 'November 2026', m: 10, y: 2026 },
    { label: 'December 2026', m: 11, y: 2026 },
    { label: 'January 2027', m: 0, y: 2027 },
    { label: 'February 2027', m: 1, y: 2027 }
  ];

  useEffect(() => {
    const arr = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(new Date(currentYear, currentMonth, i));
    }
    setDates(arr);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const activeBtn = document.querySelector('.premium-date.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedDate, dates]);

  if (dates.length === 0) return null;

  const selectedEvents = getEventsForDate(selectedDate);
  const totalEventsCount = selectedEvents.discoveries.length + selectedEvents.spotlightHours.length + selectedEvents.fiveStarRaids.length + selectedEvents.megaRaids.length + selectedEvents.shadowRaids.length + selectedEvents.majorEvents.length;

  const recommendMega = !megaRaidDoneThisWeek;
  const recommendedMegaEvent = selectedEvents.megaRaids[0];
  const recommended5StarEvent = selectedEvents.fiveStarRaids[0];

  // Helper to format string with <wbr> at slashes for nice wrapping
  const formatWrapSlash = (text) => {
    if (!text) return text;
    return text.split('/').map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}{i < arr.length - 1 && <>/<wbr/></>}
      </React.Fragment>
    ));
  };

  const getEventTagStyle = (evt, defaultCategory) => {
    const name = (evt.name || '').toLowerCase();
    const type = (evt.type || '').toLowerCase();

    if (type.includes('spotlight') || name.includes('spotlight')) {
      return { color: '#dd9f53', badge: 'Spotlight Hour' };
    }
    if (type.includes('community') || name.includes('community day')) {
      return { color: '#4371ae', badge: 'Community Day' };
    }
    if (name.includes('wild area') || type.includes('wild-area')) {
      return { color: '#396e75', badge: 'Wild Area' };
    }
    if (type.includes('raid-day') || name.includes('raid day') || name.includes('super mega')) {
      return { color: '#d96958', badge: 'Raid Day' };
    }
    if (type.includes('max') || name.includes('max battle') || name.includes('gigantamax') || name.includes('dynamax')) {
      return { color: '#843667', badge: 'Max Battle' };
    }
    if (type.includes('season') || name.includes('twilight trails')) {
      return { color: '#6cb5b3', badge: 'Season' };
    }
    if (evt.dayOfWeek !== undefined || name.includes('monday') || name.includes('tuesday') || name.includes('wednesday') || name.includes('thursday') || name.includes('friday') || name.includes('sunday')) {
      return { color: '#712957', badge: 'Daily Discovery' };
    }
    if (type.includes('raid') || name.includes('raid') || defaultCategory?.includes('Raid')) {
      return { color: '#b95749', badge: defaultCategory || 'Raid Battle' };
    }
    return { color: evt.color || '#65b679', badge: defaultCategory || 'Event' };
  };

  const EventItemCard = ({ evt, categoryName }) => {
    const { color, badge } = getEventTagStyle(evt, categoryName);
    return (
      <div 
        onClick={() => setSelectedEvent({ ...evt, color })}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          border: '1px solid #f0f0f5',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
        }}
      >
        {/* Decorative background accent */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, width: '150px',
          background: `linear-gradient(90deg, transparent, ${color + '0C'})`,
          zIndex: 0
        }} />

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          background: `${color}1A`,
          display: 'grid',
          placeItems: 'center',
          zIndex: 1
        }}>
          {evt.imageUrl ? (
            <img src={getAssetUrl(evt.imageUrl)} alt={evt.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          ) : (
            <Calendar color={color} size={24} />
          )}
        </div>

        <div style={{ flex: 1, zIndex: 1 }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{evt.name}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {evt.bonus ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={14} color={color} />
                {evt.bonus}
              </span>
            ) : 'View event details'}
          </div>
        </div>

        <div style={{ zIndex: 1 }}>
          <button className="btn" style={{ 
            background: color, 
            color: 'white',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            border: 'none',
            boxShadow: `0 4px 12px ${color + '40'}`
          }}>
            {badge}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Season Banner */}
      <div 
        onClick={() => {
          const seasonEvt = {
            name: "Twilight Trails",
            start: "2026-09-08",
            end: "2026-12-01",
            color: "#6cb5b3",
            imageUrl: getAssetUrl("/assets/events/twilight-trails-banner.jpg"),
            details: {
              "Pokémon Debuts": ["Maschiff", "Mabosstiff"],
              "Mega-Evolved Pokémon": ["Staraptor", "Chandelure"],
              "Max Pokémon Debuts": ["Dynamax Rhyhorn", "Dynamax Sneasel", "Dynamax Uxie", "Dynamax Mesprit", "Dynamax Azelf", "Dynamax Sizzlipede"],
              "Sales": ["The Pokémon GO Web Store will have new boxes during Twilight Trails! Be sure to check out the web store regularly."]
            }
          };
          setSelectedEvent(seasonEvt);
        }}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.85) 100%), url('${getAssetUrl('/assets/events/twilight-trails-banner.jpg')}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          padding: '28px 32px',
          color: 'white',
          boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '2px solid rgba(108, 181, 179, 0.7)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.25)';
        }}
      >
        {/* Background decorative glow */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '220px', height: '220px',
          borderRadius: '50%',
          background: '#6cb5b3',
          opacity: 0.25,
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ 
                background: '#6cb5b3', 
                color: '#0F172A', 
                fontSize: '0.75rem', 
                fontWeight: '900', 
                padding: '4px 12px', 
                borderRadius: '999px',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                CURRENT SEASON
              </span>
              <span style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: '500' }}>September 8, 2026 – December 1, 2026</span>
            </div>

            <h2 style={{ margin: '0 0 6px 0', fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px', color: '#F8FAFC' }}>
              Season 24: Twilight Trails
            </h2>
            <div style={{ fontSize: '0.9rem', opacity: 0.85, maxWidth: '650px', lineHeight: '1.4' }}>
              3-Month Seasonal Theme • Featuring Paldean Debuts, Mega Staraptor & Chandelure, Dynamax Max Battles, and Web Store Deals.
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            padding: '10px 18px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.25)',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#FFFFFF',
            whiteSpace: 'nowrap'
          }}>
            View Full Season Details →
          </div>
        </div>

        {/* Season Timeline Progress Bar */}
        <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.8rem', opacity: 0.9, marginBottom: '8px', fontWeight: '600' }}>
            <span style={{ color: '#6cb5b3', flex: '1 1 100%', textAlign: 'center', marginBottom: '4px' }}>
              Season Cycle Timeline ({Math.round(Math.min(100, Math.max(0, ((selectedDate - new Date('2026-09-08')) / (new Date('2026-12-01') - new Date('2026-09-08'))) * 100)))}% Complete)
            </span>
            <span>Start: Sep 8</span>
            <span>End: Dec 1</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${Math.min(100, Math.max(3, ((selectedDate - new Date('2026-09-08')) / (new Date('2026-12-01') - new Date('2026-09-08'))) * 100))}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #6cb5b3, #38BDF8)', 
              borderRadius: '999px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Featured Pokémon Tags */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 'bold', letterSpacing: '0.5px' }}>FEATURED POKÉMON:</span>
          {["Maschiff", "Mabosstiff", "Staraptor", "Chandelure", "Dynamax Rhyhorn", "Dynamax Sneasel", "Dynamax Uxie"].map((p, i) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="premium-meeting-card">
        {/* Left Sidebar - Premium UI Style */}
        <div className="premium-sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', wordBreak: 'break-word' }}>
          
          <div>
            <div style={{ 
              width: '48px', height: '48px', 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: '12px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <Calendar size={24} color="#fff" />
            </div>

            <h2 style={{ fontSize: '1.8rem', margin: '0 0 16px 0', lineHeight: '1.2' }}>Events<br/>Calendar</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.8, fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16}/> Daily Free Raid</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16}/> {selectedDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.7, marginBottom: '8px' }}>Raid Recommendation</div>
              {recommendMega && recommendedMegaEvent ? (
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FCD34D', lineHeight: '1.3' }}>
                    {formatWrapSlash(recommendedMegaEvent.name)}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '8px', lineHeight: '1.4' }}>
                    Mega Raids are best done on Thursdays (Wednesdays are for Legendary Raid Hours!).
                  </div>
                </div>
              ) : recommended5StarEvent ? (
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FCD34D', lineHeight: '1.3' }}>
                    {formatWrapSlash(recommended5StarEvent.name)}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Free Choice</div>
              )}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={20} color="#FCD34D" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{totalEventsCount} Active Events</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Happening on this date</div>
            </div>
          </div>
        </div>

        {/* Right Content - Calendar & Events */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#fcfcfd', minWidth: 0 }}>
          
          <div style={{ padding: '24px 24px 0 24px', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <button 
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#fff', border: '1px solid #f0f0f5', 
              padding: '8px 16px', borderRadius: '12px', 
              fontWeight: 'bold', color: 'var(--color-text-primary)',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              {new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              <ChevronDown size={16} color="var(--color-text-secondary)" />
            </button>
            
            {showMonthDropdown && (
              <div style={{
                position: 'absolute', top: '100%', left: '24px', marginTop: '8px',
                background: '#fff', border: '1px solid #f0f0f5',
                borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                zIndex: 100, overflow: 'hidden', minWidth: '180px'
              }}>
                {monthsList.map((mItem, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentMonth(mItem.m);
                      setCurrentYear(mItem.y);
                      setShowMonthDropdown(false);
                      // Select 1st of the new month
                      setSelectedDate(new Date(mItem.y, mItem.m, 1));
                    }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '12px 16px', border: 'none',
                      background: (currentMonth === mItem.m && currentYear === mItem.y) ? 'var(--color-primary-light, #f0ebff)' : '#fff',
                      color: (currentMonth === mItem.m && currentYear === mItem.y) ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      fontWeight: (currentMonth === mItem.m && currentYear === mItem.y) ? 'bold' : 'normal',
                      cursor: 'pointer', borderBottom: idx < monthsList.length - 1 ? '1px solid #f0f0f5' : 'none'
                    }}
                  >
                    {mItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div 
            className="premium-dates-bar" 
            style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f5', overflowX: 'auto', display: 'flex' }}
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.preventDefault();
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
          >
            {dates.map((d, i) => {
              const isActive = d.getTime() === selectedDate.getTime();
              return (
                <button 
                  key={i} 
                  className={`premium-date ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedDate(d)}
                >
                  <span style={{ fontSize: '0.85rem', opacity: isActive ? 0.9 : 0.6, marginBottom: '4px' }}>
                    {d.toLocaleDateString(undefined, { weekday: 'short' })}
                  </span>
                  <strong>{d.getDate()}</strong>
                </button>
              )
            })}
          </div>

          <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '500px' }}>
            
            {(selectedEvents.discoveries.length > 0 || selectedEvents.spotlightHours.length > 0) && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '16px' }}>Discoveries & Spotlight</h4>
                {selectedEvents.discoveries.map((evt, j) => <EventItemCard key={`d-${j}`} evt={evt} categoryName="Daily Discovery" />)}
                {selectedEvents.spotlightHours.map((evt, j) => <EventItemCard key={`sh-${j}`} evt={evt} categoryName="Spotlight Hour" />)}
              </div>
            )}

            {(selectedEvents.fiveStarRaids.length > 0 || selectedEvents.megaRaids.length > 0 || selectedEvents.shadowRaids.length > 0) && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '16px' }}>Active Raids</h4>
                {selectedEvents.fiveStarRaids.map((evt, j) => <EventItemCard key={`r5-${j}`} evt={evt} categoryName="5-Star Raid" />)}
                {selectedEvents.megaRaids.map((evt, j) => <EventItemCard key={`rm-${j}`} evt={evt} categoryName="Mega Raid" />)}
                {selectedEvents.shadowRaids.map((evt, j) => <EventItemCard key={`rs-${j}`} evt={evt} categoryName="Shadow Raid" />)}
              </div>
            )}

            {selectedEvents.majorEvents.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '16px' }}>Major Events</h4>
                {selectedEvents.majorEvents.filter(e => !e.name.toLowerCase().includes('twilight')).map((evt, j) => <EventItemCard key={`e-${j}`} evt={evt} categoryName="Event" />)}
              </div>
            )}

            {totalEventsCount === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No events scheduled for this day.
              </div>
            )}
          </div>

        </div>
      </div>

      <EventDetailsModal evt={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
