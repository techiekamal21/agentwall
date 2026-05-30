import { NextResponse } from 'next/server';
import { liveMonitor } from '@/lib/LiveMonitor';

export async function GET() {
  // Disable caching so the dashboard always gets the latest data
  return NextResponse.json(liveMonitor.getSnapshot(), {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
