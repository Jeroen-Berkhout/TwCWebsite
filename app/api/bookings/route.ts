export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent, getBusyTimes } from '@/lib/googleCalendar';
import db from '@/lib/database';
import type { CreateBookingInput } from '@/lib/types';

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

    // Check Google Calendar.
    const calendarBusy = await getBusyTimes(startISO, endISO);

    if (calendarBusy.length > 0) {
      return NextResponse.json(
        { error: 'That slot was just booked. Please choose another.' },
        { status: 409 }
      );
    }

    // Check bookings made through this website.
    const existingBooking = db.prepare(`
      SELECT id
      FROM bookings
      WHERE start_time < ?
        AND end_time > ?
      LIMIT 1
    `).get(endISO, startISO);

    if (existingBooking) {
      return NextResponse.json(
        { error: 'That slot was just booked. Please choose another.' },
        { status: 409 }
      );
    }

    // Create the Google Calendar event.
    const calendarEvent = await createCalendarEvent({
      summary: `${serviceName} with ${customerName}`,
      startISO,
      endISO,
      timezone,
      customerEmail,
      description: `Booked via website. Customer: ${customerName} (${customerEmail})`,
    });

    try {
      // Persist the booking locally.
      db.prepare(`
        INSERT INTO bookings (
          customer_name,
          customer_email,
          service_name,
          start_time,
          end_time,
          duration_minutes,
          timezone,
          google_event_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        customerName,
        customerEmail,
        serviceName,
        startISO,
        endISO,
        durationMinutes,
        timezone,
        calendarEvent.eventId
      );
    } catch (dbError) {
      // Avoid leaving an orphaned Google Calendar event if the database
      // write fails.
      try {
        // Calendar event cleanup can be added here if desired.
        console.error('Database insert failed after calendar creation:', dbError);
      } catch {
        // Ignore cleanup errors.
      }

      throw dbError;
    }

    return NextResponse.json(
      {
        message: 'Booking confirmed',
        calendarLink: calendarEvent.htmlLink,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}