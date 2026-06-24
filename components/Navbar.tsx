// import Link from "next/link";
// import Image from "next/image";

// const links = [
//   ["Home", "/"],
//   ["Subjects", "/subjects"],
//   ["Tutors", "/tutors"],
//   ["About", "/about"],
//   ["Pricing", "/pricing"],
// ];

// export default function Navbar() {
//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
//       <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
//         <Link href="/" className="flex items-center gap-3">
//           <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
//             <Image
//               src="/logo.png"
//               alt="TutorsWithChemistry logo"
//               fill
//               className="object-cover"
//             />
//           </span>
//           <span className="text-xl font-semibold tracking-/home/jeroen/Downloads/logo.pngtight text-navy">
//             TutorsWithChemistry
//           </span>
//         </Link>

//         <div className="flex items-center gap-8 text-sm text-slate-700">
//           {links.map(([label, href]) => (
//             <Link key={href} href={href} className="transition hover:text-teal">
//               {label}
//             </Link>
//           ))}
//           <Link href="/book-meeting" className="text-teal font-medium">
//             Book Free Meeting
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  ["Home", "/"],
  ["Subjects", "/subjects"],
  ["Tutors", "/tutors"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4 md:py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-8 w-8 md:h-9 md:w-9 overflow-hidden rounded-full bg-slate-200">
            <Image
              src="/logo.png"
              alt="TutorsWithChemistry logo"
              fill
              className="object-cover"
            />
          </span>

          <span className="text-base md:text-xl font-semibold tracking-tight text-navy">
            TutorsWithChemistry
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-teal transition">
              {label}
            </Link>
          ))}
          <Link href="/book-meeting" className="text-teal font-medium">
            Book Free Meeting
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-slate-800" />
          <span className="w-6 h-0.5 bg-slate-800" />
          <span className="w-6 h-0.5 bg-slate-800" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 flex flex-col gap-3 text-sm text-slate-700">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {label}
              </Link>
            ))}

            <Link
              href="/book-meeting"
              onClick={() => setOpen(false)}
              className="py-2 text-teal font-medium"
            >
              Book Free Meeting
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}