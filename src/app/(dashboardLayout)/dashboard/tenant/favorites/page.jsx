"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHome, FaDollarSign, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FavoriteDelate } from "@/components/modal/FavoriteDelate";

const FavoritePropertiesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;
    const fetchFavorites = async () => {
      setLoading(true);

      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/tenant/favorite/${email}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          }
        );

        const data = await res.json();
        setFavorites(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        console.error("Favorites error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [email]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Saved Listings
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Favorite Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Properties you've saved for future reservations and reference.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-98 w-fit"
        >
          <span>Find More Stays</span>
        </Link>
      </div>

      {loading && (
        <div className="py-24 flex flex-col justify-center items-center gap-3">
          <div className="loader"></div>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Loading Favorites...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && favorites.length === 0 && (
        <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-500 mb-3">
            <FaHeart size={26} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No favorite properties saved</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Browse our listings and click "Add to Favorite" on properties you love to access them anytime.
          </p>
          <Link
            href="/properties"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>Browse Properties</span>
          </Link>
        </div>
      )}

      {/* Grid */}
      {!loading && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={
                    item.imageUrl ||
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
                  {item.propertyType || "Property"}
                </span>

                <div className="absolute top-3 right-3">
                  <FavoriteDelate property={item} />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base font-black text-slate-900">
                    ${Number(item.rent || 0).toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      /{item.rentType || "month"}
                    </span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <Link
                    href={`/properties/${item.propertyId || item._id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <span>View Listing</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePropertiesPage;
