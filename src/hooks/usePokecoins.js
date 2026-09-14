import { useState, useEffect } from 'react';

const INITIAL_COINS = 153;
export const DAILY_COINS = 50;

// Helper to get the most recent Wednesday at 8:00 AM
const getMostRecentWednesday8AM = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  let diff = 0;
  
  if (day === 3 && d.getHours() >= 8) {
    diff = 0;
  } else {
    diff = d.getDate() - day - (day <= 3 ? 4 : -3);
  }
  
  d.setDate(diff);
  d.setHours(8, 0, 0, 0);
  return d;
};

export function usePokecoins() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('pokecoins');
    return saved ? parseInt(saved, 10) : INITIAL_COINS;
  });

  const [lastClaimDate, setLastClaimDate] = useState(() => {
    return localStorage.getItem('lastClaimDate') || '';
  });

  const [todayClaimedAmount, setTodayClaimedAmount] = useState(() => {
    const saved = localStorage.getItem('todayClaimedAmount');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [megaRaidDoneThisWeek, setMegaRaidDoneThisWeek] = useState(() => {
    return localStorage.getItem('megaRaidDoneThisWeek') === 'true';
  });

  const [lastMegaRaidReset, setLastMegaRaidReset] = useState(() => {
    return localStorage.getItem('lastMegaRaidReset') || new Date().toISOString();
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('pokecoins', coins.toString());
    localStorage.setItem('lastClaimDate', lastClaimDate);
    localStorage.setItem('todayClaimedAmount', todayClaimedAmount.toString());
    localStorage.setItem('megaRaidDoneThisWeek', megaRaidDoneThisWeek.toString());
    localStorage.setItem('lastMegaRaidReset', lastMegaRaidReset);
  }, [coins, lastClaimDate, todayClaimedAmount, megaRaidDoneThisWeek, lastMegaRaidReset]);

  // Daily auto-claim logic and Weekly Reset Logic
  useEffect(() => {
    const now = new Date();
    
    // Check Weekly Mega Raid Reset
    const currentReset = getMostRecentWednesday8AM(now);
    const lastReset = getMostRecentWednesday8AM(new Date(lastMegaRaidReset));
    
    if (currentReset > lastReset) {
      setMegaRaidDoneThisWeek(false);
      setLastMegaRaidReset(now.toISOString());
    }

    const todayStr = now.toDateString();
    
    // If today is a new day
    if (lastClaimDate !== todayStr) {
      if (lastClaimDate) {
        // If we completely missed yesterday, auto-claim 50 coins as a fallback.
        // We consider it "missed" if they didn't log any coins yesterday.
        if (todayClaimedAmount === 0) {
           setCoins(c => c + DAILY_COINS);
        }
      }
      setLastClaimDate(todayStr);
      setTodayClaimedAmount(0); // Reset today's amount
    }
  }, [lastClaimDate, todayClaimedAmount, lastMegaRaidReset]);

  const logTodayCoins = (amount) => {
    const diff = amount - todayClaimedAmount; 
    setCoins(c => c + diff);
    setTodayClaimedAmount(amount);
  };

  const deductCoins = (amount) => {
    if (coins >= amount) {
      setCoins(coins - amount);
      return true;
    }
    return false;
  };

  const toggleMegaRaid = () => {
    setMegaRaidDoneThisWeek(!megaRaidDoneThisWeek);
  };

  const overrideCoins = (amount) => {
    setCoins(amount);
  };

  return {
    coins,
    todayClaimedAmount,
    logTodayCoins,
    deductCoins,
    megaRaidDoneThisWeek,
    toggleMegaRaid,
    overrideCoins,
    DAILY_COINS
  };
}
