import React, { useState, useEffect } from 'react';
import { usePokecoins } from './hooks/usePokecoins';
import { HomeTab } from './components/HomeTab';
import { EventsTab } from './components/EventsTab';
import { Shop } from './components/Shop';
import { WalletTab } from './components/WalletTab';
import { Coins, Home, Calendar, ShoppingBag, Menu, X, Wallet, Sun, Moon, ArrowUp } from 'lucide-react';
import './index.css';

function App() {
  const { coins, todayClaimedAmount, logTodayCoins, deductCoins, megaRaidDoneThisWeek, toggleMegaRaid, DAILY_COINS, overrideCoins } = usePokecoins();
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pokestash_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pokestash_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TabLink = ({ id, label, icon: Icon, isMobile }) => {
    const isActive = activeTab === id;
    if (isMobile) {
      return (
        <a 
          href={`#${id}`}
          onClick={(e) => { e.preventDefault(); setActiveTab(id); setIsMobileMenuOpen(false); }}
          className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
        >
          {Icon && <Icon size={20} />} {label}
        </a>
      );
    }
    
    return (
      <a 
        href={`#${id}`}
        onClick={(e) => { e.preventDefault(); setActiveTab(id); }}
        style={{
          textDecoration: 'none',
          color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
          fontWeight: isActive ? 'bold' : '500',
          padding: '8px 16px',
          position: 'relative',
          transition: 'color 0.2s ease'
        }}
      >
        {label}
        {isActive && (
          <span style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '20px', height: '3px', background: 'var(--color-primary)', borderRadius: '3px' }} />
        )}
      </a>
    );
  };

  return (
    <div>
      {/* Accessibility: Skip to main content link */}
      <a href="#main-content" className="skip-to-content">Skip to content</a>

      {/* Scroll Progress Bar at top of viewport */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Floating Scroll Back to Top Button (Along Left Margin) */}
      <button 
        className={`scroll-to-top-btn ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Mobile Top Bar */}
      <div className="mobile-menu-btn" style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 1999 }}>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'var(--color-surface-solid)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex' }}>
          <Menu size={24} color="var(--color-text-primary)" />
        </button>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Premium Mobile Sidebar */}
      <aside className={`premium-mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              P
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>PokéStash</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        {/* Theme Toggle inside Mobile Sidebar */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={toggleTheme}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              background: 'rgba(0,0,0,0.04)', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--color-text-primary)',
              fontWeight: '600'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{theme.toUpperCase()}</span>
          </button>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <TabLink id="home" label="Home" icon={Home} isMobile={true} />
          <TabLink id="events" label="Events" icon={Calendar} isMobile={true} />
          <TabLink id="shop" label="Shop" icon={ShoppingBag} isMobile={true} />
          <TabLink id="wallet" label="Wallet" icon={Wallet} isMobile={true} />
        </nav>
      </aside>

      {/* Desktop Sticky Header */}
      <header className={`premium-header ${isScrolled ? 'is-scrolled' : ''}`} style={isScrolled ? {
        top: '10px',
        padding: '8px 24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
      } : {}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            P
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>PokéStash</span>
        </div>

        <nav style={{ display: 'flex', gap: '8px' }}>
          <TabLink id="home" label="Home" />
          <TabLink id="events" label="Events" />
          <TabLink id="shop" label="Shop" />
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{ 
              background: 'var(--color-surface-solid)', 
              border: '1px solid rgba(0,0,0,0.08)', 
              borderRadius: '10px', 
              padding: '8px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-text-primary)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />}
          </button>

          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setActiveTab('wallet')}>
            <Coins size={16} color="#FCD34D" style={{ marginRight: '4px' }} />
            {coins} Coins
          </button>
        </div>
      </header>

      <main id="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--main-padding)' }}>
        {activeTab === 'home' && (
          <HomeTab 
            coins={coins} 
            todayClaimedAmount={todayClaimedAmount} 
            logTodayCoins={logTodayCoins} 
            DAILY_COINS={DAILY_COINS} 
          />
        )}
        {activeTab === 'events' && (
          <EventsTab 
            megaRaidDoneThisWeek={megaRaidDoneThisWeek} 
            toggleMegaRaid={toggleMegaRaid} 
          />
        )}
        {activeTab === 'shop' && (
          <Shop coins={coins} deductCoins={deductCoins} />
        )}
        {activeTab === 'wallet' && (
          <WalletTab coins={coins} overrideCoins={overrideCoins} DAILY_COINS={DAILY_COINS} />
        )}
      </main>
    </div>
  );
}

export default App;
