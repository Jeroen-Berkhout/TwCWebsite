"use client";

import { useState } from "react";
import Image from "next/image";
import { tutors, getTutorStats, type Review, type Tutor } from "@/lib/tutors";
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
  const { reviewCount, avgRating } = getTutorStats(tutor);
  return (
    <div className="rounded-3xl border border-slate-200 bg-purple-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-purple-200 sm:h-auto sm:w-64">
          <Image
            src={tutor.photo}
            alt={`Photo of ${tutor.name}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-8">
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

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {tutor.styleDescription}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        disabled={reviewCount === 0}
        className="flex w-full items-center justify-between border-t border-slate-200 px-8 py-4 text-left text-sm font-semibold text-navy transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
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
        <div className="border-t border-slate-200 bg-purple-100/60 px-8">
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

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-8">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.slug} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
