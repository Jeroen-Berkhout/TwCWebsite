'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';

interface FormState {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  durationMinutes: number;
}

interface BookingResult {
  message: string;
  zoomJoinUrl: string;
  calendarLink: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Generate slots from 15:00–21:00 GMT in 30-min increments
function generateSlots(dateStr: string, durationMinutes: number): { label: string; startISO: string; endISO: string }[] {
  const slots = [];
  // 15:00 to 20:30 GMT (last slot end = 21:00)
  for (let hour = 15; hour < 21; hour++) {
    for (const min of [0, 30]) {
      // Skip if slot would end after 21:00
      const totalMins = hour * 60 + min + durationMinutes;
      if (totalMins > 21 * 60) continue;

      const startUTC = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00Z`);
      const endUTC = new Date(startUTC.getTime() + durationMinutes * 60000);

      const label = startUTC.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London',
      });

      slots.push({
        label,
        startISO: startUTC.toISOString(),
        endISO: endUTC.toISOString(),
      });
    }
  }
  return slots;
}

// Returns YYYY-MM-DD for tomorrow and beyond (GMT-safe)
function getTomorrowStr(): string {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return tomorrow.toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'UTC',
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
  const [selectedSlot, setSelectedSlot] = useState<{ startISO: string; endISO: string } | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const minDate = getTomorrowStr();

  // Reset slot when date or duration changes
  useEffect(() => { setSelectedSlot(null); }, [selectedDate, form.durationMinutes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const slots = selectedDate ? generateSlots(selectedDate, Number(form.durationMinutes)) : [];

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
          timezone: 'Europe/London',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try a different time.');
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
        <h1 className="text-5xl font-semibold tracking-tight text-navy">Booking Confirmed</h1>
        <div className="mt-16 rounded-3xl border border-slate-300 p-16 bg-white">
          <p className="text-lg text-slate-600">
            You&apos;re all set. A calendar invite with your Zoom link is on its way to your inbox.
          </p>
          <p className="mt-6">
            <a href={result.zoomJoinUrl} className="text-teal font-medium" target="_blank" rel="noopener noreferrer">
              Zoom meeting link
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section max-w-4xl">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">Book Free Meeting</h1>

      <form onSubmit={handleSubmit} className="mt-16 rounded-3xl border border-slate-300 p-16 bg-white space-y-8">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            name="customerName"
            required
            value={form.customerName}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="customerEmail"
            required
            value={form.customerEmail}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Duration</label>
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

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
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

        {/* Slot grid */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Available slots — {formatDateLabel(selectedDate)} <span className="text-slate-400 font-normal">(GMT)</span>
            </label>
            {slots.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No slots available for this duration on this day.</p>
            ) : (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.startISO === slot.startISO;
                  return (
                    <button
                      key={slot.startISO}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-teal text-white border-teal'
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
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !selectedSlot}
          className="rounded-lg bg-teal text-white font-medium px-6 py-3 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
}
