// A simple in-memory store to simulate a highly concurrent, real-time database.
// In a true production app, this would be a Redis cluster or TimescaleDB.

export type ThreatEvent = {
  id: string;
  timestamp: number;
  agentId: string;
  isSafe: boolean;
  threatLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  detectedPattern: string;
  reason: string;
  promptSnippet: string;
  ja3Fingerprint: string;
  proxyChain: string[];
};

export type TrafficDataPoint = {
  time: string;
  safe: number;
  blocked: number;
};

class LiveMonitorStore {
  public totalScanned: number = 24592;
  public totalBlocked: number = 1204;
  public recentEvents: ThreatEvent[] = [];
  public trafficHistory: TrafficDataPoint[] = [];

  constructor() {
    this.initializeTrafficHistory();
    // Simulate background background traffic every 2 seconds
    if (typeof window === 'undefined') {
      setInterval(() => this.simulateBackgroundTraffic(), 2000);
    }
  }

  private initializeTrafficHistory() {
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 2000);
      this.trafficHistory.push({
        time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
        safe: Math.floor(Math.random() * 50) + 20,
        blocked: Math.floor(Math.random() * 5),
      });
    }
  }

  private simulateBackgroundTraffic() {
    // Generate safe traffic
    const newSafe = Math.floor(Math.random() * 50) + 10;
    // Occasionally generate a low-level block
    const newBlocked = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;

    this.totalScanned += newSafe + newBlocked;
    this.totalBlocked += newBlocked;

    const d = new Date();
    const timeStr = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    this.trafficHistory.push({
      time: timeStr,
      safe: newSafe,
      blocked: newBlocked,
    });

    if (this.trafficHistory.length > 20) {
      this.trafficHistory.shift();
    }
    
    if (newBlocked > 0 && Math.random() > 0.5) {
      this.logEvent({
        isSafe: false,
        threatLevel: 'low',
        detectedPattern: 'suspicious_keyword',
        reason: 'Automated scan detected minor anomaly.',
        promptSnippet: '[REDACTED BACKGROUND NOISE]',
        agentId: 'background-worker'
      });
    }
  }

  public logEvent(eventData: Omit<ThreatEvent, 'id' | 'timestamp' | 'ja3Fingerprint' | 'proxyChain'>) {
    // Generate simulated Advanced Threat Intel
    const generateHash = () => Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    const mockIps = ['192.168.1.x (Spoofed)', 'Tor Exit Node [Ru]', 'Proxy Chain [NL]', 'Darknet Relay', 'AWS us-east-1 (Compromised)'];
    
    // Create a 3-hop proxy chain
    const chain = [
      mockIps[Math.floor(Math.random() * mockIps.length)],
      mockIps[Math.floor(Math.random() * mockIps.length)],
      'AgentWall Proxy'
    ];

    const event: ThreatEvent = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      ja3Fingerprint: generateHash() + '-' + generateHash(),
      proxyChain: chain,
      ...eventData
    };

    // Keep only last 50 events
    this.recentEvents.unshift(event);
    if (this.recentEvents.length > 50) {
      this.recentEvents.pop();
    }
    
    // Also inject a spike in the traffic graph if it's a manual attack
    if (eventData.agentId === 'test-agent') {
        const d = new Date();
        const timeStr = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        this.trafficHistory.push({
            time: timeStr,
            safe: eventData.isSafe ? 150 : 0, // Visual spike
            blocked: eventData.isSafe ? 0 : 50, // Visual spike for blocked
        });
        if (this.trafficHistory.length > 20) {
            this.trafficHistory.shift();
        }
        
        this.totalScanned += 1;
        if (!eventData.isSafe) {
            this.totalBlocked += 1;
        }
    }
  }

  public getSnapshot() {
    return {
      totalScanned: this.totalScanned,
      totalBlocked: this.totalBlocked,
      activeAgents: 4,
      recentEvents: this.recentEvents.slice(0, 10), // Send only top 10 to frontend
      trafficHistory: this.trafficHistory
    };
  }
}

// Preserve state across hot-reloads in development
const globalForLiveMonitor = global as unknown as { monitor: LiveMonitorStore };
export const liveMonitor = globalForLiveMonitor.monitor || new LiveMonitorStore();
if (process.env.NODE_ENV !== 'production') globalForLiveMonitor.monitor = liveMonitor;
