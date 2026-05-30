"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, ShieldAlert, Shield, Server, Terminal } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await fetch('/api/proxy/stream');
        const snapshot = await res.json();
        setData(snapshot);
      } catch (e) {
        console.error("Failed to fetch live stats");
      }
    };

    fetchLiveStats();
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(fetchLiveStats, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <main className={styles.main}>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <h2>Agent<span className="text-gradient">Wall</span></h2>
        </div>
        
        <div className={styles.navLinks} style={{ flex: 1 }}>
          <Link href="/" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.icon}>📊</span> Live Command Center
          </Link>
          <Link href="/onboarding" className={styles.navItem}>
            <span className={styles.icon}>🚀</span> Agent Onboarding
          </Link>
          <Link href="/alerts" className={styles.navItem}>
            <span className={styles.icon}>🚨</span> Threat Alerts
          </Link>
          <Link href="/sandbox" className={styles.navItem}>
            <span className={styles.icon}>🛡️</span> Sandbox Simulator
          </Link>
          <Link href="/settings" className={styles.navItem}>
            <span className={styles.icon}>⚙️</span> Core Settings
          </Link>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
          <button onClick={() => { localStorage.removeItem('agentwall_auth'); window.location.href = '/'; }} className={styles.navItem} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', color: 'var(--status-danger)' }}>
            <span className={styles.icon}>🚪</span> Terminate Session
          </button>
        </div>
      </nav>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.search}>
            <input type="text" placeholder="Search live stream, agents, or rules..." />
          </div>
          <div className={styles.profile} onClick={() => setIsLive(!isLive)} style={{ cursor: 'pointer' }}>
            <span className={styles.badge} style={{ borderColor: isLive ? 'var(--status-success)' : 'var(--text-muted)' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', 
                background: isLive ? 'var(--status-success)' : 'var(--text-muted)',
                boxShadow: isLive ? '0 0 8px var(--status-success)' : 'none',
                animation: isLive ? 'pulse 2s infinite' : 'none'
              }} />
              {isLive ? 'LIVE' : 'PAUSED'}
            </span>
          </div>
        </header>

        <div className={styles.dashboard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <h1 className="animate-fade-in">Global Threat Monitor</h1>
              <p className={`animate-fade-in delay-100 ${styles.subtitle}`}>Intercepting prompts across {data?.activeAgents || 0} active agents in real-time.</p>
            </div>
            
            {/* Flashing Zero Day Alert if critical event happened recently */}
            {data?.recentEvents?.[0]?.threatLevel === 'critical' && (
              <div className="animate-fade-in" style={{
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--status-danger)', 
                padding: '0.75rem 1.5rem', borderRadius: '8px', color: 'var(--status-danger)',
                display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'pulse 1s infinite'
              }}>
                <ShieldAlert size={20} />
                <strong>ZERO-DAY DETECTED</strong>
              </div>
            )}
          </div>

          <div className={styles.statsGrid}>
            <div className={`glass-panel animate-fade-in delay-100 ${styles.statCard}`}>
              <h3>Total Prompts Scanned</h3>
              <div className={styles.statValue}>{data ? data.totalScanned.toLocaleString() : '---'}</div>
              <div className={`${styles.statChange} ${styles.positive}`}>Live Polling Active</div>
            </div>
            <div className={`glass-panel animate-fade-in delay-200 ${styles.statCard}`} style={{ borderColor: data?.recentEvents?.[0]?.isSafe === false ? 'var(--status-danger)' : ''}}>
              <h3>Injections Blocked</h3>
              <div className={styles.statValue} style={{ color: 'var(--status-danger)'}}>{data ? data.totalBlocked.toLocaleString() : '---'}</div>
              <div className={`${styles.statChange} ${styles.negative}`}>Protecting Agents</div>
            </div>
            <div className={`glass-panel animate-fade-in delay-300 ${styles.statCard}`}>
              <h3>Active Agents</h3>
              <div className={styles.statValue}>{data ? data.activeAgents : '-'}</div>
              <div className={`${styles.statChange} ${styles.neutral}`}>Online & Secured</div>
            </div>
          </div>

          <div className={styles.chartsGrid}>
            
            {/* Cyber Threat Topology Map - Shadow Graph Tracer */}
            <div className={`glass-panel animate-fade-in delay-200 ${styles.chartCard} ${styles.large}`} style={{ gridColumn: 'span 2', position: 'relative', overflow: 'hidden' }}>
              <h3>Global Threat Topology (Shadow Graph Tracer)</h3>
              
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 30%, rgba(10,10,26,0.9) 100%)', zIndex: 1 }} />
              
              <div style={{ height: 400, width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Central AgentWall Node */}
                <div style={{
                  position: 'absolute', top: '50%', left: '80%', transform: 'translate(-50%, -50%)',
                  width: 60, height: 60, borderRadius: '50%', background: 'var(--accent-glow)',
                  border: '2px solid var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5,
                  boxShadow: '0 0 30px var(--accent-primary)'
                }}>
                  <Shield size={32} color="var(--accent-primary)" />
                  <div style={{ position: 'absolute', bottom: -25, fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>AgentWall Core</div>
                </div>

                {/* Animated Proxy Traces based on Recent Events */}
                {data?.recentEvents?.slice(0, 4).map((evt: any, i: number) => {
                  const yOffset = (i * 25) + 12;
                  const isBlocked = !evt.isSafe;
                  const color = evt.isHoneypot ? 'var(--accent-primary)' : isBlocked ? 'var(--status-danger)' : 'var(--status-success)';
                  
                  return (
                    <div key={evt.id} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                      
                      {/* Connection Line */}
                      <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}>
                        <path 
                          d={`M 100,${yOffset}% Q 400,${yOffset}% 80%,50%`} 
                          fill="none" 
                          stroke={color} 
                          strokeWidth="2" 
                          strokeDasharray="10 5"
                          style={{ opacity: 0.4, animation: 'dash 20s linear infinite' }}
                        />
                      </svg>

                      {/* Origin Node (Spoofed IP) */}
                      <div style={{
                        position: 'absolute', left: '10%', top: `${yOffset}%`, transform: 'translate(-50%, -50%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3
                      }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 15px ${color}` }} />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '5px', whiteSpace: 'nowrap' }}>
                          {evt.proxyChain?.[0] || 'Unknown Origin'}
                        </span>
                        {isBlocked && (
                          <span style={{ fontSize: '0.65rem', color: color, marginTop: '2px', fontFamily: 'monospace' }}>
                            JA3: {evt.ja3Fingerprint?.split('-')[0]}
                          </span>
                        )}
                      </div>

                      {/* Tor / Proxy Hop Node */}
                      <div style={{
                        position: 'absolute', left: '45%', top: `${(yOffset + 50) / 2}%`, transform: 'translate(-50%, -50%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3
                      }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)', border: `1px solid ${color}` }} />
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '5px', whiteSpace: 'nowrap' }}>
                          {evt.proxyChain?.[1] || 'Routing Node'}
                        </span>
                      </div>

                      {/* Moving Payload Packet */}
                      <div style={{
                        position: 'absolute', left: '10%', top: `${yOffset}%`,
                        width: 6, height: 6, borderRadius: '50%', background: '#fff',
                        boxShadow: '0 0 10px #fff', zIndex: 4,
                        animation: `movePacket 3s cubic-bezier(0.4, 0, 0.2, 1) infinite ${i * 0.5}s`
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`glass-panel animate-fade-in delay-200 ${styles.chartCard} ${styles.large}`}>
              <h3>Live Traffic Analysis</h3>
              <div style={{ height: 300, width: '100%', marginTop: '1rem', minWidth: 0 }}>
                <ResponsiveContainer width="99%" height="100%">
                  <AreaChart data={data?.trafficHistory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--status-success)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--status-success)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--status-danger)" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="var(--status-danger)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickMargin={10} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: 'rgba(10,10,26,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Area type="monotone" dataKey="safe" name="Safe Traffic" stroke="var(--status-success)" fillOpacity={1} fill="url(#colorSafe)" isAnimationActive={false} />
                    <Area type="monotone" dataKey="blocked" name="Blocked Attacks" stroke="var(--status-danger)" fillOpacity={1} fill="url(#colorBlocked)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className={`glass-panel animate-fade-in delay-300 ${styles.chartCard}`} style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Live Threat Feed</h3>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', marginTop: '1rem' }}>
                <ul className={styles.alertList}>
                  {data?.recentEvents?.map((event: any) => (
                    <li key={event.id} className={styles.alertItem} style={{ 
                      borderLeftColor: event.isSafe ? 'var(--status-success)' : 'var(--status-danger)',
                      background: event.isSafe ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.1)'
                    }}>
                      <div className={styles.alertText} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: event.isSafe ? 'var(--status-success)' : 'var(--status-danger)' }}>
                            {event.detectedPattern.toUpperCase()}
                          </strong>
                          <span style={{ fontSize: '0.7rem' }}>
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <span style={{ color: 'var(--text-primary)', marginTop: '4px' }}>Agent: {event.agentId}</span>
                        <div style={{ 
                          fontSize: '0.8rem', 
                          color: 'var(--text-secondary)', 
                          background: 'rgba(0,0,0,0.3)', 
                          padding: '0.5rem', 
                          borderRadius: '4px',
                          marginTop: '0.5rem',
                          fontFamily: 'monospace'
                        }}>
                          "{event.promptSnippet}"
                        </div>
                      </div>
                    </li>
                  ))}
                  
                  {(!data || data.recentEvents.length === 0) && (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                      <Activity size={32} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                      <p>Listening for traffic...</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
