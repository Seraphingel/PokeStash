import React, { useState, useEffect } from 'react';
import { Calendar, Map, Zap, Star } from 'lucide-react';
import { getEventsForDate } from '../data/events';

export function EventCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeEvents, setActiveEvents] = useState(null);

  useEffect(() => {
    // Re-evaluate events whenever currentDate changes
    setActiveEvents(getEventsForDate(currentDate));
  }, [currentDate]);

  if (!activeEvents) return null;

  const EventList = ({ title, events, icon: Icon, color }) => {
    if (!events || events.length === 0) return null;
    return (
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color, margin: '0 0 8px 0', fontSize: '1rem' }}>
          <Icon size={18} /> {title}
        </h4>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {events.map((evt, i) => (
            <li key={i} style={{ 
              background: 'rgba(255,255,255,0.6)', 
              padding: '12px', 
              borderRadius: 'var(--border-radius-sm)',
              borderLeft: `4px solid ${color}`
            }}>
              <div style={{ fontWeight: '500' }}>{evt.name}</div>
              {evt.description && <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{evt.description}</div>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="glass-panel bento-col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="btn-icon" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white' }}>
            <Calendar size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Active Events</h2>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              For: {currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
        
        {/* Simple date simulation controls for testing/viewing the September timeline */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() - 1);
              setCurrentDate(d);
            }}
          >
            Prev Day
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => {
              const d = new Date(currentDate);
              d.setDate(d.getDate() + 1);
              setCurrentDate(d);
            }}
          >
            Next Day
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.values(activeEvents).every(arr => arr.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
            No major events active on this date.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <EventList title="Major Events" events={activeEvents.majorEvents} icon={Map} color="var(--color-primary)" />
            <EventList title="5-Star & Shadow Raids" events={[...activeEvents.fiveStarRaids, ...activeEvents.shadowRaids]} icon={Star} color="#F59E0B" />
            <EventList title="Mega Raids" events={activeEvents.megaRaids} icon={Zap} color="#10B981" />
            <EventList title="Spotlight Hours" events={activeEvents.spotlightHours} icon={Star} color="#3B82F6" />
          </div>
        )}
      </div>
    </div>
  );
}
