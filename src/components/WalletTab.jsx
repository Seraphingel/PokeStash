import React, { useState } from 'react';
import { Coins, Plus, Minus, Save, ArrowRight, ShieldCheck, History } from 'lucide-react';

export function WalletTab({ coins, overrideCoins, DAILY_COINS }) {
  const [editMode, setEditMode] = useState(false);
  const [tempBalance, setTempBalance] = useState(coins);

  const handleSave = () => {
    overrideCoins(tempBalance);
    setEditMode(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      
      {/* Wallet Summary Block */}
      <div className="glass-panel" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 24px 0', fontSize: '1.2rem', opacity: 0.9 }}>
          <ShieldCheck size={20} /> Current Balance
        </h2>
        
        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Coins size={48} color="#FCD34D" />
          {coins}
        </div>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>
          Pokécoins available to spend in the simulator.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: '600' }}>Daily Limit</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{DAILY_COINS}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: '600' }}>Status</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#FCD34D' }}>Active</div>
          </div>
        </div>
      </div>

      {/* Wallet Actions / PILL UI */}
      <div>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>Account Actions</h3>
        
        {editMode ? (
          <div className="wallet-pill" style={{ borderColor: 'var(--color-primary)', boxShadow: '0 8px 30px rgba(229,57,53,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="wallet-icon-box" style={{ background: 'var(--color-primary)', color: 'white' }}>
                <Coins size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Editing Balance</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => setTempBalance(Math.max(0, tempBalance - 10))} className="btn-icon" style={{ background: '#f0f0f5', border: 'none' }}><Minus size={16}/></button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>{tempBalance}</span>
                  <button onClick={() => setTempBalance(tempBalance + 10)} className="btn-icon" style={{ background: '#f0f0f5', border: 'none' }}><Plus size={16}/></button>
                </div>
              </div>
            </div>
            <button onClick={handleSave} className="btn btn-primary" style={{ padding: '12px', borderRadius: '12px' }}>
              <Save size={20} /> Save
            </button>
          </div>
        ) : (
          <div className="wallet-pill" onClick={() => setEditMode(true)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="wallet-icon-box">
                <Coins size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>Edit Total Balance</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Manually override your Pokécoins</div>
              </div>
            </div>
            <ArrowRight size={20} color="var(--color-text-secondary)" />
          </div>
        )}

        <div className="wallet-pill" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="wallet-icon-box" style={{ background: '#f0f0f5', color: 'var(--color-text-secondary)' }}>
              <History size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>Transaction History</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Coming soon</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
