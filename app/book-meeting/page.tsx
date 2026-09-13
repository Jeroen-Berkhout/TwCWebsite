'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { fromZonedTime } from 'date-fns-tz';

interface FormState {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  durationMinutes: number;
}

interface BookingResult {
  message: string;
  calendarLink?: string;
}

interface BusyRange {
  start: string;
  end: string;
}

interface Slot {
  label: string;
  startISO: string;
  endISO: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TIMEZONE = 'Europe/London';

function generateSlots(dateStr: string, durationMinutes: number): Slot[] {
  const slots: Slot[] = [];

  for (let hour = 15; hour < 21; hour++) {
    for (const min of [0, 30]) {
      const totalMins = hour * 60 + min + durationMinutes;

      if (totalMins > 21 * 60) continue;

      const localStart = `${dateStr}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
      const start = fromZonedTime(localStart, TIMEZONE);
      const end = new Date(start.getTime() + durationMinutes * 60000);

      slots.push({
        label: start.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: TIMEZONE,
        }),
        startISO: start.toISOString(),
        endISO: end.toISOString(),
      });
    }
  }

  return slots;
}

function getTomorrowStr(): string {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1
    )
  );

  return tomorrow.toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);

  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function slotOverlapsBusy(slot: Slot, busy: BusyRange[]): boolean {
  const slotStart = new Date(slot.startISO);
  const slotEnd = new Date(slot.endISO);

  return busy.some((range) => {
    const busyStart = new Date(range.start);
    const busyEnd = new Date(range.end);

    return busyStart < slotEnd && busyEnd > slotStart;
  });
}

export default function BookMeetingPage() {
  const [form, setForm] = useState<FormState>({
    customerName: '',
    customerEmail: '',
    serviceName: 'Free Consultation',
    durationMinutes: 30,
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [busy, setBusy] = useState<BusyRange[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const minDate = getTomorrowStr();

  useEffect(() => {
    setSelectedSlot(null);
    setBusy([]);
    setErrorMsg('');

    if (!selectedDate) return;

    let cancelled = false;

    async function fetchAvailability() {
      setLoadingAvailability(true);

      try {
        const params = new URLSearchParams({
          date: selectedDate,
          timezone: TIMEZONE,
        });

        const res = await fetch(`/api/availability?${params.toString()}`);

        if (!res.ok) {
          throw new Error('Failed to fetch availability');
        }

        const data = await res.json();

        if (!cancelled) {
          setBusy(data.busy ?? []);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setBusy([]);
          setErrorMsg('Unable to load availability. Please try again.');
          setStatus('error');
        }
      } finally {
        if (!cancelled) {
          setLoadingAvailability(false);
        }
      }
    }

    fetchAvailability();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, form.durationMinutes]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'durationMinutes'
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const slots = selectedDate
    ? generateSlots(selectedDate, Number(form.durationMinutes)).filter(
        (slot) => !slotOverlapsBusy(slot, busy)
      )
    : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSlot) {
      setErrorMsg('Please select a time slot.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          serviceName: form.serviceName,
          startISO: selectedSlot.startISO,
          durationMinutes: Number(form.durationMinutes),
          timezone: TIMEZONE,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(
          data.error || 'Something went wrong. Please try a different time.'
        );
        setStatus('error');
        return;
      }

      setResult(data);
      setStatus('success');
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success' && result) {
    return (
      <section className="section max-w-4xl">
        <h1 className="text-5xl font-semibold tracking-tight text-navy">
          Booking Confirmed
        </h1>

        <div className="mt-16 rounded-3xl border border-slate-300 bg-white p-16">
          <p className="text-lg text-slate-600">
            You&apos;re all set. A calendar invitation has been sent to your
            email address.
          </p>

          {result.calendarLink && (
            <p className="mt-6">
              <a
                href={result.calendarLink}
                className="font-medium text-teal"
                target="_blank"
                rel="noopener noreferrer"
              >
                View calendar event
              </a>
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="section max-w-4xl">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">
        Book Free Meeting
      </h1>
        <p className="mt-4 text-2xl text-slate-500">
          Or email us at{' '}
          <a href="mailto:tutorswithchemistry@gmail.com" className="text-teal font-medium">
            tutorswithchemistry@gmail.com
          </a>
          !
        </p>
      <form
        onSubmit={handleSubmit}
        className="mt-16 space-y-8 rounded-3xl border border-slate-300 bg-white p-16"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            name="customerName"
            required
            value={form.customerName}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="customerEmail"
            required
            value={form.customerEmail}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Duration
          </label>
          <select
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          >
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            min={minDate}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Available slots, {formatDateLabel(selectedDate)}{' '}
              <span className="font-normal text-slate-400">
                (UK time)
              </span>
            </label>

            {loadingAvailability ? (
              <p className="mt-3 text-sm text-slate-500">
                Checking availability...
              </p>
            ) : slots.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">
                No slots available for this duration on this day.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {slots.map((slot) => {
                  const isSelected =
                    selectedSlot?.startISO === slot.startISO;

                  return (
                    <button
                      key={slot.startISO}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-teal bg-teal text-white'
                          : 'border-slate-300 text-slate-700 hover:border-teal hover:text-teal'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !selectedSlot}
          className="rounded-lg bg-teal px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          {status === 'submitting' ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
}