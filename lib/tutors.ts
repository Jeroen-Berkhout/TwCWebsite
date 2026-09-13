export type Review = {
  initials: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  text: string;
  avatarColor: string;
};

export type Tutor = {
  slug: string;
  name: string;
  subjectTag: string;
  photo: string;
  styleDescription: string;
  reviews: Review[];
};

export const tutors: Tutor[] = [
  {
    slug: "jeroen",
    name: "Jeroen Berkhout",
    subjectTag: "STEM tutor · A Level & GCSE · MSci Chemistry with Computing",
    photo: "/tutors/jeroen.jpg",
    styleDescription:
      "Jeroen started as an in-person tutor and now teaches STEM subjects online, with experience delivering over 100 GCSE and A-Level lessons. Drawing on years of tutoring and university experience, he adapts his teaching to each student's individual needs, learning style, and goals. He creates a calm and supportive environment where students feel comfortable asking questions, making mistakes, and building confidence. Through problem-solving, interactive discussions, and real-world examples, Jeroen helps students develop a deeper understanding of challenging concepts and achieve their academic goals.",
    reviews: [
      { initials: "JG", name: "Josefina", role: "Student", date: "18 Jun", rating: 5, avatarColor: "bg-orange-400", text: "I did my chemistry A level 2025-2026 and Jeroen tutored me during this period..." },
      { initials: "AG", name: "Alexandr", role: "Parent from Castelldefels", date: "18 Jun", rating: 5, avatarColor: "bg-blue-400", text: "My daughter did tutoring with Jeroen during Y13 for A level edexcel chemistry..." },
      { initials: "SS", name: "Sagi", role: "Parent from London", date: "24 Jun", rating: 5, avatarColor: "bg-emerald-400", text: "Jeroen has been an excellent Math tutor for my son (Year 9)..." },
      { initials: "ER", name: "Elena", role: "Parent from Dubai", date: "7 September", rating: 5, avatarColor: "bg-rose-400", text: "We have been very pleased with Jeroen as the tutor for Nikolas's online chemistry lessons..." },
    ],
  },
  {
    slug: "tom-iddon",
    name: "Tom Iddon",
    subjectTag: "STEM tutor · A-level and GCSE · MSci Chemistry with Computing",
    photo: "/tutors/tom.jpg",
    styleDescription:
      "Tom is an experienced tutor, teaching students in person across Chemistry, Physics, and Computer Science...",
    reviews: [
      { initials: "AT", name: "Andy", role: "Student", date: "27 Jul", rating: 5, avatarColor: "bg-blue-400", text: "Tom was an engaging and entertaining tutor and helped me through my first year of A levels..." },
    ],
  },
];

export function getTutorStats(tutor: Tutor) {
  const reviewCount = tutor.reviews.length;
  const avgRating =
    reviewCount > 0
      ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;
  return { reviewCount, avgRating };
}