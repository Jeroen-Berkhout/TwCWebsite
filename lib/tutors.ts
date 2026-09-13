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
      { initials: "JG", name: "Josefina", role: "Student", date: "18 Jun", rating: 5, avatarColor: "bg-orange-400", text: "I did my chemistry A level 2025-2026 and Jeroen tutored me during this period. Each lesson was an hour long and we covered past paper questions in each one in order to learn the markscheme and gain and understanding of how to approach questions. Jeroen really helped with maths in particular, explaining what, how and why to do these questions in the suggested manner. As someone who isn't particularly good at maths, this was very useful. The questions were prepared beforehand, even when Jeroen was busy, which is commendable. I looked forward to every lesson because each lesson was genuinely interesting to me. Jeroen has extended my knowledge of chemistry in general, beyond the syllabus of A level chemistry, giving insight into organic structures and compounds. Now I'm waiting for my A level results and I'm confident that I will earn an A in chemistry thanks to Jeroen :)" },
      { initials: "AG", name: "Alexandr", role: "Parent from Castelldefels", date: "18 Jun", rating: 5, avatarColor: "bg-blue-400", text: "My daughter did tutoring with Jeroen during Y13 for A level edexcel chemistry. She found lessons with Jeroen engaging, structured and helpful for her A level preparation. Maths in chemisty, topic 5 for her A level, was particularly well covered. Each lesson was an hour long and questions were prepared beforehand by Jeroen based on suggestions from my daughter. This collaborative approach helped my daughter direct her learning and fill the gaps in her knowledge and skills. Over the course of the year, my daughter found the tutor-student relationship to be one of the most important aspects to having effective tutoring sessions. The developed rapport between her and Jeroen made lessons fun and comfortable which she found to be important. When she needed to reschedule, she did so without issue and they found an alternative time for their lesson. Ultimately, both her and I are very lucky to have had the opportunity to work with Jeroen and we wholeheartedly recommend him to other parents and their students doing chemistry A level." },
      { initials: "SS", name: "Sagi", role: "Parent from London", date: "24 Jun", rating: 5, avatarColor: "bg-emerald-400", text: "Jeroen has been an excellent Math tutor for my son (Year 9). Reliable and consistent, super friendly, and a great listener. He's always well prepared, keeps each session focused, and explains complex concepts in a way that genuinely clicks. He keeps my son engaged the whole way through - highly recommended." },
      { initials: "ER", name: "Elena", role: "Parent from Dubai", date: "7 September", rating: 5, avatarColor: "bg-rose-400", text: "We have been very pleased with Jeroen as the tutor for Nikolas's online chemistry lessons. As a Year 12 student, he is working with challenging material, and Jeroen has a real talent for making the subject interesting, engaging, and compelling. The lessons are thoughtfully structured, enjoyable, and interactive, which keeps Nikolas motivated and involved throughout. Most importantly, the continuity and consistency of the sessions have helped him strengthen and consolidate his understanding of the subject, while also building his confidence. We have seen a clear improvement in his grasp of chemistry and would highly recommend this teacher to any student looking for engaging, well-organised, and effective tuition. Nikolas will continue the tutoring with Jeroen in Year 13." },
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
      { initials: "AT", name: "Andy", role: "Student", date: "27 Jul", rating: 5, avatarColor: "bg-blue-400", text: "Tom was an engaging and entertaining tutor and helped me through my first year of A levels. He was especially helpful in physics and explained what the markschemes were looking for and how to get maximum marks in an exam setting. Tom was able to provide guidance and advice for programming without giving exact answers and showed multiple examples of his own projects as inspiration for my computerscience NEA." },
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