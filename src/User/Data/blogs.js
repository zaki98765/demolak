/*
  BLOG POSTS — homepage "Knowledge hub"
  Add / edit posts here. The first post is shown as the featured card.
  `cover` (optional) = image path; without it the card uses a branded cover.
  Current covers: free Unsplash photos (unsplash.com/license), saved in /public/images/blogs/.
  `path` should match the article route once blog pages exist.
*/
export const blogs = [
  {
    slug: "career-after-commerce",
    cover: "/images/blogs/career-after-commerce.webp",
    category: "Career guidance",
    title: "Career opportunities after studying commerce",
    excerpt:
      "From accounting and finance to taxation and corporate law — a clear look at the professional paths open to commerce students and how to choose yours.",
    coverLabel: "Careers",
    path: "/blogs/career-after-commerce",
  },
  {
    slug: "ca-vs-acca",
    cover: "/images/blogs/ca-vs-acca.webp",
    category: "Professional courses",
    title: "CA vs ACCA: understanding your career options",
    excerpt:
      "How the two qualifications differ in scope, structure and career direction, so you can pick the one that fits your goals.",
    coverLabel: "CA · ACCA",
    path: "/blogs/ca-vs-acca",
  },
  {
    slug: "what-is-cma-usa",
    cover: "/images/blogs/what-is-cma-usa.webp",
    category: "Course guide",
    title: "What is CMA USA and who should pursue it?",
    excerpt:
      "An introduction to the US CMA qualification — what it covers, who it suits and how it can support a global finance career.",
    coverLabel: "CMA USA",
    path: "/blogs/what-is-cma-usa",
  },
  {
    slug: "plan-your-preparation",
    cover: "/images/blogs/plan-your-preparation.webp",
    category: "Student guide",
    title: "How to plan your exam preparation effectively",
    excerpt:
      "Practical tips on building a study routine, using mock tests and staying consistent through a professional course.",
    coverLabel: "Study tips",
    path: "/blogs/plan-your-preparation",
  },
];

export const BLOGS_PATH = "/blogs";
