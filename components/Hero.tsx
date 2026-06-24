"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  {
    title: "Personalised 1-to-1 STEM Tutoring",
    bg: "bg-blue-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-navy" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Flexible Online Lessons",
    bg: "bg-violet-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-navy" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Range of Subjects and Tutors",
    bg: "bg-red-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-navy" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6.5c0-.828 3.582-1.5 8-1.5s8 .672 8 1.5v11c0-.828-3.582-1.5-8-1.5s-8 .672-8 1.5v-11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 5v13" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "University-Level Admission Support",
    bg: "bg-amber-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-navy" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 11v5c0 1.5 2.686 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="section grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="uppercase tracking-[0.25em] text-sm text-teal mb-6">
          Cambridge & Bristol Based
        </p>
        <h1 className="text-5xl md:text-7xl leading-tight font-semibold tracking-tight text-navy">
          University-level tutors giving expert guidance and structured support.
        </h1>
        <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">
          Structured online tuition across a range of subjects, with focuses on STEM support. Tailored support for students of all levels. DBS checked and experienced, with a track record of success in top university admissions. Book a free meeting to discuss your needs and goals.
        </p>
        <div className="mt-10 flex gap-6">
          <Link href="/subjects" className="rounded-full bg-navy text-white px-7 py-4 transition hover:opacity-90">
            Explore Subjects
          </Link>
          <Link href="/book-meeting" className="rounded-full border border-slate-300 px-7 py-4 hover:border-teal bg-green-200 transition hover:bg-green-100">
            Book Free Meeting
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            {items.map(({ title, bg, icon }) => (
              <div
                key={title}
                className={`rounded-2xl p-8 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-center gap-4 ${bg}`}
              >
                {icon}
                <h3 className="text-lg font-medium text-navy text-center">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";

// const items = [
//   {
//     title: "Personalised 1-to-1 STEM Tutoring",
//     bg: "bg-blue-100",
//     icon: "👤",
//   },
//   {
//     title: "Flexible Online Lessons",
//     bg: "bg-violet-200",
//     icon: "💻",
//   },
//   {
//     title: "Range of Subjects",
//     bg: "bg-red-100",
//     icon: "📘",
//   },
//   {
//     title: "University Admission Support",
//     bg: "bg-amber-100",
//     icon: "🎓",
//   },
// ];

// export default function Hero() {
//   return (
//     <section className="section grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <p className="uppercase tracking-widest text-xs md:text-sm text-teal-600 mb-4">
//           Cambridge & Bristol Based
//         </p>

//         <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-navy">
//           University-level STEM tutors providing structured academic support.
//         </h1>

//         <p className="mt-5 md:mt-7 text-sm md:text-lg text-slate-600 leading-6 md:leading-8 max-w-xl">
//           Structured online tuition tailored to individual learning needs,
//           focused on clarity, exam performance, and confidence building.
//         </p>

//         <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-5">
//           <Link
//             href="/subjects"
//             className="rounded-full bg-navy text-white px-5 py-3 md:px-7 md:py-4 text-sm md:text-base text-center"
//           >
//             Explore Subjects
//           </Link>

//           <Link
//             href="/book-meeting"
//             className="rounded-full border border-slate-300 px-5 py-3 md:px-7 md:py-4 text-sm md:text-base text-center bg-green-100 hover:bg-green-200"
//           >
//             Book Free Meeting
//           </Link>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm">
//           <div className="grid grid-cols-2 gap-3 md:gap-6">
//             {items.map((item) => (
//               <div
//                 key={item.title}
//                 className={`rounded-xl p-4 md:p-6 border border-slate-200 flex flex-col items-center gap-2 md:gap-3 ${item.bg}`}
//               >
//                 <div className="text-xl md:text-2xl">{item.icon}</div>
//                 <h3 className="text-xs md:text-base font-medium text-navy text-center">
//                   {item.title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }