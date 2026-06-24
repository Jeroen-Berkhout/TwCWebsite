type Subject = {
  name: string;
  bg: string;
  iconColor: string;
  description: string;
};

const subjects: Subject[] = [
  {
    name: "Mathematics",
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    description:
      "Comprehensive support across all levels of mathematics, from GCSE to university-level courses. Teaching the fundemental skills to succeed in mathematics, focusing on more than just problem-solving techniques and exam preparation.",
  },
  {
    name: "Chemistry",
    bg: "bg-red-100",
    iconColor: "text-red-600",
    description:
      "Detailed explanations and practical applications in chemistry. Expert support in organic, inorganic, and physical chemistry, with exam preparation for University to GCSE level. Relevant MSci degree experience guaranteed.",
  },
  {
    name: "Computer Science",
    bg: "bg-violet-100",
    iconColor: "text-violet-600",
    description:
      "Hands-on experience with programming languages and algorithms. University level experience guaranteed. Help provided for all levels, from GCSE to university courses. Includes support for extracurricular projects.",
  },
  {
    name: "Biology",
    bg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    description:
      "Comprehensive coverage of biological concepts and processes. Giving understanding of complex topics and exam preparation for A-levels and GCSEs. Help with university application processes or UCAT preparation.",
  },
  {
    name: "Physics",
    bg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    description:
      "In-depth guidance in physics concepts and problem-solving techniques. Support for A-levels, IB, and university-level courses. Experience in helping students understand complex topics and excel in exams.",
  },
  {
    name: "+ Many other subjects and university-level admission support",
    bg: "bg-amber-100",
    iconColor: "text-amber-600",
    description:
      "Personalized assistance for university applications and entrance exams. All courses provide structured support to help students achieve their academic goals.",
  },
];

function SubjectIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Mathematics":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 7h16M7.5 7v9.5a3 3 0 0 1-2 2.8M16.5 7v10c0 1 .5 2 2 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Chemistry":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M9 3h6M10 3v6.5L5.5 17a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 9.5V3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="15.5" r="0.9" fill="currentColor" />
          <circle cx="13" cy="17.5" r="0.7" fill="currentColor" />
          <circle cx="11.5" cy="13" r="0.6" fill="currentColor" />
        </svg>
      );
    case "Computer Science":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect
            x="3"
            y="4.5"
            width="18"
            height="12"
            rx="1.6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 19h7M12 16.5V19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M8.5 8.5 6.5 10.5l2 2M15.5 8.5l2 2-2 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Biology":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M5 19c-1-6 1-11 6-13.5C16 3 20 4 20 4s1 4-1.5 9C16 18 11 20 5 19Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M5 19c2-4.5 5.5-8.5 11-12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Physics":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 19.5V6a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v13M6 19.5h12M6 19.5a1.5 1.5 0 0 1 0-3h11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function SubjectsPage() {
  return (
    <section className="section">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">Subjects</h1>
      <p className="mt-4 text-lg text-slate-600">
        GCSE, A-level and University level STEM subjects, with a previous experience with:
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className={`rounded-3xl border border-slate-200 p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${subject.bg}`}
          >
            <SubjectIcon
              name={subject.name}
              className={`h-9 w-9 ${subject.iconColor}`}
            />
            <h2 className="mt-5 text-2xl font-medium text-navy">{subject.name}</h2>
            <p className="mt-4 text-slate-600">{subject.description}</p>
          </div>
        ))}
      </div>
            <p className="mt-4 text-lg text-slate-600">
        These are the subjects we have the most experience with, but don't hesitate to get in touch if you don't see yours.
      </p>
    </section>
  );
}
