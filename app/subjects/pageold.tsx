export default function SubjectsPage() {
  return (
    <section className="section">
      <h1 className="text-5xl font-semibold tracking-tight text-navy">Subjects</h1>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {["Mathematics", "Chemistry", "Computer Science",  "Biology", "Physics","+ A variety of subjects and university-level admission support"].map((subject) => (
          <div
            key={subject}
            className={`
              rounded-3xl
              border
              border-slate-200
              p-10
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md

              ${subject === "Mathematics" ? "bg-blue-100" : ""}
              ${subject === "Chemistry" ? "bg-red-100" : ""}
              ${subject === "Computer Science" ? "bg-violet-100" : ""}
              ${subject === "Biology" ? "bg-emerald-100" : ""}
              ${subject === "Physics" ? "bg-cyan-100" : ""}
              ${
                subject ===
                "+ A variety of subjects and university-level admission support"
                  ? "bg-amber-100"
                  : ""
              }
            `}
          >
            <h2 className="text-2xl font-medium text-navy">{subject}</h2>
            <p className="mt-4 text-slate-600">
              {subject === "Mathematics" && "Comprehensive support across all levels of mathematics, from GCSE to university-level courses. Teaching the fundemental skills to succeed in mathematics, focusing on more than just problem-solving techniques and exam preparation."}
              {subject === "Physics" && "In-depth guidance in physics concepts and problem-solving techniques. Support for A-levels, IB, and university-level courses. Experience in helping students understand complex topics and excel in exams."}
              {subject === "Chemistry" && "Detailed explanations and practical applications in chemistry. Expert support in organic, inorganic, and physical chemistry, with exam preparation for University to GCSE level. Relevant MSci degree experience guaranteed."}
              {subject === "Biology" && "Comprehensive coverage of biological concepts and processes. Giving understanding of complex topics and exam preparation for A-levels and GCSEs. Help with university application processes or UCAT preparation."}
              {subject === "Computer Science" && "Hands-on experience with programming languages and algorithms. University level experience guaranteed. Help provided for all levels, from GCSE to university courses. Includes support for extracurricular projects."}
              {subject === "+ A variety of subjects and university-level admission support" && "Personalized assistance for university applications and entrance exams. All courses provide structured support to help students achieve their academic goals."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
