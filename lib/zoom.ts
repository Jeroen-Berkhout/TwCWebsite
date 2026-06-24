// lib/zoom.ts
// Server-to-Server OAuth: no per-user consent screen needed.
// Setup: Zoom Marketplace -> Develop -> Build App -> "Server-to-Server OAuth".

import type { ZoomMeeting } from './types';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getZoomAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const basicAuth = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    {
      method: 'POST',
      headers: { Authorization: `Basic ${basicAuth}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Zoom auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken as string;
}

interface CreateZoomMeetingParams {
  topic: string;
  startTimeISO: string; // e.g. "2026-07-01T14:00:00"
  durationMinutes: number;
  timezone: string; // IANA tz, e.g. "Europe/London"
}

export async function createZoomMeeting({
  topic,
  startTimeISO,
  durationMinutes,
  timezone,
}: CreateZoomMeetingParams): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();

  const res = await fetch(
    `https://api.zoom.us/v2/users/${process.env.ZOOM_HOST_USER_ID}/meetings`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        type: 2,
        start_time: startTimeISO,
        duration: durationMinutes,
        timezone,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          waiting_room: true,
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Zoom meeting creation failed: ${res.status} ${await res.text()}`);
  }

  const meeting = await res.json();
  return {
    joinUrl: meeting.join_url,
    meetingId: meeting.id,
    password: meeting.password,
  };
}
