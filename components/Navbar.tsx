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
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">
            <Image
              src="/logo.png"
              alt="TutorsWithChemistry logo"
              fill
              className="object-cover"
            />
          </span>
          <span className="text-xl font-semibold tracking-/home/jeroen/Downloads/logo.pngtight text-navy">
            TutorsWithChemistry
          </span>
        </Link>

        <div className="flex items-center gap-8 text-sm text-slate-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-teal">
              {label}
            </Link>
          ))}
          <Link href="/book-meeting" className="text-teal font-medium">
            Book Free Meeting
          </Link>
        </div>
      </nav>
    </header>
  );
}
