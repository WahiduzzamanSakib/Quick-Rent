"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiMessageSquare } from "react-icons/fi";

export function GiveFeedbackModal() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const reviewerEmail = session?.user?.email;
  const reviewerName = session?.user?.name;
  const reviewerImage = session?.user?.image;
  const reviewerRole = session?.user?.role;

  const allowedRoles = ["tenant", "owner"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user || !reviewerEmail) {
      toast.error("Please login or register first.");
      return;
    }

    if (!allowedRoles.includes(reviewerRole?.toLowerCase())) {
      toast.error("You are not allowed to give a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write your review.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: token, error: tokenError } = await authClient.token();

      if (tokenError || !token?.token) {
        toast.error("Authentication failed.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/single-properties/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`,
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

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review.");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setHover(0);
      setReview("");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Modal>
        <Button className="rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:bg-blue-700 transition px-5 py-2.5 flex items-center gap-2">
          <FiMessageSquare size={14} />
          <span>Write a Review</span>
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Icon className="bg-amber-50 text-amber-500 rounded-xl p-2">
                  <FaStar className="size-5" />
                </Modal.Icon>

                <Modal.Heading className="text-lg font-black text-slate-900 tracking-tight">
                  Share Your Experience
                </Modal.Heading>

                <p className="mt-1 text-xs text-slate-500">
                  Rate QuickRent and share your rental experience with the community.
                </p>
              </Modal.Header>

              <Modal.Body className="p-0 pt-4">
                {isPending ? (
                  <p className="py-6 text-center text-xs text-slate-400">Loading...</p>
                ) : !session?.user ? (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-bold text-slate-900">
                      Sign In Required
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Please log in or register to submit a community review.
                    </p>
                  </div>
                ) : !allowedRoles.includes(reviewerRole?.toLowerCase()) ? (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm font-bold text-slate-900">
                      Review Permission
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Only registered tenants and owners can submit feedback.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Star Rating
                      </label>
                      <div className="flex gap-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="cursor-pointer transition-transform hover:scale-110 p-0.5"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            <FaStar
                              size={22}
                              className={
                                star <= (hover || rating)
                                  ? "text-amber-400"
                                  : "text-slate-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Review Feedback
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Write your review experience..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <Modal.Footer className="px-0 pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-blue-600 text-white font-bold text-xs py-3 shadow-xs hover:bg-blue-700"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </Button>
                    </Modal.Footer>
                  </form>
                )}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}

export default GiveFeedbackModal;
