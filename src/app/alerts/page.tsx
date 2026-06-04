"use client";

import { useEffect, useState } from 'react';
import dashboardStyles from '../page.module.css';
import Link from 'next/link';
import { ShieldAlert, Crosshair, CheckCircle, Ban, Layers } from 'lucide-react';
import { useGlobalState } from '../../components/GlobalStateProvider';

export default function AlertsHub() {
  const { recentEvents } = useGlobalState();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = recentEvents.filter((e: any) => !e.isSafe);

  return (
    <main className={dashboardStyles.main}>
      <nav className={dashboardStyles.sidebar}>
        <div className={dashboardStyles.logo}>
          <div className={dashboardStyles.logoIcon}></div>
          <h2>Agent<span className="text-gradient">Wall</span></h2>
        </div>
        
        <div className={dashboardStyles.navLinks}>
          <Link href="/" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>📊</span> Live Command Center
          </Link>
          <Link href="/onboarding" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🚀</span> Agent Onboarding
          </Link>
          <Link href="/alerts" className={`${dashboardStyles.navItem} ${dashboardStyles.active}`}>
            <span className={dashboardStyles.icon}>🚨</span> Threat Alerts
          </Link>
          <Link href="/sandbox" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🛡️</span> Sandbox Simulator
          </Link>
        </div>
      </nav>

      <div className={dashboardStyles.content}>
        <header className={dashboardStyles.header}>
          <div className={dashboardStyles.search}>
            <input type="text" placeholder="Search by IP, Agent ID, or Attack Pattern..." />
          </div>
          <div className={dashboardStyles.profile}>
            <span className={dashboardStyles.badge} style={{ borderColor: 'var(--status-danger)', color: 'var(--status-danger)' }}>SOC Active</span>
          </div>
        </header>

        <div className={dashboardStyles.dashboard} style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 80px)' }}>
          
          {/* Alerts List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Blocked Payloads</h1>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '1rem' }}>
              {events.map((evt) => (
                <div 
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`glass-panel animate-fade-in`}
                  style={{ 
                    padding: '1.5rem', cursor: 'pointer',
                    borderLeft: `4px solid ${evt.threatLevel === 'critical' ? 'var(--status-danger)' : 'var(--status-warning)'}`,
                    background: selectedEvent?.id === evt.id ? 'rgba(255,255,255,0.08)' : 'var(--glass-bg)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: evt.threatLevel === 'critical' ? 'var(--status-danger)' : 'var(--status-warning)' }}>
                      {evt.detectedPattern.toUpperCase()}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Target: {evt.agentId}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {evt.promptSnippet}
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
                  <ShieldAlert size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>No blocked payloads in recent history.</p>
                </div>
              )}
            </div>
          </div>

          {/* Alert Details Panel */}
          <div style={{ width: '500px', display: 'flex', flexDirection: 'column' }}>
            {selectedEvent ? (
              <div className="glass-panel animate-fade-in" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                  Incident Report: {selectedEvent.id}
                </h2>
                
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Caught By:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    <Layers size={18} /> Core Defense Matrix: Layer {selectedEvent.reason.match(/Layer (\d)/)?.[1] || 3}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>JA3 Fingerprint (TLS):</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--status-danger)' }}>
                      {selectedEvent.ja3Fingerprint || 'Unknown'}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Proxy Chain Trace:</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {selectedEvent.proxyChain ? selectedEvent.proxyChain.join(' → ') : 'Direct'}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Analysis Reason:</div>
                  <div style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {selectedEvent.reason}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Raw Payload Extract:</div>
                  <pre style={{ 
                    background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', 
                    border: '1px solid var(--glass-border)', fontFamily: 'monospace', 
                    color: '#ff7b72', fontSize: '0.9rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all'
                  }}>
                    {selectedEvent.promptSnippet}
                  </pre>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <button style={{ 
                    flex: 1, padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', 
                    color: 'var(--status-success)', border: '1px solid var(--status-success)', 
                    borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    fontWeight: 600
                  }}>
                    <CheckCircle size={18} /> Mark False Positive
                  </button>
                  <button style={{ 
                    flex: 1, padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', 
                    color: 'var(--status-danger)', border: '1px solid var(--status-danger)', 
                    borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    fontWeight: 600
                  }}>
                    <Ban size={18} /> Ban Origin IP
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <div style={{ textAlign: 'center' }}>
                  <Crosshair size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>Select an incident to view details</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
