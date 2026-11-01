"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  FiMessageSquare,
  FiTrendingUp,
  FiTrash2,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ITEMS_PER_PAGE = 10;

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/dashboard/single-properties/all-reviews`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews.");
      }

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError("Unable to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Statistics
  const totalReviews = reviews.length;
  const positiveReviews = reviews.filter((review) => Number(review.rating) >= 4).length;
  const positivePercentage =
    totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 0;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  // Pagination
  const totalPages = Math.ceil(totalReviews / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const startItem = totalReviews > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + ITEMS_PER_PAGE, totalReviews);

  const handleDeleteReview = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this community review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      const response = await fetch(
        `${API_URL}/dashboard/single-properties/review/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review.");
      }

      const updatedReviews = reviews.filter((review) => review._id !== id);
      setReviews(updatedReviews);

      const updatedTotalPages = Math.ceil(updatedReviews.length / ITEMS_PER_PAGE);
      if (currentPage > updatedTotalPages) {
        setCurrentPage(Math.max(1, updatedTotalPages));
      }
    } catch (err) {
      console.error(err);
      window.alert("Could not delete review. Please check your backend DELETE API.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "N/A";
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Community Feedback
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Reviews & Feedback Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor guest ratings, read community feedback, and moderate reviews.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reviews</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">{loading ? "..." : totalReviews}</h2>
            <span className="text-[11px] font-medium text-blue-600">Submitted by guests</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FiMessageSquare size={20} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Positive Sentiment</p>
            <h2 className="text-3xl font-black text-emerald-600 mt-1.5">{loading ? "..." : `${positivePercentage}%`}</h2>
            <span className="text-[11px] font-medium text-emerald-600">Rated 4 stars or higher</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FiTrendingUp size={20} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Score</p>
            <h2 className="text-3xl font-black text-amber-500 mt-1.5">{loading ? "..." : `${averageRating} / 5`}</h2>
            <span className="text-[11px] font-medium text-amber-600">Platform satisfaction</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <FaStar size={20} />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <div className="loader"></div>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Loading Reviews...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center max-w-md mx-auto">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
          <button
            onClick={fetchReviews}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Reviews Table */}
      {!loading && !error && (
        <>
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
            {totalReviews > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Reviewer</th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Rating</th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Feedback</th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Date</th>
                      <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedReviews.map((review) => (
                      <tr key={review._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                review.reviewerImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  review.reviewerName || "User"
                                )}&background=2563eb&color=fff&bold=true`
                              }
                              alt={review.reviewerName || "Reviewer"}
                              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {review.reviewerName || "Anonymous"}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                                {review.reviewerEmail || "No email"}
                              </p>
                              <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {review.reviewerRole || "Tenant"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                size={12}
                                className={
                                  star <= Number(review.rating)
                                    ? "text-amber-400"
                                    : "text-slate-200"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-700 mt-1 block">
                            {review.rating} / 5
                          </span>
                        </td>

                        <td className="p-4 max-w-sm">
                          <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">
                            {review.review || "No feedback text"}
                          </p>
                        </td>

                        <td className="p-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                          {formatDate(review.createdAt)}
                        </td>

                        <td className="p-4 text-center">
                          <button
                            type="button"
                            disabled={deletingId === review._id}
                            onClick={() => handleDeleteReview(review._id)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition disabled:opacity-50 cursor-pointer"
                          >
                            <FiTrash2 size={13} />
                            <span>{deletingId === review._id ? "Deleting..." : "Delete"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-16 text-center">
                <FaStar className="mx-auto mb-3 text-3xl text-amber-400" />
                <h3 className="text-base font-bold text-slate-900">No Reviews Found</h3>
                <p className="text-xs text-slate-500 mt-1">Community reviews will appear here when submitted.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalReviews > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
              <p>
                Showing <span className="font-bold text-slate-900">{startItem}</span> to{" "}
                <span className="font-bold text-slate-900">{endItem}</span> of{" "}
                <span className="font-bold text-slate-900">{totalReviews}</span> reviews
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 px-2 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
