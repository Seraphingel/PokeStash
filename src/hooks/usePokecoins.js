import { useState, useEffect } from 'react';

const INITIAL_COINS = 153;
const DAILY_COINS = 50;

export function usePokecoins() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('pokecoins');
    return saved !== null ? parseInt(saved, 10) : INITIAL_COINS;
  });

  const [lastClaimDate, setLastClaimDate] = useState(() => {
    const saved = localStorage.getItem('lastClaimDate');
    return saved || null;
  });

  const [todayClaimed, setTodayClaimed] = useState(() => {
    const saved = localStorage.getItem('todayClaimed');
    return saved === 'true';
  });

  // Calculate missed days and auto-claim
  useEffect(() => {
    const now = new Date();
    // 12 PM local time logic
    const today12PM = new Date(now);
    today12PM.setHours(12, 0, 0, 0);

    const currentDateStr = now.toISOString().split('T')[0];

    if (!lastClaimDate) {
      // First time opening the app, no missed days to calculate yet
      setLastClaimDate(currentDateStr);
      setTodayClaimed(false);
      return;
    }

    if (now >= today12PM && lastClaimDate !== currentDateStr) {
      // It's past 12 PM and we haven't claimed today (based on lastClaimDate being older than today)
      
      // Calculate days missed
      const last = new Date(lastClaimDate);
      const diffTime = Math.abs(now - last);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        // Auto claim for missed days (excluding today which we will handle below)
        const missedCoins = (diffDays - 1) * DAILY_COINS;
        
        // Auto claim for today as well
        const totalNewCoins = missedCoins + DAILY_COINS;
        
        setCoins(prev => prev + totalNewCoins);
        setLastClaimDate(currentDateStr);
        setTodayClaimed(true);
      }
    } else if (now < today12PM && lastClaimDate !== currentDateStr) {
      // It's a new day, but before 12 PM. We haven't auto-claimed yet.
      setTodayClaimed(false);
    }
  }, [lastClaimDate]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pokecoins', coins.toString());
    localStorage.setItem('lastClaimDate', lastClaimDate || '');
    localStorage.setItem('todayClaimed', todayClaimed.toString());
  }, [coins, lastClaimDate, todayClaimed]);

  const toggleTodayClaim = () => {
    if (todayClaimed) {
      // Uncheck
      setCoins(prev => prev - DAILY_COINS);
      setTodayClaimed(false);
    } else {
      // Check
      setCoins(prev => prev + DAILY_COINS);
      setTodayClaimed(true);
      setLastClaimDate(new Date().toISOString().split('T')[0]);
    }
  };

  const deductCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  return {
    coins,
    setCoins,
    todayClaimed,
    toggleTodayClaim,
    deductCoins,
    DAILY_COINS
  };
}
