"use client";

import { useState } from 'react';
import dashboardStyles from '../page.module.css';
import Link from 'next/link';
import { Key, Copy, CheckCircle, Terminal, Trash2, Ban } from 'lucide-react';
import { useGlobalState } from '../../components/GlobalStateProvider';

export default function Onboarding() {
  const [agentName, setAgentName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const { agents, addAgent, revokeAgent, deleteAgent } = useGlobalState();

  const handleGenerate = () => {
    if (!agentName) return;
    addAgent(agentName);
    setAgentName('');
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeAgents = agents.filter(a => a.status === 'active').length;

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
          <Link href="/onboarding" className={`${dashboardStyles.navItem} ${dashboardStyles.active}`}>
            <span className={dashboardStyles.icon}>🚀</span> Agent Onboarding
          </Link>
          <Link href="/alerts" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🚨</span> Threat Alerts
          </Link>
          <Link href="/sandbox" className={dashboardStyles.navItem}>
            <span className={dashboardStyles.icon}>🛡️</span> Sandbox Simulator
          </Link>
        </div>
      </nav>

      <div className={dashboardStyles.content}>
        <div className={dashboardStyles.dashboard} style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '4rem' }}>
          
          <h1 className="animate-fade-in" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Secure Your Agent</h1>
          <p className="animate-fade-in delay-100" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Generate API keys and manage your registered AI agents. ({activeAgents} Active)
          </p>

          <div className={`glass-panel animate-fade-in delay-200`} style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%' }}>
              <Key size={32} color="var(--accent-primary)" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Register New Agent</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="e.g. Sales Assistant Bot" 
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  style={{ 
                    flex: 1, padding: '0.8rem', 
                    background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', 
                    borderRadius: '8px', color: 'white', fontSize: '1rem'
                  }}
                />
                <button 
                  onClick={handleGenerate}
                  disabled={!agentName}
                  style={{
                    background: agentName ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(255,255,255,0.1)',
                    color: agentName ? 'white' : 'var(--text-muted)',
                    border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 600,
                    cursor: agentName ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                  }}
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>

          {agents.length > 0 && (
            <div className={`glass-panel animate-fade-in`} style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Agent Registry</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 0' }}>Agent Name</th>
                    <th style={{ padding: '1rem 0' }}>API Key</th>
                    <th style={{ padding: '1rem 0' }}>Status</th>
                    <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem 0', fontWeight: 500 }}>{agent.name}</td>
                      <td style={{ padding: '1rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                          {agent.key.substring(0, 15)}...
                          <button onClick={() => copyToClipboard(agent.key)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>
                            {copiedKey === agent.key ? <CheckCircle size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0' }}>
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem',
                          background: agent.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: agent.status === 'active' ? 'var(--status-success)' : 'var(--status-danger)'
                        }}>
                          {agent.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button onClick={() => revokeAgent(agent.id)} style={{ background: 'transparent', border: 'none', color: agent.status === 'active' ? 'var(--status-warning)' : 'var(--status-success)', cursor: 'pointer' }}>
                          <Ban size={18} />
                        </button>
                        <button onClick={() => deleteAgent(agent.id)} style={{ background: 'transparent', border: 'none', color: 'var(--status-danger)', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Terminal /> Node.js Integration
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Wrap your existing OpenAI calls with the AgentWall SDK:</p>
            
            <pre style={{ 
              background: '#0d0d1a', padding: '1.5rem', borderRadius: '8px', 
              overflowX: 'auto', border: '1px solid var(--glass-border)',
              color: '#e0e0ff', fontSize: '0.9rem', lineHeight: '1.5'
            }}>
              <code>{`import { AgentWall } from '@agentwall/sdk';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

// 1. Initialize Microsoft Azure AI
const client = new OpenAIClient(
  "https://<resource>.openai.azure.com/", 
  new AzureKeyCredential(process.env.AZURE_API_KEY)
);
const aw = new AgentWall(process.env.AGENTWALL_API_KEY);

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  // 2. Run prompt through the Core Defense Matrix
  const securityCheck = await aw.evaluate(prompt);
  
  if (!securityCheck.isSafe) {
    return res.status(403).json({ error: 'Malicious payload blocked' });
  }

  // 3. Safe to proceed to Azure OpenAI
  const response = await client.getChatCompletions("gpt-4o", [
    { role: "user", content: prompt }
  ]);
  res.json(response);
});`}</code>
            </pre>
          </div>

        </div>
      </div>
    </main>
  );
}
