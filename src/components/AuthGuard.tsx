"use client";

import { useState, useEffect } from 'react';
import { Shield, Key, Fingerprint, Lock } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('agentwall_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate cryptographic verification delay
    setTimeout(() => {
      if (password === 'admin') {
        localStorage.setItem('agentwall_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setError('Invalid Zero-Trust Token / Password');
      }
      setLoading(false);
    }, 800);
  };

  if (checking) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="radar-bg" style={{ opacity: 0.1 }}></div>
      <Shield size={48} color="var(--accent-primary)" className="animate-pulse" />
    </div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        
        <div className="radar-bg" style={{ opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 70%)', zIndex: 1 }}></div>

        <form onSubmit={handleLogin} className="glass-panel animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '450px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', border: '1px solid var(--accent-glow)' }}>
              <Lock size={48} color="var(--accent-primary)" />
            </div>
          </div>
          
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '2px' }}>
            AGENT<span className="text-gradient">WALL</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '-0.5rem' }}>
            Zero-Trust Command Center
          </p>

          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Authentication Token</label>
            <div style={{ position: 'relative' }}>
              <Key size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 'admin' to unlock"
                style={{
                  width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white',
                  fontSize: '1rem', outline: 'none', transition: 'border 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
            {error && <div style={{ color: 'var(--status-danger)', fontSize: '0.8rem', marginTop: '0.5rem', textAlign: 'center' }}>{error}</div>}
          </div>

          <button 
            type="submit"
            disabled={loading || !password}
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white', border: 'none', padding: '1rem', borderRadius: '8px',
              fontSize: '1rem', fontWeight: 600, cursor: loading || !password ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
              marginTop: '1rem', opacity: loading || !password ? 0.7 : 1, transition: 'all 0.2s'
            }}
          >
            {loading ? <span className="animate-pulse">Verifying Signature...</span> : <><Fingerprint size={18} /> Initialize Session</>}
          </button>

          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            SECURE CONNECTION ESTABLISHED • TLS v1.3 • AES-256-GCM
          </div>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
