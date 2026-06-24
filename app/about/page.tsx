function PersonalServiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 20c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.5 20c0-2.3 1.6-4.2 3.5-4.2s3.5 1.9 3.5 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HowWeTeachIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5c-3 0-5.2 2.2-5.2 5 0 1.9 1 3.2 2 4.2.6.6 1 1.1 1 1.8v1h4.4v-1c0-.7.4-1.2 1-1.8 1-1 2-2.3 2-4.2 0-2.8-2.2-5-5.2-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 18.5h4.4M10.3 20.5h3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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
      <path
        d="M8 9.5h8M8 13h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <section className="section">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">About us</h1>
      <p className="mt-4 text-lg text-slate-600">
        A small, personal tutoring team focused on helping each student learn
        in the way that works best for them.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-purple-50 p-10">
          <PersonalServiceIcon className="h-9 w-9 text-purple-500" />
          <h2 className="mt-5 text-2xl font-medium text-navy">Personal service</h2>
          <p className="mt-4 text-slate-600">
            As a small team, we&apos;re able to offer a much more personal
            experience than larger tutoring companies. We get to know our
            students and families individually, making it easier to
            accommodate different learning needs, scheduling requirements,
            and personal circumstances.
          </p>
          <p className="mt-4 text-slate-600">
            Parents can communicate directly with us, and we&apos;re always
            happy to discuss progress, answer questions, or make adjustments
            where needed. This flexibility allows us to provide support that
            feels tailored, responsive, and genuinely focused on each
            student&apos;s success.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-purple-50 p-10">
          <HowWeTeachIcon className="h-9 w-9 text-purple-500" />
          <h2 className="mt-5 text-2xl font-medium text-navy">How we teach</h2>
          <p className="mt-4 text-slate-600">
            There is no single teaching method that works for every student,
            so we adapt our approach to the individual. Some students benefit
            from visual explanations, others from worked examples,
            discussion, or regular practice, and we adjust our lessons
            accordingly.
          </p>
          <p className="mt-4 text-slate-600">
            We focus on building a deep understanding of concepts rather than
            memorising procedures, helping students develop confidence in
            their own thinking and problem-solving abilities. Lessons are
            supportive, interactive, and paced appropriately, ensuring
            students feel challenged without becoming overwhelmed. Our aim is
            not only to improve grades, but to help students become more
            independent, resilient learners.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-violet-200 p-10 text-center sm:p-14">
        <GetInTouchIcon className="mx-auto h-9 w-9 text-green-500" />
        <h2 className="mt-5 text-2xl font-medium text-navy">
          Want to find out if we&apos;re a good fit?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          If you&apos;d like to discuss your child&apos;s needs, ask any
          questions, or find out whether we&apos;d be a good fit, please
          don&apos;t hesitate to get in touch. We&apos;re always happy to have
          an informal conversation and help you explore the best options for
          you.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
