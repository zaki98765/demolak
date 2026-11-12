import { FiArrowUpRight, FiEdit3, FiStar } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Reveal from "./shared/Reveal";
import { GOOGLE_REVIEWS_URL } from "../Data/reviews";
import { useGoogleReviews } from "../hooks/useGoogleReviews";

/*
  STUDENT STORIES — GOOGLE REVIEWS
  Left: rating summary box. Right: a single row of review cards that glide
  in from the right and slip under the box. Google colours are used only as
  small accents (four-colour rule, star yellow, avatar tints).
*/

const GOOGLE = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};
const avatarColours = [GOOGLE.blue, GOOGLE.red, GOOGLE.green, GOOGLE.yellow];

const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function GoogleRule({ className = "" }) {
  return (
    <div aria-hidden="true" className={`flex h-1 overflow-hidden ${className}`}>
      {Object.values(GOOGLE).map((colour) => (
        <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
      ))}
    </div>
  );
}

function Stars({ rating = 5, size = 14 }) {
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

function SummaryBox({ summary }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#E2EAF5] bg-white p-6 shadow-[0_24px_60px_rgba(16,41,75,0.10)] sm:p-7">
      <GoogleRule className="absolute inset-x-0 top-0" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E2EAF5] bg-white shadow-[0_6px_16px_rgba(16,41,75,0.08)]">
          <FcGoogle size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="text-base font-bold leading-tight text-[#10294B]">Google Reviews</p>
          <p className="text-xs text-[#52617D]">Catalyst Education</p>
        </div>
      </div>

      {summary ? (
        <>
          <div className="mt-5 flex items-end gap-4">
            <p className="text-6xl font-black leading-none tracking-tight text-[#10294B]">
              {Number(summary.rating).toFixed(1)}
            </p>
            <div className="pb-1">
              <Stars rating={summary.rating} size={18} />
              <p className="mt-1.5 text-xs font-medium text-[#52617D]">
                Based on {Number(summary.total).toLocaleString("en-IN")}+ reviews
              </p>
            </div>
          </div>

          {summary.breakdown && (
            <ul className="mt-6 space-y-2" aria-label="Rating breakdown">
              {[5, 4, 3, 2, 1].map((star) => {
                const share = summary.breakdown[star] ?? 0;
                return (
                  <li key={star} className="flex items-center gap-3 text-xs font-semibold text-[#52617D]">
                    <span className="w-3 text-right">{star}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#EEF2F8]">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-[#1762B5] to-[#70C7FF]"
                        style={{ width: `${share}%` }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums">{share}%</span>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <p className="mt-4 text-sm leading-7 text-[#52617D]">
          See what students say about Catalyst Education on Google, or share your own experience.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10294B] to-[#1762B5] text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
        >
          <FiEdit3 size={15} /> Write a review
        </a>
        <a
          href={GOOGLE_REVIEWS_URL}
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
    <li className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-[#E2EAF5] bg-white p-6 shadow-[0_10px_30px_rgba(16,41,75,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#9CCBF5] hover:shadow-[0_22px_45px_rgba(23,98,181,0.14)] sm:w-[370px] sm:p-7">
      {/* Large decorative quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-3 h-14 select-none overflow-hidden font-serif text-[96px] leading-[0.9] text-[#DCEBFF] transition-colors duration-300 group-hover:text-[#B9DAFB]"
      >
        &rdquo;
      </span>

      <Stars rating={review.rating} size={16} />

      <p className="relative mt-4 line-clamp-5 text-[15px] leading-7 text-[#26345C]">
        {review.text}
      </p>

      <div className="mt-auto flex items-center gap-3 border-t border-[#EEF2F8] pt-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white"
          style={{ backgroundColor: colour }}
          aria-hidden="true"
        >
          {initialsOf(review.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#10294B]">{review.name}</p>
          <p className="truncate text-xs text-[#52617D]">
            {review.course ? `${review.course} student` : "Google review"}
            {review.timeAgo ? ` · ${review.timeAgo}` : ""}
          </p>
        </div>
        <span className="flex shrink-0 gap-0.5" aria-hidden="true" title="Posted on Google">
          {Object.values(GOOGLE).map((c) => (
            <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </span>
      </div>
    </li>
  );
}

/* Shown until live reviews are connected — a full-width call to action */
function GoogleBanner() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E2EAF5] bg-white p-6 shadow-[0_24px_60px_rgba(16,41,75,0.08)] sm:p-8 lg:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#EAF3FF] blur-3xl" />
      <GoogleRule className="absolute inset-x-0 top-0 z-10" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4 sm:items-center sm:gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E2EAF5] bg-white shadow-[0_8px_20px_rgba(16,41,75,0.08)] sm:h-16 sm:w-16">
            <FcGoogle size={32} aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-[#10294B] sm:text-xl">Read our reviews on Google</p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-[#52617D]">
              See what Catalyst students and parents say about us, or share your own experience.
            </p>
            <div className="mt-3 flex items-center gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} size={16} style={{ color: GOOGLE.yellow }} className="fill-current" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:flex">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10294B] to-[#1762B5] px-5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5] focus-visible:ring-offset-2"
          >
            <FiEdit3 size={15} /> Write a review
          </a>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-[#DCE7F5] bg-white px-5 text-sm font-bold text-[#1762B5] transition-colors duration-300 hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1762B5]"
          >
            See all reviews <FiArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

// STUDENT STORIES
export default function StudentStoriesSection() {
  const { summary, reviews } = useGoogleReviews();
  const hasReviews = reviews.length > 0;

  // Repeat short lists so each half of the loop is wider than the screen
  const loopItems = hasReviews
    ? Array.from({ length: Math.max(2, Math.ceil(8 / reviews.length)) }, () => reviews).flat()
    : [];

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-[#F7F8FC] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#70C7FF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
              Experiences shared by Catalyst students on Google.
            </p>
          </div>
        </Reveal>

        <Reveal>
          {hasReviews ? (
            <div className="relative mt-12 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
              <div className="relative z-20">
                <SummaryBox summary={summary} />
              </div>

              {/* Single row — cards slide in from the right and slip under the box */}
              <div className="review-marquee relative z-10 mt-8 py-4 lg:-ml-12 lg:mt-0">
                <div className="review-track flex" style={{ "--duration": "60s" }}>
                  {[0, 1].map((copy) => (
                    <ul
                      key={copy}
                      aria-hidden={copy === 1 ? true : undefined}
                      className="flex shrink-0 gap-6 pr-6"
                    >
                      {loopItems.map((review, index) => (
                        <ReviewCard
                          key={`${copy}-${index}-${review.id ?? index}`}
                          review={review}
                          index={index}
                        />
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <GoogleBanner />
          )}
        </Reveal>
      </div>
    </section>
  );
}
