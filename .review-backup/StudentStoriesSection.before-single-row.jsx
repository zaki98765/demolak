import { FiArrowUpRight, FiEdit3, FiStar } from "react-icons/fi";
import Reveal from "./shared/Reveal";
import {
  REVIEWS_ARE_DEMO,
  googleReviewSummary,
  googleReviews,
} from "../Data/reviews";

/*
  STUDENT STORIES — GOOGLE REVIEWS
  Left: rating summary box. Right: review cards glide in from the right
  and slip behind the box. Google's palette is used only as small accents
  (four-colour rule, star yellow, avatar tints); the rest stays on-brand.
*/

const GOOGLE = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};
const avatarColours = [GOOGLE.blue, GOOGLE.red, GOOGLE.green, GOOGLE.yellow];

const rows = [
  { items: googleReviews.slice(0, Math.ceil(googleReviews.length / 2)), duration: "46s" },
  { items: googleReviews.slice(Math.ceil(googleReviews.length / 2)), duration: "54s" },
];

const initialsOf = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function GoogleRule({ className = "" }) {
  return (
    <div aria-hidden="true" className={`flex h-1 overflow-hidden rounded-full ${className}`}>
      {Object.values(GOOGLE).map((colour) => (
        <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
      ))}
    </div>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={size}
          aria-hidden="true"
          style={{ color: star <= Math.round(rating) ? GOOGLE.yellow : "#D6DEEA" }}
          className="fill-current"
        />
      ))}
    </div>
  );
}

function SummaryBox() {
  const { rating, total, url, breakdown } = googleReviewSummary;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#E2EAF5] bg-white p-6 shadow-[0_24px_60px_rgba(16,41,75,0.10)] sm:p-7">
      <GoogleRule className="absolute inset-x-0 top-0 rounded-none" />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#10294B]">Google Reviews</p>
        {REVIEWS_ARE_DEMO && (
          <span className="rounded-full border border-dashed border-[#FBBC05] bg-[#FFF8E1] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8A6100]">
            Demo reviews
          </span>
        )}
      </div>

      <div className="mt-5 flex items-end gap-4">
        <p className="text-6xl font-black leading-none tracking-tight text-[#10294B]">
          {rating.toFixed(1)}
        </p>
        <div className="pb-1">
          <Stars rating={rating} size={18} />
          <p className="mt-1.5 text-xs font-medium text-[#52617D]">
            Based on {total.toLocaleString("en-IN")}+ reviews
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2" aria-label="Rating breakdown">
        {[5, 4, 3, 2, 1].map((star) => (
          <li key={star} className="flex items-center gap-3 text-xs font-semibold text-[#52617D]">
            <span className="w-3 text-right">{star}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#EEF2F8]">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF]"
                style={{ width: `${breakdown[star] ?? 0}%` }}
              />
            </span>
            <span className="w-8 text-right tabular-nums">{breakdown[star] ?? 0}%</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10294B] to-[#1762B5] text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
        >
          <FiEdit3 size={15} /> Write a review
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#DCE7F5] bg-white text-sm font-bold text-[#1762B5] transition-colors duration-300 hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
        >
          See all <FiArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}

function ReviewCard({ review, index }) {
  const colour = avatarColours[index % avatarColours.length];

  return (
    <li className="flex w-[290px] shrink-0 flex-col rounded-[22px] border border-[#E2EAF5] bg-white p-5 shadow-[0_8px_26px_rgba(16,41,75,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#9CCBF5] hover:shadow-[0_18px_40px_rgba(23,98,181,0.12)] sm:w-[330px] sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: colour }}
          aria-hidden="true"
        >
          {initialsOf(review.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#10294B]">{review.name}</p>
          <p className="truncate text-xs text-[#52617D]">{review.course} student</p>
        </div>
        <span className="shrink-0 text-[11px] text-[#8A97AD]">{review.timeAgo}</span>
      </div>

      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#26345C]">{review.text}</p>

      <p className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-semibold text-[#8A97AD]">
        <span className="flex gap-0.5" aria-hidden="true">
          {Object.values(GOOGLE).map((c) => (
            <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </span>
        Posted on Google
      </p>
    </li>
  );
}

// STUDENT STORIES
export default function StudentStoriesSection() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-[#F7F8FC] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#70C7FF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1762B5]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1762B5] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1762B5]" />
              Student stories
            </span>
            <h2
              id="reviews-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-[#10294B] sm:text-4xl lg:text-5xl"
            >
              Hear it from
              <span className="text-[#1762B5]"> our students</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#52617D] sm:text-base">
              Real experiences shared by Catalyst students on Google.
            </p>
          </div>
        </Reveal>

        {/* Summary box + review stream */}
        <Reveal>
          <div className="relative mt-12 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
            {/* Summary box — sits above the stream; cards slide in under its right edge */}
            <div className="relative z-20">
              <SummaryBox />
            </div>

            <div className="relative z-10 mt-8 space-y-4 lg:-ml-12 lg:mt-0">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="review-marquee py-3">
                  <div className="review-track flex" style={{ "--duration": row.duration }}>
                    {[0, 1].map((copy) => (
                      <ul
                        key={copy}
                        aria-hidden={copy === 1 ? true : undefined}
                        className="flex shrink-0 gap-5 pr-5"
                      >
                        {/* Each half holds the row twice so it is always wider than the screen */}
                        {[...row.items, ...row.items].map((review, index) => (
                          <ReviewCard
                            key={`${copy}-${index}-${review.id}`}
                            review={review}
                            index={(index % row.items.length) + rowIndex * 2}
                          />
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
