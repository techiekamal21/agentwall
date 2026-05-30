import { NextResponse, NextRequest } from 'next/server';
import { liveMonitor } from '@/lib/LiveMonitor';
import { SecurityEngine } from '@/lib/SecurityEngine';

export async function POST(req: NextRequest) {
  try {
    const { prompt, agentId } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const settingsHeader = req.headers.get('X-AgentWall-Settings');
    let settings = undefined;
    try {
      if (settingsHeader && settingsHeader !== 'undefined') {
        settings = JSON.parse(settingsHeader);
      }
    } catch(e) {}

    // Run the prompt through the Tri-Layer Defense Matrix
    const result = await SecurityEngine.evaluate(prompt, settings);
    
    // Log the event to our Real-Time Monitor
    liveMonitor.logEvent({
      isSafe: result.isSafe,
      threatLevel: result.threatLevel,
      detectedPattern: result.detectedPattern,
      reason: `[Layer ${result.caughtByLayer} / ${result.latencyMs}ms] ${result.reason}`,
      promptSnippet: prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt,
      agentId: agentId || 'unknown'
    });
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('AgentWall Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
