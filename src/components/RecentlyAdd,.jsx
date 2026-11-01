"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRulerCombined,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

const RecentlyAddPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recent-properties`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        setProperties(data?.data || data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col justify-center items-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Recent Listings...
        </p>
      </div>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Fresh on QuickRent
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Recently Added Properties
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">
            Be the first to inspect and book newly submitted and approved rental listings.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span>Explore All</span>
          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-xl hover:border-blue-200/80 transition-all duration-300 overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

              <span className="absolute top-3 left-3 bg-blue-600 text-white font-semibold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                New
              </span>

              <span className="absolute top-3 right-3 bg-slate-900/80 text-white font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs">
                {item.propertyType}
              </span>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xl font-black drop-shadow-md flex items-center">
                  ${Number(item.rent || 0).toLocaleString()}
                  <span className="text-xs font-normal text-slate-200 ml-1">
                    /{item.rentType || "month"}
                  </span>
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                  <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Specs & Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-medium">
                    <FaBed className="text-slate-400" />
                    <span>{item.bedrooms || 1} Beds</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <FaRulerCombined className="text-slate-400" />
                    <span>{item.size || 0} sqft</span>
                  </div>
                </div>

                <Link
                  href={`/properties/${item._id}`}
                  className="rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAddPage;
