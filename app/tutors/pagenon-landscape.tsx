"use client";

import { useState } from "react";
import Image from "next/image";

type Review = {
  initials: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  text: string;
  avatarColor: string;
};

type Tutor = {
  slug: string;
  name: string;
  subjectTag: string;
  photo: string;
  styleDescription: string;
  reviews: Review[];
};

const tutors: Tutor[] = [
  {
    slug: "jeroen",
    name: "Jeroen",
    subjectTag: "Chemistry · A Level & GCSE",
    photo: "/tutors/jeroen.jpg",
    styleDescription:
      "Jeroen builds every lesson around past paper questions, walking through the mark scheme so students understand not just the answer but why it's marked that way. He prepares questions in advance based on each student's gaps, and likes to push beyond the syllabus into the underlying chemistry so the subject clicks rather than feeling memorised.",
    reviews: [
      {
        initials: "JG",
        name: "Josefina",
        role: "Student",
        date: "18 Jun",
        rating: 5,
        avatarColor: "bg-orange-400",
        text: "I did my chemistry A level 2025-2026 and Jeroen tutored me during this period. Each lesson was an hour long and we covered past paper questions in each one in order to learn the markscheme and gain and understanding of how to approach questions. Jeroen really helped with maths in particular, explaining what, how and why to do these questions in the suggested manner. As someone who isn't particularly good at maths, this was very useful. The questions were prepared beforehand, even when Jeroen was busy, which is commendable. I looked forward to every lesson because each lesson was genuinely interesting to me. Jeroen has extended my knowledge of chemistry in general, beyond the syllabus of A level chemistry, giving insight into organic structures and compounds. Now I'm waiting for my A level results and I'm confident that I will earn an A in chemistry thanks to Jeroen :)",
      },
      {
        initials: "AG",
        name: "Alexandr",
        role: "Parent from Castelldefels",
        date: "18 Jun",
        rating: 5,
        avatarColor: "bg-blue-400",
        text: "My daughter did tutoring with Jeroen during Y13 for A level edexcel chemistry. She found lessons with Jeroen engaging, structured and helpful for her A level preparation. Maths in chemisty, topic 5 for her A level, was particularly well covered. Each lesson was an hour long and questions were prepared beforehand by Jeroen based on suggestions from my daughter. This collaborative approach helped my daughter direct her learning and fill the gaps in her knowledge and skills. Over the course of the year, my daughter found the tutor-student relationship to be one of the most important aspects to having effective tutoring sessions. The developed rapport between her and Jeroen made lessons fun and comfortable which she found to be important. When she needed to reschedule, she did so without issue and they found an alternative time for their lesson. Ultimately, both her and I are very lucky to have had the opportunity to work with Jeroen and we wholeheartedly recommend him to other parents and their students doing chemistry A level.",
      },
    ],
  },
  {
    slug: "placeholder-2",
    name: "Tutor name",
    subjectTag: "Subject · Level",
    photo: "/tutors/placeholder.jpg",
    styleDescription:
      "A short, warm description of this tutor's teaching style goes here — what makes their lessons distinctive, how they structure sessions, and what students can expect.",
    reviews: [],
  },
  {
    slug: "placeholder-3",
    name: "Tutor name",
    subjectTag: "Subject · Level",
    photo: "/tutors/placeholder.jpg",
    styleDescription:
      "A short, warm description of this tutor's teaching style goes here — what makes their lessons distinctive, how they structure sessions, and what students can expect.",
    reviews: [],
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "fill-amber-400" : "fill-slate-200"}`}
        >
          <path d="M10 1.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1L10 15.5l-5.4 2.9 1-6.1L1.2 8l6.1-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex gap-4 py-5 border-t border-slate-200 first:border-t-0">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${review.avatarColor}`}
      >
        {review.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-navy">{review.name}</span>
            <span className="text-sm text-slate-500">{review.role}</span>
          </div>
          <span className="text-xs text-slate-400">{review.date}</span>
        </div>
        <div className="mt-1">
          <StarRow rating={review.rating} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
      </div>
    </div>
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  const [open, setOpen] = useState(false);
  const reviewCount = tutor.reviews.length;
  const avgRating =
    reviewCount > 0
      ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
      <div className="p-8">
        <div className="flex items-start gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={tutor.photo}
              alt={`Photo of ${tutor.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-navy">{tutor.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              {tutor.subjectTag}
            </p>
            {reviewCount > 0 && (
              <div className="mt-2 flex items-center gap-1.5">
                <StarRow rating={Math.round(avgRating)} />
                <span className="text-xs text-slate-500">
                  {avgRating.toFixed(1)} ({reviewCount}{" "}
                  {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          {tutor.styleDescription}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        disabled={reviewCount === 0}
        className="flex w-full items-center justify-between border-t border-slate-200 px-8 py-4 text-left text-sm font-semibold text-navy transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
      >
        <span>
          {reviewCount > 0
            ? `${open ? "Hide" : "Show"} reviews (${reviewCount})`
            : "No reviews yet"}
        </span>
        {reviewCount > 0 && (
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 fill-none stroke-navy stroke-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open && reviewCount > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 px-8">
          {tutor.reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TutorsPage() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
          Meet our tutors
        </h1>
        <p className="mt-3 text-slate-600">
          Experienced, DBS-checked university tutors, each with their own way
          of helping students get there.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.slug} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
