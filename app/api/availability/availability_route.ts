import { NextRequest, NextResponse } from 'next/server';
import { fromZonedTime } from 'date-fns-tz';
import { getBusyTimes } from '@/lib/googleCalendar';
import db from '@/lib/database';

// GET /api/availability?date=2026-07-01&duration=30&timezone=Europe/London
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const timezone = searchParams.get('timezone') || 'Europe/London';
  const duration = Number(searchParams.get('duration') || 30);

  if (!date) {
    return NextResponse.json(
      { error: 'date query param required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }

  if (!Number.isInteger(duration) || duration <= 0) {
    return NextResponse.json(
      { error: 'duration must be a positive integer' },
      { status: 400 }
    );
  }

  try {
    const dayStart = fromZonedTime(`${date}T00:00:00`, timezone);
    const dayEnd = fromZonedTime(`${date}T23:59:59`, timezone);

    const busy = await getBusyTimes(
      dayStart.toISOString(),
      dayEnd.toISOString()
    );

    const bookings = db.prepare(`
      SELECT start_time, end_time
      FROM bookings
      WHERE start_time < ?
        AND end_time > ?
    `).all(
      dayEnd.toISOString(),
      dayStart.toISOString()
    ) as { start_time: string; end_time: string }[];

    const unavailable = [
      ...busy.map((range) => ({
        start: range.start,
        end: range.end,
      })),
      ...bookings.map((booking) => ({
        start: booking.start_time,
        end: booking.end_time,
      })),
    ];

    const slots: string[] = [];

    for (let hour = 15; hour < 21; hour++) {
      for (const minute of [0, 30]) {
        const localStart = `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
        const start = fromZonedTime(localStart, timezone);
        const end = new Date(start.getTime() + duration * 60_000);

        if (end > dayEnd) continue;

        const overlaps = unavailable.some((range) => {
        if (!range.start || !range.end) return false;
        return new Date(range.start) < end && new Date(range.end) > start;
      });

        if (!overlaps) {
          slots.push(start.toISOString());
        }
      }
    }

    return NextResponse.json({
      date,
      timezone,
      duration,
      slots,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
};