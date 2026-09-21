import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokestash_user_events';

export function useUserEvents() {
  const [userEvents, setUserEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse user events from localStorage', e);
      return [];
    }
  });

  const saveEvents = useCallback((newEvents) => {
    setUserEvents(newEvents);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      window.dispatchEvent(new Event('pokestash_user_events_updated'));
    } catch (e) {
      console.error('Failed to save user events to localStorage', e);
    }
  }, []);

  const addUserEvent = useCallback((eventData) => {
    const id = eventData.id || `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newEvent = {
      ...eventData,
      id,
      isCustom: true,
      start: eventData.start,
      end: eventData.end || eventData.start,
      details: eventData.details || {}
    };
    saveEvents([...userEvents, newEvent]);
    return newEvent;
  }, [userEvents, saveEvents]);

  const updateUserEvent = useCallback((id, updatedData) => {
    const nextEvents = userEvents.map(evt => {
      if (evt.id === id) {
        return {
          ...evt,
          ...updatedData,
          id,
          isCustom: true,
          end: updatedData.end || updatedData.start || evt.end,
          details: {
            ...(evt.details || {}),
            ...(updatedData.details || {})
          }
        };
      }
      return evt;
    });
    saveEvents(nextEvents);
  }, [userEvents, saveEvents]);

  const deleteUserEvent = useCallback((id) => {
    const nextEvents = userEvents.filter(evt => evt.id !== id);
    saveEvents(nextEvents);
  }, [userEvents, saveEvents]);

  // Sync across tabs and listen for changes
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setUserEvents(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
    };
    const handleCustomUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setUserEvents(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('pokestash_user_events_updated', handleCustomUpdate);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pokestash_user_events_updated', handleCustomUpdate);
    };
  }, []);

  return {
    userEvents,
    addUserEvent,
    updateUserEvent,
    deleteUserEvent
  };
}
