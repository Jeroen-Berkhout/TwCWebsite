export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-lg font-semibold text-navy">TutorsWithChemistry</h3>
          <p className="mt-3 text-slate-600 max-w-sm">
            Premium online tutoring with university-level expertise and structured academic support.
          </p>
          <p className="mt-3 text-slate-600 max-w-sm">UK Cambridge and Bristol based</p>

        </div>

        <div className="text-slate-600 space-y-2">
          <p className="text-lg font-semibold text-navy">tutorswithchemistry@gmail.com</p>
          <p>Email for a brief informal chat! </p>
        </div>
      </div>
    </footer>
  );
}