import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard, Tag, Lock, Trash2, Box } from 'lucide-react';

const SHOP_ITEMS = [
  { id: 'premium_pass', name: 'Premium Battle Pass', price: 100, icon: '🎫' },
  { id: 'premium_pass_x3', name: '3x Premium Battle Pass', price: 250, icon: '🎟️' },
  { id: 'bag_expansion', name: '+50 Item Bag', price: 200, icon: '🎒' },
  { id: 'pokemon_storage', name: '+50 Pokemon Storage', price: 200, icon: '📦' },
];

export function Shop({ coins, deductCoins }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Check if it already exists, increment quantity
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };
  
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const projectedBalance = coins - cartTotal;

  // Let's make a mini-game out of it: buy 1000 coins worth of stuff and get a free bonus (just a UI element)
  const FREE_BONUS_THRESHOLD = 1000;
  const progressPercent = Math.min(100, (cartTotal / FREE_BONUS_THRESHOLD) * 100);

  const handleBuyNow = () => {
    if (cart.length === 0) return;
    
    if (deductCoins(cartTotal)) {
      setCart([]);
      alert('Purchase successful!');
    } else {
      alert('Not enough Pokecoins!');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      
      {/* Left Side: Shop Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingCart color="var(--color-primary)" /> Item Shop
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {SHOP_ITEMS.map((item) => (
            <div key={item.id} className="premium-cart-box" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price}</div>
              </div>
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{item.name}</h4>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: 'auto', padding: '10px', fontSize: '0.9rem', width: '100%', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
                onClick={() => addToCart(item)}
              >
                <Plus size={16} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Premium Cart UI */}
      <div>
        <div className="premium-cart-box">
          <div className="premium-cart-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'var(--color-primary)', color: 'white', padding: '10px', borderRadius: '12px' }}>
                <ShoppingCart size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Your Cart ({totalItems})</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Review your items</span>
              </div>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} style={{ background: 'rgba(229, 57, 53, 0.1)', color: 'var(--color-primary)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)', border: '1px dashed rgba(0,0,0,0.1)', borderRadius: '16px' }}>
              <Box size={32} style={{ opacity: 0.5, marginBottom: '12px' }} />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div>
              {/* Product List */}
              <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px', marginBottom: '24px' }}>
                {cart.map((item, index) => (
                  <div key={index} className="premium-cart-product">
                    <div className="premium-cart-thumb" style={{ fontSize: '2rem' }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{item.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.price * item.quantity}</span>
                        <div className="premium-cart-stepper">
                          <button onClick={() => updateQuantity(index, -1)}><Minus size={14} /></button>
                          <span style={{ fontWeight: '500', fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="premium-cart-progress-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
                  <Tag size={16} /> 
                  {progressPercent >= 100 
                    ? "You've unlocked the Premium Bonus!" 
                    : `Spend ${FREE_BONUS_THRESHOLD - cartTotal} more coins for a Premium Bonus!`}
                </div>
                <div className="premium-cart-progress-bar">
                  <div className="premium-cart-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', padding: '0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total Cost</span>
                  <span style={{ color: 'var(--color-primary)' }}>{cartTotal}</span>
                </div>
              </div>

              <button 
                className="premium-cart-btn" 
                onClick={handleBuyNow}
                disabled={projectedBalance < 0}
                style={{ opacity: projectedBalance < 0 ? 0.5 : 1 }}
              >
                <Lock size={18} /> 
                {projectedBalance < 0 ? 'Insufficient Balance' : 'Proceed to Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
