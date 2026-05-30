import { NextResponse } from 'next/server';

export async function GET() {
  const mockAgents = [
    { id: 'agent-alpha', name: 'Sales Assistant', status: 'active', promptsScanned: 15234, injectionsBlocked: 421, lastActive: '2 mins ago' },
    { id: 'agent-beta', name: 'Data Pipeline', status: 'warning', promptsScanned: 8432, injectionsBlocked: 712, lastActive: '15 mins ago' },
    { id: 'agent-gamma', name: 'Customer Support Bot', status: 'active', promptsScanned: 432, injectionsBlocked: 12, lastActive: '1 hour ago' },
    { id: 'agent-delta', name: 'Internal QA Agent', status: 'error', promptsScanned: 494, injectionsBlocked: 59, lastActive: '4 hours ago' },
  ];
  
  // Simulated network delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ agents: mockAgents });
}
