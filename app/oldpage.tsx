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
    </>
  );
}