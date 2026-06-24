'use client';

import { fromZonedTime } from 'date-fns-tz/fp/fromZonedTime';
import { useState, FormEvent, ChangeEvent } from 'react';

interface FormState {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  date: string;
  time: string;
  durationMinutes: number;
}

interface BookingResult {
  message: string;
  zoomJoinUrl: string;
  calendarLink: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BookMeetingPage() {
  const [form, setForm] = useState<FormState>({
    customerName: '',
    customerEmail: '',
    serviceName: 'Free Consultation',
    date: '',
    time: '',
    durationMinutes: 30,
  });
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    if (!form.date || !form.time) {
      setErrorMsg('Please select a date and time.');
      setStatus('error');
      return;
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startISO = fromZonedTime(`${form.date}T${form.time}:00`, timezone).toISOString();
  // ...rest unchanged

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          serviceName: form.serviceName,
          startISO,
          durationMinutes: Number(form.durationMinutes),
          timezone,
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
    } catch (err) {
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

      <form onSubmit={handleSubmit} className="mt-16 rounded-3xl border border-slate-300 p-16 bg-white space-y-6">
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Time</label>
            <input
              type="time"
              name="time"
              required
              value={form.time}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
        </div>

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

        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-lg bg-teal text-white font-medium px-6 py-3 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
}
