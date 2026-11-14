import { useEffect, useState } from "react";
import { sampleReviewSummary, sampleReviews } from "../Data/reviews";

const ENDPOINT = import.meta.env.VITE_GOOGLE_REVIEWS_ENDPOINT || "/api/google-reviews";

// Starts with the reviews in Data/reviews.js so they always show (local and deployed),
// then swaps in live data if the API responds.
const initialState = { summary: sampleReviewSummary, reviews: sampleReviews };

/**
 * Loads Google reviews from the backend.
 * Returns { summary, reviews } — summary may be null and reviews empty
 * until real data is available.
 */
export function useGoogleReviews() {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const controller = new AbortController();

    fetch(ENDPOINT, { signal: controller.signal, headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((json) => {
        if (Array.isArray(json?.reviews) && json.reviews.length > 0) {
          setData({ summary: json.summary ?? null, reviews: json.reviews });
        }
      })
      .catch(() => {
        // No API yet or request failed: keep the current state.
      });

    return () => controller.abort();
  }, []);

  return data;
}
