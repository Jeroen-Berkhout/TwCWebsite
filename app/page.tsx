import Hero from "@/components/Hero";

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

      <section className="section">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">Reviews from students & parents say</p>
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
// import Hero from "@/components/Hero";

// const features = [
//   {
//     title: "Personalized academic support",
//     description:
//       "Tailored tutoring to meet each student's unique needs and goals. Tutors with real experience in adapting teaching approaches.",
//     bg: "bg-amber-100",
//   },
//   {
//     title: "Online-first flexible delivery",
//     description:
//       "Convenient online lessons that fit your schedule and learning style.",
//     bg: "bg-indigo-100",
//   },
//   {
//     title: "Experienced university tutors",
//     description:
//       "Qualified STEM tutors with extensive teaching experience and strong academic backgrounds.",
//     bg: "bg-violet-100",
//   },
// ];

// const highlights = [
//   "Engaging structured lessons",
//   "Prepared in advance",
//   "Beyond syllabus depth",
//   "Clear explanations",
//   "Strong student rapport",
//   "Confidence building",
// ];

// export default function HomePage() {
//   return (
//     <>
//       <Hero />

//       <section className="section">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
//           {features.map((item) => (
//             <div
//               key={item.title}
//               className={`rounded-2xl border border-slate-200 p-5 md:p-8 ${item.bg}`}
//             >
//               <h2 className="text-lg md:text-2xl font-semibold text-navy">
//                 {item.title}
//               </h2>
//               <p className="mt-3 text-sm md:text-base text-slate-600 leading-6 md:leading-7">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="section">
//         <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-slate-400">
//           Student & parent feedback
//         </p>

//         <ul className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
//           {highlights.map((point) => (
//             <li
//               key={point}
//               className="rounded-full border border-slate-300 bg-slate-100 px-3 md:px-5 py-2 text-xs md:text-sm font-medium text-slate-700"
//             >
//               {point}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// }