function SessionPriceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.2v9.6M14.6 9.3c0-1-1-1.7-2.6-1.7s-2.6.8-2.6 1.8c0 2.6 5.2 1.2 5.2 3.8 0 1.1-1.1 1.9-2.6 1.9s-2.7-.7-2.8-1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LessonReportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 3.5h7.5L18 7v12.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14.5 3.5V7H18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M8.5 11h7M8.5 14h7M8.5 17h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FreeMeetingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3.5v-3.5H6a2 2 0 0 1-2-2v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 10.5l2 2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlexibleTimetableIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4 9.5h16M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M8 13l1.6 1.6L13.2 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 16h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GetInTouchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3.5v-3.5H6a2 2 0 0 1-2-2v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 9.5h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <section className="section">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">Pricing</h1>
      <p className="mt-4 text-lg text-slate-600">
        Transparent, flexible pricing with personalised support included.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
          <SessionPriceIcon className="h-8 w-8 text-purple-500" />
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy">£26</span>
            <span className="text-sm text-slate-500">per hour</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            One-to-one tutoring sessions tailored to each student&apos;s
            needs. Every lesson lasts a full hour, giving plenty of time to
            build understanding and confidence.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
          <LessonReportIcon className="h-8 w-8 text-purple-500" />
          <h2 className="mt-4 text-xl font-medium text-navy">
            Lesson reports included
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            After every lesson, parents receive a short progress report
            outlining what was covered, key achievements, and any
            recommended areas for further practice.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
          <FreeMeetingIcon className="h-8 w-8 text-purple-500" />
          <h2 className="mt-4 text-xl font-medium text-navy">
            Free introductory meetings
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            We are always happy to arrange a free meeting to discuss your
            child&apos;s goals, answer questions, and determine whether
            we&apos;re the right fit.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
          <FlexibleTimetableIcon className="h-8 w-8 text-purple-500" />
          <h2 className="mt-4 text-xl font-medium text-navy">
            Flexible timetable
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Lessons can be arranged around school, extracurricular
            activities, and family commitments, with scheduling options
            designed to fit busy timetables.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-200 to-purple-300 p-8 text-center sm:p-12">
        <GetInTouchIcon className="mx-auto h-8 w-8 text-green-500" />
        <h2 className="mt-4 text-xl font-medium text-navy">
          Have a question about pricing?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
          Get in touch to arrange a meeting or talk through what would work
          best for your family.
        </p>
        <a
          href="/contact"
          className="mt-5 inline-block rounded-full bg-navy px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
