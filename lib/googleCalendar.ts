// lib/googleCalendar.ts
import { google } from 'googleapis';
import type { CalendarEventResult, BusyRange } from './types';

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

interface CreateCalendarEventParams {
  summary: string;
  startISO: string;
  endISO: string;
  timezone: string;
  zoomJoinUrl: string;
  customerEmail: string;
  description?: string;
}

export async function createCalendarEvent({
  summary,
  startISO,
  endISO,
  timezone,
  zoomJoinUrl,
  customerEmail,
  description = '',
}: CreateCalendarEventParams): Promise<CalendarEventResult> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    description: `${description}\n\nJoin Zoom Meeting: ${zoomJoinUrl}`.trim(),
    location: zoomJoinUrl,
    start: { dateTime: startISO, timeZone: timezone },
    end: { dateTime: endISO, timeZone: timezone },
    attendees: [{ email: customerEmail }],
    reminders: {
      useDefault: false,
      overrides: [{ method: 'email', minutes: 60 }],
    },
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    sendUpdates: 'all',
  });

  return {
    eventId: res.data.id,
    htmlLink: res.data.htmlLink,
  };
}

export async function getBusyTimes(startISO: string, endISO: string): Promise<BusyRange[]> {
  console.log('getBusyTimes called with:', { startISO, endISO });

  if (!startISO || !endISO) {
    throw new Error(`getBusyTimes: missing time range (start=${startISO}, end=${endISO})`);
  }
  if (new Date(startISO) >= new Date(endISO)) {
    throw new Error(`getBusyTimes: timeMin must be before timeMax (start=${startISO}, end=${endISO})`);
  }

  const auth = getOAuthClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: startISO,
      timeMax: endISO,
      items: [{ id: 'primary' }],
    },
  });

  return res.data.calendars?.primary?.busy ?? [];
}
