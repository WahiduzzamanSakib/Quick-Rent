"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = authClient.useSession();
  const reviewerEmail = session?.user?.email;
  const reviewerName = session?.user?.name;
  const reviewerImage = session?.user?.image;
  const reviewerRole = session?.user?.role;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating first");
      return;
    }
    if (!review.trim()) {
      toast.error("Please write your review feedback");
      return;
    }

    try {
      setSubmitting(true);
      const { data: token } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/single-properties/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token?.token}`,
          },
          body: JSON.stringify({
            reviewerName,
            reviewerEmail,
            reviewerImage,
            reviewerRole,
            rating,
            review: review.trim(),
          }),
        }
      );

      const data = await res.json();
      toast.success("Review submitted successfully!");
      setReview("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FaStar className="text-amber-400" />
          <span>Write a Property Review</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Help fellow tenants by sharing your thoughts about this stay
        </p>
      </div>

      {/* Star Selector */}
      <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 w-fit">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-1 cursor-pointer transition-transform hover:scale-110"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${star} star`}
          >
            <FaStar
              size={20}
              className={
                star <= (hover || rating)
                  ? "text-amber-400"
                  : "text-slate-300"
              }
            />
          </button>
        ))}
        <span className="text-xs font-bold text-slate-700 ml-2">
          {rating > 0 ? `${rating} of 5 Stars` : "Rate your stay"}
        </span>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="What did you like about this property? Mention amenities, noise level, host responsiveness..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <FiSend />
        <span>{submitting ? "Submitting..." : "Submit Review"}</span>
      </button>
    </div>
  );
};

export default ReviewSection;
