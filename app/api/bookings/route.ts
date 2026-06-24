// app/api/bookings/route.ts
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createZoomMeeting } from '@/lib/zoom';
import { createCalendarEvent, getBusyTimes } from '@/lib/googleCalendar';
import type { CreateBookingInput } from '@/lib/types';

// POST /api/bookings
export async function POST(request: NextRequest) {
  const body: CreateBookingInput = await request.json();
  const {
    customerName,
    customerEmail,
    serviceName,
    startISO,
    durationMinutes,
    timezone = 'Europe/London',
  } = body;

  if (!customerEmail || !startISO || !durationMinutes) {
    return NextResponse.json(
      { error: 'customerEmail, startISO, durationMinutes are required' },
      { status: 400 }
    );
  }

  try {
    const endISO = new Date(
      new Date(startISO).getTime() + durationMinutes * 60000
    ).toISOString();

    // Re-check the slot is still free (race-condition guard between page load
    // and submit). For production, also add a DB-level unique constraint.
    const busy = await getBusyTimes(startISO, endISO);
    if (busy.length > 0) {
      return NextResponse.json(
        { error: 'That slot was just booked. Please choose another.' },
        { status: 409 }
      );
    }

    const zoomMeeting = await createZoomMeeting({
      topic: `${serviceName} — ${customerName}`,
      startTimeISO: startISO,
      durationMinutes,
      timezone,
    });

    const calendarEvent = await createCalendarEvent({
      summary: `${serviceName} with ${customerName}`,
      startISO,
      endISO,
      timezone,
      zoomJoinUrl: zoomMeeting.joinUrl,
      customerEmail,
      description: `Booked via website. Customer: ${customerName} (${customerEmail})`,
    });

    // Persist to your own DB here, e.g.:
    // await db.bookings.create({ customerEmail, serviceName, startISO, endISO,
    //   zoomMeetingId: zoomMeeting.meetingId, googleEventId: calendarEvent.eventId });

    return NextResponse.json(
      {
        message: 'Booking confirmed',
        zoomJoinUrl: zoomMeeting.joinUrl,
        calendarLink: calendarEvent.htmlLink,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
