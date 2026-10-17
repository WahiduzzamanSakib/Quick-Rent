
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
            const { data: token, error: tokenError } =
                await authClient.token();

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
                throw new Error(
                    data.message || "Failed to submit review."
                );
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
                {/* Button always visible */}
                <Button className="rounded-lg bg-indigo-500 text-white transition duration-300 hover:scale-105">
                    Give Feedback
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                    <FaStar className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading>
                                    Give Feedback
                                </Modal.Heading>

                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Share your experience and rate this property.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                {isPending ? (
                                    <p className="py-6 text-center text-sm text-slate-500">
                                        Loading...
                                    </p>
                                ) : !session?.user ? (
                                    // Not logged in: show only this message
                                    <div className="py-8 text-center">
                                        <p className="text-xl font-bold text-red-600">
                                            Login or register first
                                        </p>
                                    </div>
                                ) : !allowedRoles.includes(
                                    reviewerRole?.toLowerCase()
                                ) ? (
                                    <div className="py-8 text-center">
                                        <p className="font-medium text-red-500">
                                            You are not allowed to give a review.
                                        </p>
                                    </div>
                                ) : (
                                    // Logged in tenant/owner: show review form
                                    <Surface variant="default">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div>
                                                <Label>Your Rating</Label>

                                                <div className="mt-3 flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <FaStar
                                                                key={star}
                                                                size={26}
                                                                className="cursor-pointer transition-transform hover:scale-110"
                                                                color={
                                                                    star <=
                                                                        (hover || rating)
                                                                        ? "#facc15"
                                                                        : "#d1d5db"
                                                                }
                                                                onClick={() =>
                                                                    setRating(star)
                                                                }
                                                                onMouseEnter={() =>
                                                                    setHover(star)
                                                                }
                                                                onMouseLeave={() =>
                                                                    setHover(0)
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <TextField
                                                className="w-full"
                                                name="review"
                                                variant="secondary"
                                            >
                                                <Label>Review</Label>
                                                <Input
                                                    placeholder="Write your review..."
                                                    value={review}
                                                    onChange={(e) =>
                                                        setReview(e.target.value)
                                                    }
                                                    required
                                                />
                                            </TextField>

                                            <Modal.Footer>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting
                                                        ? "Submitting..."
                                                        : "Submit Review"}
                                                </Button>
                                            </Modal.Footer>
                                        </form>
                                    </Surface>
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
