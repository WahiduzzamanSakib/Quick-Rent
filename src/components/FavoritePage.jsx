import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const FavoritePage = ({ property }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email ;

  const handleFavorite = async () => {
    if (liked || loading) return; // prevent multiple click

    setLoading(true);

    const favoriteData = {
      propertyId: property?._id,
      title: property?.title,
     imageUrl: property?.imageUrl,
      propertyType: property?.propertyType,
      rent: property?.rent,
      rentType: property?.rentType,
      userEmail,
    };

    try {
       const { data: token, error: tokenError } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/tenant/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              authorization: `Bearer ${token?.token}`
          },
          body: JSON.stringify(favoriteData),
        }
      );

      const data = await res.json();
      console.log("Saved to DB:", data);

      setLiked(true);
      toast.success("Property added to favorites!");
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFavorite}
        disabled={liked || loading}
        className={`w-full mt-3 border py-2 rounded-xl flex items-center justify-center gap-2 transition
          ${liked ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        <FaHeart className={liked ? "text-red-500" : ""} />

        {liked ? "Added to Favorite" : loading ? "Saving..." : "Add to Favorite"}
      </button>
    </div>
  );
};

export default FavoritePage;