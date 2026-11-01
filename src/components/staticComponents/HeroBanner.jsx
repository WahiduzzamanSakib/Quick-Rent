"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMapPin, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FiHome, FiDollarSign } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("propertyType", propertyType);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section
      className="relative z-0 min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-12 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      {/* Refined gradient overlay for clear contrast & depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl w-full py-16"
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeInUp} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Rental Properties & Trusted Owners
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl"
        >
          Find Your Perfect{" "}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Stay.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="mt-5 text-slate-200 max-w-2xl text-base sm:text-lg font-normal leading-relaxed drop-shadow-sm"
        >
          Discover a curated collection of premier residential and commercial properties designed for exceptional living. Fast, secure, and hassle-free booking.
        </motion.p>

        {/* Search Bar Container */}
        <motion.form
          onSubmit={handleSearch}
          variants={fadeInUp}
          className="mt-10 rounded-2xl border border-white/20 bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end max-w-5xl"
        >
          {/* Location */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
              <HiOutlineMapPin className="text-blue-600" />
              Location
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
              <FiHome className="text-blue-600" />
              Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
              <FiDollarSign className="text-blue-600" />
              Min Price
            </label>
            <input
              type="number"
              placeholder="$0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
              <FiDollarSign className="text-blue-600" />
              Max Price
            </label>
            <input
              type="number"
              placeholder="$10,000+"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[42px] rounded-xl bg-blue-600 font-semibold text-white shadow-md shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HiOutlineMagnifyingGlass className="w-4 h-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
