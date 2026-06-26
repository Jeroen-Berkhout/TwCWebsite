// import Hero from "@/components/Hero";

// const features = [
//   {
//     title: "Personalized academic support",
//     description:
//       "Tailored tutoring to meet each student's unique needs and goals. Tutors with real experience in adjusting teaching approaches to help students excel.",
//     bg: "bg-amber-100",
//   },
//   {
//     title: "Online-first flexible delivery",
//     description:
//       "Convenient online lessons that fit your schedule and learning style. Refunds and adjustments available for any issues.",
//     bg: "bg-indigo-100",
//   },
//   {
//     title: "Experienced university tutors",
//     description:
//       "Qualified DBS-checked tutors with at least three years of university study in STEM subjects, and hundreds of lessons delivered.",
//     bg: "bg-violet-100",
//   },
// ];

// const highlights = [
//   "Engaging, structured lessons",
//   "Always prepared in advance",
//   "Goes beyond the syllabus",
//   "Students look forward to every lesson",
//   "Wholeheartedly recommended",
//   "Excellent rapport with students",
//   "Maths was made clear",


// ];

// export default function HomePage() {
//   return (
//     <>
//       <Hero />

//       <section className="section">
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((item) => (
//             <div
//               key={item.title}
//               className={`rounded-3xl border border-slate-200 p-10 ${item.bg}`}
//             >
//               <h2 className="text-2xl font-semibold text-navy">{item.title}</h2>
//               <p className="mt-4 text-slate-600">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="section">
//         <p className="text-sm font-medium uppercase tracking-widest text-slate-400">Reviews from students & parents say</p>
//         <ul className="mt-6 flex flex-wrap gap-3">
//           {highlights.map((point) => (
//             <li
//               key={point}
//               className="rounded-full border border-slate-300 bg-slate-100 px-6 py-3 text-base font-semibold text-slate-800"
//             >
//               {point}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// }
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

const tutorPreviews = [
  {
    slug: "jeroen",
    name: "Jeroen Berkhout",
    subjectTag: "Science & Maths · A Level & GCSE",
    photo: "/tutors/jeroen.jpg",
    reviewCount: 3,
  },
  {
    slug: "tom",
    name: "Tom Iddon",
    subjectTag: "Chemistry, Physics & CS · A Level & GCSE",
    photo: "/tutors/tom.jpg",
    reviewCount: 0,
  },
];

const features = [
  {
    title: "Personalized academic support",
    description:
      "Tailored tutoring to meet each student's unique needs and goals. Tutors with real experience in adjusting teaching approaches to help students excel.",
    bg: "bg-amber-100",
  },
  {
    title: "Online-first flexible delivery",
    description:
      "Convenient online lessons that fit your schedule and learning style. Refunds and adjustments available for any issues.",
    bg: "bg-indigo-100",
  },
  {
    title: "Experienced university tutors",
    description:
      "Qualified DBS-checked tutors with at least three years of university study in STEM subjects, and hundreds of lessons delivered.",
    bg: "bg-violet-100",
  },
];

const highlights = [
  "Engaging, structured lessons",
  "Always prepared in advance",
  "Goes beyond the syllabus",
  "Students look forward to every lesson",
  "Wholeheartedly recommended",
  "Excellent rapport with students",
  "Maths was made clear",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Tutor preview */}
      <section className="section">
        <div className="rounded-3xl border border-slate-200 bg-purple-100 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-navy">Meet our tutors</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tom and Jeroen — experienced, DBS-checked, and ready to help.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tutorPreviews.map((tutor) => (
              <div
                key={tutor.slug}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-purple-200">
                  <Image
                    src={tutor.photo}
                    alt={`Photo of ${tutor.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{tutor.name}</p>
                  <p className="text-xs text-slate-500">{tutor.subjectTag}</p>
                  {tutor.reviewCount > 0 && (
                    <p className="mt-0.5 text-xs text-amber-600 font-medium">
                      ★ {tutor.reviewCount} {tutor.reviewCount === 1 ? "review" : "reviews"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Meet our tutors
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-white stroke-2">
                <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className={`rounded-3xl border border-slate-200 p-10 ${item.bg}`}
            >
              <h2 className="text-2xl font-semibold text-navy">{item.title}</h2>
              <p className="mt-4 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
          Reviews from students & parents say
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {highlights.map((point) => (
            <li
              key={point}
              className="rounded-full border border-slate-300 bg-slate-100 px-6 py-3 text-base font-semibold text-slate-800"
            >
              {point}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}