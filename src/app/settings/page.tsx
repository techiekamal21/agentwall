"use client";

import { useState, useEffect } from 'react';
import dashboardStyles from '../page.module.css';
import Link from 'next/link';
import { Settings, BrainCircuit, Activity, EyeOff, LogOut, Check } from 'lucide-react';
import { useGlobalState } from '../../components/GlobalStateProvider';

export default function SettingsHub() {
  const { settings, updateSettings } = useGlobalState();
  const [rlEnabled, setRlEnabled] = useState(settings.rlEnabled);
  const [fgsmFilters, setFgsmFilters] = useState(settings.fgsmFilters);
  const [autoencoderTolerance, setAutoencoderTolerance] = useState(settings.autoencoderTolerance.toString());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setRlEnabled(settings.rlEnabled);
    setFgsmFilters(settings.fgsmFilters);
    setAutoencoderTolerance(settings.autoencoderTolerance.toString());
  }, [settings]);

  const handleSave = () => {
    updateSettings({ rlEnabled, fgsmFilters, autoencoderTolerance: parseFloat(autoencoderTolerance) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('agentwall_auth');
    window.location.href = '/';
  };

  return (
    <main className={dashboardStyles.main}>
      <nav className={dashboardStyles.sidebar}>
        <div className={dashboardStyles.logo}>
          <div className={dashboardStyles.logoIcon}></div>
          <h2>Agent<span className="text-gradient">Wall</span></h2>
        </div>
        
        <div className={dashboardStyles.navLinks} style={{ flex: 1 }}>
          <Link href="/" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>📊</span> Live Command Center
          </Link>
          <Link href="/onboarding" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🚀</span> Agent Onboarding
          </Link>
          <Link href="/alerts" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🚨</span> Threat Alerts
          </Link>
          <Link href="/sandbox" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🛡️</span> Sandbox Simulator
          </Link>
          <Link href="/settings" className={`${dashboardStyles.navItem} ${dashboardStyles.active}`}>
            <span className={dashboardStyles.icon}>⚙️</span> Core Settings
          </Link>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
          <button onClick={handleLogout} className={dashboardStyles.navItem} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', color: 'var(--status-danger)' }}>
            <span className={dashboardStyles.icon}><LogOut size={18} /></span> Terminate Session
          </button>
        </div>
      </nav>

      <div className={dashboardStyles.content}>
        <div className={dashboardStyles.dashboard} style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 className="animate-fade-in" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Settings color="var(--accent-primary)" /> Core Defense Matrix
              </h1>
              <p className="animate-fade-in delay-100" style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Configure Layer 4 Adversarial Machine Learning parameters.
              </p>
            </div>
            <button 
              onClick={handleSave}
              className="animate-fade-in delay-200"
              style={{
                background: saved ? 'var(--status-success)' : 'var(--accent-primary)',
                color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px',
                fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'all 0.3s'
              }}
            >
              {saved ? <><Check size={18} /> Configuration Applied</> : 'Deploy Configuration'}
            </button>
          </div>

          <div className="glass-panel animate-fade-in delay-200" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Reinforcement Learning */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
              <div style={{ flex: 1, paddingRight: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <BrainCircuit size={20} color="var(--accent-primary)" /> Automated RL Remediation
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Enables the Reinforcement Learning agent to autonomously mitigate active attacks by dynamically modifying BGP routes and throttling suspicious ASN ranges without human intervention.
                </p>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <input type="checkbox" checked={rlEnabled} onChange={(e) => setRlEnabled(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <div style={{ 
                      width: '50px', height: '26px', background: rlEnabled ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', 
                      borderRadius: '50px', transition: '0.3s', position: 'relative' 
                    }}>
                      <div style={{
                        position: 'absolute', top: '3px', left: rlEnabled ? '27px' : '3px',
                        width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s'
                      }} />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* FGSM Perturbation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
              <div style={{ flex: 1, paddingRight: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <EyeOff size={20} color="var(--accent-primary)" /> FGSM Evasion Filters (Perturbation)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Scans payload tensors for mathematically calculated noise (Fast Gradient Sign Method) designed to bypass traditional neural network classifiers. 
                </p>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <input type="checkbox" checked={fgsmFilters} onChange={(e) => setFgsmFilters(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <div style={{ 
                      width: '50px', height: '26px', background: fgsmFilters ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', 
                      borderRadius: '50px', transition: '0.3s', position: 'relative' 
                    }}>
                      <div style={{
                        position: 'absolute', top: '3px', left: fgsmFilters ? '27px' : '3px',
                        width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s'
                      }} />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Autoencoder Tolerance */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingRight: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Activity size={20} color="var(--accent-primary)" /> Autoencoder Reconstruction Tolerance
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Adjusts the Isolation Forest anomaly threshold. Lower values strictly drop packets that deviate from baseline behavior. High values reduce false positives but increase zero-day risk.
                </p>
              </div>
              <div style={{ width: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>Strict (0.001)</span>
                  <span>Lenient (0.05)</span>
                </div>
                <input 
                  type="range" 
                  min="0.001" max="0.05" step="0.001" 
                  value={autoencoderTolerance}
                  onChange={(e) => setAutoencoderTolerance(e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
                <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  Threshold: {autoencoderTolerance}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
