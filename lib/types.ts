// lib/types.ts

export interface CreateBookingInput {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  startISO: string;
  durationMinutes: number;
  timezone?: string;
}

export interface ZoomMeeting {
  joinUrl: string;
  meetingId: number;
  password: string;
}

export interface CalendarEventResult {
  eventId: string | null | undefined;
  htmlLink: string | null | undefined;
}

export interface BusyRange {
  start?: string | null;
  end?: string | null;
}
