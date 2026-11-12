/*
  GOOGLE REVIEWS
  --------------
  GOOGLE_REVIEWS_URL — the institute's Google review / Maps link
  (e.g. https://g.page/r/<place-id>/review). Used by "Write a review" and "See all".

  Live reviews are loaded by useGoogleReviews() from your API
  (VITE_GOOGLE_REVIEWS_ENDPOINT, default /api/google-reviews), which should return:
    { summary: { rating, total, breakdown: { 5, 4, 3, 2, 1 } }, reviews: [ ...same shape as below ] }

  The sample data below is used ONLY in local development (npm run dev) so the
  design can be previewed. It is never rendered in a production build.
*/

export const GOOGLE_REVIEWS_URL = "#";

export const sampleReviewSummary = {
  rating: 4.9,
  total: 1200,
  breakdown: { 5: 89, 4: 8, 3: 2, 2: 1, 1: 0 },
};

export const sampleReviews = [
  {
    id: "sample-1",
    name: "Ananya R",
    course: "ACCA",
    timeAgo: "2 weeks ago",
    rating: 5,
    text: "The faculty explain every concept patiently and the regular mock tests kept my preparation on track. The mentors were always available when I needed help.",
  },
  {
    id: "sample-2",
    name: "Mohammed S",
    course: "CMA USA",
    timeAgo: "1 month ago",
    rating: 5,
    text: "Structured classes, clear study plans and very supportive mentors. The practice sessions made a real difference before my exam.",
  },
  {
    id: "sample-3",
    name: "Fathima N",
    course: "CA Foundation",
    timeAgo: "3 weeks ago",
    rating: 5,
    text: "I joined unsure about which path to take. The counselling team helped me choose the right course and the classes have been excellent.",
  },
  {
    id: "sample-4",
    name: "Arjun K",
    course: "CMA India",
    timeAgo: "2 months ago",
    rating: 4,
    text: "Good learning environment and helpful staff. The doubt-clearing sessions after class are really useful.",
  },
  {
    id: "sample-5",
    name: "Sneha P",
    course: "Enrolled Agent",
    timeAgo: "5 days ago",
    rating: 5,
    text: "Practical, exam-focused teaching with plenty of real examples. I always felt supported by the team throughout the course.",
  },
  {
    id: "sample-6",
    name: "Rahul M",
    course: "Company Secretary",
    timeAgo: "1 week ago",
    rating: 5,
    text: "Well-organised timetable, friendly faculty and great study material. Highly recommend for anyone starting a professional course.",
  },
];
