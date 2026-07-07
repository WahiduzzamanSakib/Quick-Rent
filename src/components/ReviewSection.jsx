import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { authClient } from '@/lib/auth-client';
import { toast } from "react-toastify";

const ReviewSection = ({ user }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
 
    const { data: session } = authClient.useSession();
    const reviewerEmail = session?.user?.email;
    const reviewerName = session?.user?.name;
    const reviewerImage = session?.user?.image;
    const reviewerRole = session?.user?.role;

   
    const handleSubmit = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dashboard/single-properties/review`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reviewerName,
                        reviewerEmail,
                        reviewerImage,
                        reviewerRole,
                        rating,
                        review,
                    }),
                }
            );

            const data = await res.json();
            toast.success("Review submitted successfully!");
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                Reviews
            </h2>

            <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={24}
                        className="cursor-pointer transition-colors"
                        color={star <= (hover || rating) ? "#facc15" : "#d1d5db"}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    />
                ))}
            </div>

            <textarea
                className="w-full mt-3 border p-3 rounded-lg"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Submit Review
            </button>
        </div>
    );
};

export default ReviewSection;