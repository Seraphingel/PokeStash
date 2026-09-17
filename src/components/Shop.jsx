import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Minus, CreditCard, Tag, Lock, Trash2, 
  Box, AlertCircle, CheckCircle2, X, Search, 
  Calculator, ShoppingBag, Check, Pencil
} from 'lucide-react';
import { SHOP_ITEMS, SHOP_CATEGORIES } from '../data/shopItems';
import { getAssetUrl } from '../utils/assets';

export function Shop({ coins, deductCoins, DAILY_COINS = 50, overrideCoins, onNavigateToWallet }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingWallet, setIsEditingWallet] = useState(false);
  const [customCoinsInput, setCustomCoinsInput] = useState(coins);

  // Sync customCoinsInput when coins change externally
  useEffect(() => {
    setCustomCoinsInput(coins);
  }, [coins]);

  const handleSaveCoins = (e) => {
    if (e) e.preventDefault();
    const val = parseInt(customCoinsInput, 10);
    if (!isNaN(val) && val >= 0) {
      if (overrideCoins) overrideCoins(val);
    }
    setIsEditingWallet(false);
  };

  const handleQuickAddCoins = (amount = DAILY_COINS) => {
    if (overrideCoins) {
      overrideCoins(coins + amount);
    }
  };
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('pokestash_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pokestash_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  // Cart operations
  const addToCart = (item) => {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    const existingIndex = cart.findIndex(c => c.id === id);
    if (existingIndex < 0) return;

    const newCart = [...cart];
    newCart[existingIndex].quantity += change;
    if (newCart[existingIndex].quantity <= 0) {
      newCart.splice(existingIndex, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };
  
  const clearCart = () => setCart([]);

  const getItemQuantityInCart = (id) => {
    const item = cart.find(c => c.id === id);
    return item ? item.quantity : 0;
  };

  // Filter items by category and search query
  const filteredItems = useMemo(() => {
    let list = SHOP_ITEMS;
    if (activeCategory !== 'all') {
      list = list.filter(item => item.category === activeCategory);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Cart calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const projectedBalance = coins - cartTotal;
  const coinsNeeded = Math.max(0, cartTotal - coins);
  const gymDaysNeeded = Math.ceil(coinsNeeded / DAILY_COINS);
  const totalGymDays = Math.ceil(cartTotal / DAILY_COINS);

  // Bonus milestone target (spend 1,000 coins)
  const BONUS_THRESHOLD = 1000;
  const progressPercent = Math.min(100, (cartTotal / BONUS_THRESHOLD) * 100);

  const handleOpenCheckout = () => {
    if (cart.length === 0) return;
    if (coins < cartTotal) {
      setPurchaseStatus({ 
        type: 'error', 
        message: `Insufficient PokéCoins! You need ${coinsNeeded} more coins (${gymDaysNeeded} gym days).` 
      });
      setTimeout(() => setPurchaseStatus(null), 4000);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = () => {
    if (deductCoins(cartTotal)) {
      setCart([]);
      setShowConfirmModal(false);
      setPurchaseStatus({ 
        type: 'success', 
        message: `Purchased ${totalItems} item${totalItems > 1 ? 's' : ''} for ${cartTotal} PokéCoins!` 
      });
      setTimeout(() => setPurchaseStatus(null), 4000);
    } else {
      setShowConfirmModal(false);
      setPurchaseStatus({ 
        type: 'error', 
        message: 'Transaction failed. Please check your coin balance.' 
      });
      setTimeout(() => setPurchaseStatus(null), 3500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* ------------------------------------- */}
      {/* SHOP HEADER & WALLET GLANCE           */}
      {/* ------------------------------------- */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.85rem', 
            fontWeight: '800', 
            color: 'var(--color-text-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            <ShoppingBag size={28} color="var(--color-primary)" />
            PokéStash Mart
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>
            Official items, raid passes, upgrades, and PokéCoin budget planner
          </p>
        </div>

        {/* Enhanced Live Wallet Card */}
        {!isEditingWallet ? (
          <div className="shop-wallet-card" role="region" aria-label="PokéCoin Wallet">
            <div className="shop-wallet-icon-container">
              <div className="shop-wallet-glow-pulse" />
              <img 
                src={getAssetUrl('/assets/items/pokecoin.png')} 
                alt="PokéCoin" 
                className="shop-wallet-coin-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1401.png';
                }}
              />
            </div>

            <div className="shop-wallet-content">
              <div className="shop-wallet-label-row">
                <span className="shop-wallet-label">Your Wallet</span>
                <span className="shop-wallet-badge-live">
                  <span className="shop-wallet-dot" /> Live
                </span>
              </div>
              <div className="shop-wallet-amount-row">
                <span className="shop-wallet-amount">{coins.toLocaleString()}</span>
                <span className="shop-wallet-unit">Coins</span>
              </div>
            </div>

            <div className="shop-wallet-actions">
              <button 
                type="button"
                className="shop-wallet-action-btn"
                onClick={() => {
                  setCustomCoinsInput(coins);
                  setIsEditingWallet(true);
                }}
                title="Directly edit your PokéCoins balance"
              >
                <Pencil size={12} />
                <span>Edit</span>
              </button>
              {overrideCoins && (
                <button 
                  type="button"
                  className="shop-wallet-quick-add"
                  onClick={() => handleQuickAddCoins(DAILY_COINS)}
                  title={`Quick claim +${DAILY_COINS} Daily Gym Coins`}
                >
                  +{DAILY_COINS}
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveCoins} className="shop-wallet-card shop-wallet-card-editing">
            <div className="shop-wallet-icon-container" style={{ width: '38px', height: '38px' }}>
              <img 
                src={getAssetUrl('/assets/items/pokecoin.png')} 
                alt="PokéCoin" 
                style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1401.png';
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '800', color: 'var(--color-primary)' }}>
                Set Balance
              </span>
              <input 
                type="number"
                min="0"
                max="999999"
                autoFocus
                className="shop-wallet-input"
                value={customCoinsInput}
                onChange={(e) => setCustomCoinsInput(e.target.value)}
                placeholder="0"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button 
                type="submit" 
                className="shop-wallet-confirm-btn"
                title="Save balance"
              >
                <Check size={14} />
              </button>
              <button 
                type="button" 
                className="shop-wallet-cancel-btn"
                onClick={() => setIsEditingWallet(false)}
                title="Cancel"
              >
                <X size={14} />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ------------------------------------- */}
      {/* SEARCH BAR & CATEGORY PILLS           */}
      {/* ------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Search Bar */}
        <div className="shop-search-box">
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--color-text-secondary)', pointerEvents: 'none' }} />
          <input 
            type="text"
            className="shop-search-input"
            placeholder="Search passes, storage, incubators, eggs, lures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', right: '14px', background: 'none', border: 'none',
                color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'grid', placeItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {SHOP_CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? SHOP_ITEMS.length 
              : SHOP_ITEMS.filter(i => i.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`home-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------- */}
      {/* MAIN TWO-COLUMN SHOP LAYOUT           */}
      {/* ------------------------------------- */}
      <div className="shop-layout">
        
        {/* Left Side: Product Grid */}
        <div>
          {filteredItems.length === 0 ? (
            <div style={{ 
              padding: '60px 20px', 
              textAlign: 'center', 
              background: 'var(--color-surface-solid)', 
              border: '1px dashed rgba(0,0,0,0.1)', 
              borderRadius: '20px' 
            }}>
              <Box size={36} style={{ color: 'var(--color-text-secondary)', opacity: 0.5, marginBottom: '12px' }} />
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>No items found</h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                No items match "{searchQuery}". Try searching for passes, lures, or storage.
              </p>
            </div>
          ) : (
            <div className="shop-items-grid">
              {filteredItems.map((item) => {
                const qtyInCart = getItemQuantityInCart(item.id);

                return (
                  <div key={item.id} className="shop-item-card">
                    {/* Badge */}
                    {item.badge && (
                      <span className="shop-item-badge">
                        {item.badge}
                      </span>
                    )}

                    {/* Official Item Image */}
                    <div className="shop-item-image-wrapper">
                      <img 
                        src={getAssetUrl(item.image)} 
                        alt={item.name}
                        onError={(e) => {
                          const fallbackGithub = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/${item.image.split('/').pop()}`;
                          if (e.target.src !== fallbackGithub) {
                            e.target.src = fallbackGithub;
                          } else {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                      <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                        {item.fallbackIcon || '📦'}
                      </div>
                    </div>

                    {/* Item Information */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                        {item.name}
                      </h3>
                    </div>

                    <p style={{ 
                      margin: '0 0 14px 0', 
                      fontSize: '0.82rem', 
                      color: 'var(--color-text-secondary)', 
                      lineHeight: 1.45,
                      minHeight: '2.6em'
                    }}>
                      {item.description}
                    </p>

                    {/* Price & Add to Cart Controls */}
                    <div className="shop-item-actions">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>
                          Price
                        </span>
                        <div className="shop-price-badge">
                          <img 
                            src={getAssetUrl('/assets/items/pokecoin.png')} 
                            alt="PokéCoin" 
                            style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1401.png';
                            }}
                          />
                          <span>{item.price}</span>
                        </div>
                      </div>

                      {qtyInCart > 0 ? (
                        <div className="shop-inline-stepper">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-primary)' }}>
                            {qtyInCart} in Cart
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-secondary"
                          style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontSize: '0.88rem', 
                            fontWeight: '700',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                          onClick={() => addToCart(item)}
                        >
                          <Plus size={16} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Sticky Cart Panel */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div className="premium-cart-box">
            
            {/* Cart Header */}
            <div className="premium-cart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', 
                  color: 'white', 
                  padding: '10px', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(229, 57, 53, 0.3)'
                }}>
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-text-primary)', fontWeight: '800' }}>
                    Your Cart ({totalItems})
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                    {totalItems === 0 ? 'No items selected' : `${totalItems} item${totalItems > 1 ? 's' : ''} queued`}
                  </span>
                </div>
              </div>
              {cart.length > 0 && (
                <button 
                  onClick={clearCart} 
                  style={{ 
                    background: 'rgba(229, 57, 53, 0.1)', 
                    color: 'var(--color-primary)', 
                    border: 'none', 
                    padding: '8px', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Clear Cart"
                  aria-label="Clear Cart"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {/* Empty State */}
            {cart.length === 0 ? (
              <div style={{ 
                padding: '36px 20px', 
                textAlign: 'center', 
                color: 'var(--color-text-secondary)', 
                border: '1px dashed rgba(0,0,0,0.1)', 
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '54px', height: '54px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.03)', display: 'grid', placeItems: 'center',
                  marginBottom: '12px'
                }}>
                  <ShoppingCart size={24} style={{ opacity: 0.5 }} />
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--color-text-primary)' }}>Your cart is empty</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', lineHeight: 1.4 }}>
                  Add raid passes, storage upgrades, or incubators to calculate your coin budget.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button 
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '8px' }}
                    onClick={() => addToCart(SHOP_ITEMS[0])} // Pokemon Storage
                  >
                    + Storage
                  </button>
                  <button 
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: '8px' }}
                    onClick={() => addToCart(SHOP_ITEMS[3])} // Remote Pass
                  >
                    + Remote Pass
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Product List */}
                <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '4px', marginBottom: '18px' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="premium-cart-product">
                      <div className="premium-cart-thumb">
                        <img 
                          src={getAssetUrl(item.image)} 
                          alt={item.name}
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <span style={{ display: 'none', fontSize: '1.4rem' }}>{item.fallbackIcon || '📦'}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.92rem', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '2px' }}
                            title="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.92rem' }}>
                            <Coins size={14} color="#F59E0B" />
                            {item.price * item.quantity}
                          </div>
                          <div className="premium-cart-stepper">
                            <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                              <Minus size={13} />
                            </button>
                            <span style={{ fontWeight: '700', fontSize: '0.85rem', width: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gym Days Calculator Insight Box */}
                <div className="shop-gym-calculator">
                  <Calculator size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>
                      Gym Defense Estimate:
                    </strong>
                    {coins >= cartTotal ? (
                      <span style={{ color: '#059669', fontWeight: '700' }}>
                        ✓ You have enough coins! Ready for checkout.
                      </span>
                    ) : (
                      <span>
                        Need <strong>{coinsNeeded}</strong> more coins (~<strong>{gymDaysNeeded} days</strong> of gym defending at 50/day).
                      </span>
                    )}
                  </div>
                </div>

                {/* Milestone Progress Bar */}
                <div className="premium-cart-progress-container">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                    <Tag size={15} /> 
                    {progressPercent >= 100 
                      ? "Milestone unlocked: High Roller Tier!" 
                      : `Add ${BONUS_THRESHOLD - cartTotal} more coins to reach High Roller milestone`}
                  </div>
                  <div className="premium-cart-progress-bar">
                    <div className="premium-cart-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>

                {/* Summary Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '0 4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    <span>Current Wallet Balance</span>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{coins} Coins</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800' }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>Total Cost</span>
                    <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <img 
                        src={getAssetUrl('/assets/items/pokecoin.png')} 
                        alt="PokéCoin" 
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Item_1401.png';
                        }}
                      />
                      {cartTotal}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Remaining After Purchase</span>
                    <span style={{ color: projectedBalance >= 0 ? '#10B981' : '#EF4444' }}>
                      {projectedBalance} Coins
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  className="premium-cart-btn" 
                  onClick={handleOpenCheckout}
                  disabled={projectedBalance < 0}
                  style={{ opacity: projectedBalance < 0 ? 0.6 : 1 }}
                >
                  {projectedBalance < 0 ? (
                    <>
                      <Lock size={18} /> Need {coinsNeeded} More Coins
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Spend {cartTotal} Coins
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ------------------------------------- */}
      {/* PURCHASE CONFIRMATION MODAL           */}
      {/* ------------------------------------- */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
          display: 'grid', placeItems: 'center', zIndex: 99999, padding: '20px'
        }} onClick={() => setShowConfirmModal(false)}>
          <div 
            style={{
              background: 'var(--color-surface-solid)', 
              borderRadius: '24px',
              maxWidth: '460px', 
              width: '100%', 
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)', 
              border: '1px solid rgba(0,0,0,0.08)',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px', 
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowConfirmModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(229, 57, 53, 0.12)', color: 'var(--color-primary)', display: 'grid', placeItems: 'center' }}>
                <CreditCard size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-text-primary)', fontWeight: '800' }}>Confirm Purchase</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Deduct coins from your PokéStash</span>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '18px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                <strong>Purchasing ({totalItems} items):</strong>
                <div style={{ marginTop: '6px', maxHeight: '100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {cart.map(c => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-primary)', fontSize: '0.85rem' }}>
                      <span>{c.quantity}x {c.name}</span>
                      <span style={{ fontWeight: '700' }}>{c.price * c.quantity} Coins</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Current Balance:</span>
                <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{coins} Coins</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: '800' }}>
                <span>Total Deduction:</span>
                <span>-{cartTotal} Coins</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.02rem', fontWeight: '800' }}>
                <span style={{ color: 'var(--color-text-primary)' }}>New Balance:</span>
                <span style={{ color: projectedBalance >= 0 ? '#10B981' : '#E53935' }}>{projectedBalance} Coins</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px',
                  background: 'rgba(0,0,0,0.05)', border: 'none',
                  color: 'var(--color-text-primary)', fontWeight: '700', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmPurchase}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                  border: 'none', color: 'white', fontWeight: '700', cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(229, 57, 53, 0.25)'
                }}
              >
                Confirm Spend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------- */}
      {/* FLOATING STATUS TOAST                 */}
      {/* ------------------------------------- */}
      {purchaseStatus && (
        <div 
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999,
            background: purchaseStatus.type === 'success' ? '#065F46' : '#991B1B',
            color: 'white', padding: '14px 22px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.25)', fontSize: '0.92rem', fontWeight: '700',
            animation: 'slideUp 0.25s ease-out'
          }}
        >
          {purchaseStatus.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {purchaseStatus.message}
        </div>
      )}

    </div>
  );
}
