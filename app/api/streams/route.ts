// app/api/streams/route.ts
import { getStreams } from "@/lib/feed-service";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  
  try {
    const streams = await getStreams(filter || '');
    return NextResponse.json(streams);
  } catch{
    return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
  }
}