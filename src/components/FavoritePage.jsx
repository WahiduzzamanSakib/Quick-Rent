"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const FavoritePage = ({ property }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  const handleFavorite = async () => {
    if (liked || loading) return;

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
      const { data: token } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/tenant/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token?.token}`,
          },
          body: JSON.stringify(favoriteData),
        }
      );

      const data = await res.json();
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
        type="button"
        onClick={handleFavorite}
        disabled={liked || loading}
        className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
          liked
            ? "border-pink-200 bg-pink-50 text-pink-600 cursor-default"
            : "border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/30"
        }`}
      >
        <FaHeart className={liked ? "text-pink-600" : "text-slate-400"} />
        <span>{liked ? "Saved to Favorites" : loading ? "Saving..." : "Save to Favorites"}</span>
      </button>
    </div>
  );
};

export default FavoritePage;
