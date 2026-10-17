
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

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

    const positiveReviews = reviews.filter(
        (review) => Number(review.rating) >= 4
    ).length;

    const positivePercentage =
        totalReviews > 0
            ? Math.round((positiveReviews / totalReviews) * 100)
            : 0;

    const averageRating =
        totalReviews > 0
            ? (
                  reviews.reduce(
                      (sum, review) =>
                          sum + (Number(review.rating) || 0),
                      0
                  ) / totalReviews
              ).toFixed(1)
            : "0.0";

    // Pagination
    const totalPages = Math.ceil(totalReviews / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const paginatedReviews = reviews.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const startItem = totalReviews > 0 ? startIndex + 1 : 0;

    const endItem = Math.min(
        startIndex + ITEMS_PER_PAGE,
        totalReviews
    );

    // Delete Review
    const handleDeleteReview = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this review?"
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

            const updatedReviews = reviews.filter(
                (review) => review._id !== id
            );

            setReviews(updatedReviews);

            const updatedTotalPages = Math.ceil(
                updatedReviews.length / ITEMS_PER_PAGE
            );

            if (currentPage > updatedTotalPages) {
                setCurrentPage(Math.max(1, updatedTotalPages));
            }
        } catch (err) {
            console.error(err);
            window.alert(
                "Could not delete review. Please check your backend DELETE API."
            );
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
        <section className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
                {/* Page Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-2xl font-bold text-black sm:text-3xl"
                >
                    All Reviews
                </motion.h1>

                {/* Statistics Cards */}
                <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* Total Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Reviews
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                    {loading ? "..." : totalReviews}
                                </h2>
                            </div>

                            <FiMessageSquare
                                size={27}
                                className="text-blue-600"
                            />
                        </div>
                    </motion.div>

                    {/* Positive Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Positive Reviews
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-green-600">
                                    {loading ? "..." : `${positivePercentage}%`}
                                </h2>
                            </div>

                            <FiTrendingUp
                                size={28}
                                className="text-green-600"
                            />
                        </div>
                    </motion.div>

                    {/* Average Rating */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -3 }}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Average Rating
                                </p>
                                <h2 className="mt-2 text-3xl font-bold text-amber-500">
                                    {loading ? "..." : `${averageRating} / 5`}
                                </h2>
                            </div>

                            <FaStar
                                size={27}
                                className="text-amber-400"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Table Heading */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                        Review Management
                    </h2>

                    <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
                        <FiUsers size={17} />
                        {totalReviews} Reviews
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        Loading reviews...
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
                        <p className="text-red-600">{error}</p>

                        <button
                            onClick={fetchReviews}
                            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Reviews Table */}
                {!loading && !error && (
                    <>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            {totalReviews > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px] border-collapse text-left">
                                        <thead className="bg-gray-100">
                                            <tr className="border-b border-gray-200 text-sm text-gray-900">
                                                <th className="px-4 py-4 font-bold">
                                                    Reviewer
                                                </th>
                                                <th className="px-4 py-4 font-bold">
                                                    Rating
                                                </th>
                                                <th className="px-4 py-4 font-bold">
                                                    Review Message
                                                </th>
                                                <th className="px-4 py-4 font-bold">
                                                    Review Date
                                                </th>
                                                <th className="px-4 py-4 text-center font-bold">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <motion.tbody
                                            key={currentPage}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {paginatedReviews.map((review) => (
                                                <motion.tr
                                                    key={review._id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="border-b border-gray-200 transition-colors hover:bg-gray-50 last:border-b-0"
                                                >
                                                    {/* Reviewer */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex min-w-[220px] items-center gap-3">
                                                            <img
                                                                src={
                                                                    review.reviewerImage ||
                                                                    "/placeholder.png"
                                                                }
                                                                alt={
                                                                    review.reviewerName ||
                                                                    "Reviewer"
                                                                }
                                                                className="h-12 w-12 shrink-0 rounded-full border border-gray-200 bg-gray-100 object-cover"
                                                            />

                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-gray-900">
                                                                    {review.reviewerName ||
                                                                        "Anonymous"}
                                                                </p>

                                                                <p className="mt-1 break-all text-xs text-gray-500">
                                                                    {review.reviewerEmail ||
                                                                        "No email"}
                                                                </p>

                                                                <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-xs capitalize text-indigo-600">
                                                                    {review.reviewerRole?.toLowerCase() ||
                                                                        "Guest"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Rating */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-1">
                                                            {[1, 2, 3, 4, 5].map(
                                                                (star) => (
                                                                    <FaStar
                                                                        key={star}
                                                                        size={14}
                                                                        className={
                                                                            star <=
                                                                            Number(
                                                                                review.rating
                                                                            )
                                                                                ? "text-amber-400"
                                                                                : "text-gray-200"
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>

                                                        <p className="mt-1 text-sm font-medium text-gray-600">
                                                            {Number(
                                                                review.rating
                                                            ) || 0}{" "}
                                                            / 5
                                                        </p>
                                                    </td>

                                                    {/* Review Message */}
                                                    <td className="max-w-sm px-4 py-4">
                                                        <p className="whitespace-normal break-words text-sm leading-6 text-gray-700">
                                                            {review.review ||
                                                                "No message"}
                                                        </p>
                                                    </td>

                                                    {/* Review Date */}
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                        {formatDate(
                                                            review.createdAt
                                                        )}
                                                    </td>

                                                    {/* Delete */}
                                                    <td className="px-4 py-4 text-center">
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                deletingId ===
                                                                review._id
                                                            }
                                                            onClick={() =>
                                                                handleDeleteReview(
                                                                    review._id
                                                                )
                                                            }
                                                            title="Delete Review"
                                                            aria-label="Delete Review"
                                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            <FiTrash2
                                                                size={16}
                                                            />
                                                            {deletingId ===
                                                            review._id
                                                                ? "Deleting..."
                                                                : "Delete"}
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </motion.tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <FaStar className="mx-auto mb-4 text-4xl text-amber-400" />

                                    <h3 className="text-xl font-bold text-gray-800">
                                        No Reviews Yet
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Reviews will appear here when users
                                        submit their feedback.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalReviews > 0 && (
                            <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-600">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-900">
                                        {startItem}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-900">
                                        {endItem}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-900">
                                        {totalReviews}
                                    </span>{" "}
                                    reviews
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.max(1, page - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <FiChevronLeft size={17} />
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                                                currentPage === page
                                                    ? "bg-blue-600 text-white"
                                                    : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.min(
                                                    totalPages,
                                                    page + 1
                                                )
                                            )
                                        }
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next
                                        <FiChevronRight size={17} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
