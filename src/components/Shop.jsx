import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react';

const SHOP_ITEMS = [
  { id: 'premium_pass', name: 'Premium Battle Pass', price: 100 },
  { id: 'premium_pass_x3', name: '3x Premium Battle Pass', price: 250 },
  { id: 'bag_expansion', name: '+50 Item Bag', price: 200 },
  { id: 'pokemon_storage', name: '+50 Pokemon Storage', price: 200 },
];

export function Shop({ coins, deductCoins }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const projectedBalance = coins - cartTotal;

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
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="btn-icon" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
          <ShoppingCart size={24} />
        </div>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Shop Simulator</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} style={{ 
            padding: '16px', 
            borderRadius: 'var(--border-radius-sm)', 
            border: '1px solid rgba(0,0,0,0.05)',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
            <div style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.price} Coins</div>
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: 'auto', padding: '8px', fontSize: '0.9rem' }}
              onClick={() => addToCart(item)}
            >
              <Plus size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: 'auto', 
        padding: '16px', 
        backgroundColor: 'rgba(0,0,0,0.02)', 
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Your Cart</h3>
        {cart.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.9rem' }}>Cart is empty.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <span>{item.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '500' }}>{item.price}</span>
                  <button 
                    onClick={() => removeFromCart(index)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total Cost</span>
              <span>{cartTotal} Coins</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: projectedBalance < 0 ? 'var(--color-primary)' : 'inherit' }}>
              <span>Projected Balance</span>
              <span>{projectedBalance} Coins</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '12px' }}
              onClick={handleBuyNow}
              disabled={projectedBalance < 0 || cart.length === 0}
            >
              <CreditCard size={18} /> Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
