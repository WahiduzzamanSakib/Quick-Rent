"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRulerCombined,
  FaDollarSign,
  FaFilter,
} from "react-icons/fa";
import { FiRefreshCcw, FiSearch, FiHome } from "react-icons/fi";
import Link from "next/link";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const buildQuery = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties?${buildQuery()}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Properties fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    setCurrentPage(1);
  }, [filters]);

  const indexOfLast = currentPage * itemsPerPage;
  const current = properties.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleResetFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  const hasActiveFilters = Boolean(
    filters.location ||
      filters.propertyType ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.sort
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Explore The Marketplace
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Discover Rental Properties
              </h1>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                Browse through verified residential apartments, family homes, commercial offices, and retail shops.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 border border-blue-100">
                {properties.length} Available {properties.length === 1 ? "Listing" : "Listings"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="sticky top-[61px] z-30 border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Location input */}
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3.5 text-xs text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="City or Area"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </div>

            {/* Property Type select */}
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              value={filters.propertyType}
              onChange={(e) =>
                setFilters({ ...filters, propertyType: e.target.value })
              }
            >
              <option value="">All Property Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
              <option value="others">Others</option>
            </select>

            {/* Min Price input */}
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-bold text-slate-400 pointer-events-none">$</span>
              <input
                type="number"
                placeholder="Min Price"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
            </div>

            {/* Max Price input */}
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-bold text-slate-400 pointer-events-none">$</span>
              <input
                type="number"
                placeholder="Max Price"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs font-medium text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>

            {/* Sort select */}
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-medium text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <option value="">Default Sorting</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {/* Reset button */}
            <button
              type="button"
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-bold transition-all ${
                hasActiveFilters
                  ? "border-slate-300 bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-xs"
                  : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <FiRefreshCcw className="text-xs" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading && (
          <div className="py-28 flex flex-col justify-center items-center gap-3">
            <div className="loader"></div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Searching listings...
            </p>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-24 rounded-3xl border border-dashed border-slate-300 bg-white p-8 max-w-lg mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <FiSearch size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              No matching properties found
            </h2>
            <p className="mt-1.5 text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              We couldn't find any rentals matching your current filter criteria. Try adjusting your budget or clearing filters.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
              >
                <FiRefreshCcw />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {current.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-200/80 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 bg-emerald-500/95 text-white font-semibold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
                    {item.status || "Verified"}
                  </span>

                  <span className="absolute top-3 right-3 bg-slate-900/80 text-white font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
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

                {/* Details */}
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

                  {/* Specs & View Action */}
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
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-1.5 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 min-w-9 px-3 rounded-xl text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPropertiesPage;
