// app/api/availability/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fromZonedTime } from 'date-fns-tz';
import { getBusyTimes } from '@/lib/googleCalendar';

// GET /api/availability?date=2026-07-01&timezone=Europe/London
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const timezone = searchParams.get('timezone') || 'Europe/London';

  if (!date) {
    return NextResponse.json(
      { error: 'date query param required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }

  try {
    const startISO = fromZonedTime(`${date}T00:00:00`, timezone).toISOString();
    const endISO   = fromZonedTime(`${date}T23:59:59`, timezone).toISOString();

    const busy = await getBusyTimes(startISO, endISO);
    return NextResponse.json({ date, timezone, busy });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
