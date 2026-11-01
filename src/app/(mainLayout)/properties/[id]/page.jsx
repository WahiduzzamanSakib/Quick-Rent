"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import { FiCheckCircle, FiShield, FiCalendar } from "react-icons/fi";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReviewSection from "@/components/ReviewSection";
import FavoritePage from "@/components/FavoritePage";
import { BookingModalPage } from "@/components/modal/BookingModal";
import { authClient } from "@/lib/auth-client";

const PropertyDetails = () => {
  const { data: session } = authClient.useSession();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/signle-prperties/${id}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          }
        );
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Property Details...
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-900">Property Not Found</h2>
        <p className="mt-1 text-sm text-slate-500">
          The listing you are trying to view might have been removed or is unavailable.
        </p>
        <Link
          href="/properties"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Properties</span>
        </Link>
      </div>
    );
  }

  const amenitiesList = property?.amenities
    ? property.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  const role = session?.user?.role?.toLowerCase();
  const isTenant = role === "tenant";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-blue-600 transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">
            {property.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Hero Image Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative h-[340px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-md bg-slate-100"
        >
          <img
            src={
              property.imageUrl ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
            }
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-emerald-500/95 text-white font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-xs">
              {property.status || "Verified"}
            </span>
            <span className="bg-slate-900/80 text-white font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-xs">
              {property.propertyType}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 text-white max-w-2xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center text-sm sm:text-base text-slate-200 drop-shadow-sm">
              <FaMapMarkerAlt className="mr-1.5 text-blue-400 shrink-0" />
              {property.location}
            </p>
          </div>
        </motion.div>

        {/* Content Layout Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-2">
                  <FaBed size={18} />
                </div>
                <p className="text-sm font-bold text-slate-900">{property.bedrooms || 1} Bedrooms</p>
                <span className="text-[11px] text-slate-400">Sleeping spaces</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                  <FaBath size={18} />
                </div>
                <p className="text-sm font-bold text-slate-900">{property.bathrooms || 1} Bathrooms</p>
                <span className="text-[11px] text-slate-400">Full baths</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                  <FaRulerCombined size={18} />
                </div>
                <p className="text-sm font-bold text-slate-900">{property.size || 0} sqft</p>
                <span className="text-[11px] text-slate-400">Living area</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-2">
                  <FaParking size={18} />
                </div>
                <p className="text-sm font-bold text-slate-900">Available</p>
                <span className="text-[11px] text-slate-400">Dedicated Parking</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">About this property</h2>
              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Amenities & Features</h2>
              {amenitiesList.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {amenitiesList.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-semibold"
                    >
                      <FiCheckCircle className="text-blue-500" />
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No specific amenities specified for this listing.</p>
              )}
            </div>

            {/* Reviews Section */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
              {isTenant ? (
                <ReviewSection />
              ) : (
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 text-center text-xs text-slate-500">
                  Reviews can be submitted by verified tenant accounts.
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Booking & Reservation Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg space-y-5"
            >
              {/* Pricing Header */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rental Rate
                </span>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    ${Number(property.rent || 0).toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1.5">
                    /{property.rentType || "month"}
                  </span>
                </div>
              </div>

              {/* Status & Type Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Property Type</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {property.propertyType}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Verification</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                    <FiShield />
                    {property.status?.toUpperCase() || "VERIFIED"}
                  </span>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="space-y-2 pt-2">
                {isTenant ? (
                  <>
                    <BookingModalPage property={property} />
                    <FavoritePage property={property} />
                  </>
                ) : session?.user ? (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center text-xs text-amber-800 font-semibold">
                    You are logged in as {role}. Only registered tenants can reserve this property.
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="block w-full rounded-xl bg-blue-600 py-3 text-center text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                    >
                      Sign In to Book Property
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full rounded-xl border border-slate-200 py-3 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>

              {/* Trust Micro-copy */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center space-y-1">
                <p>🔒 256-bit SSL encrypted Stripe checkout</p>
                <p>✓ Direct booking confirmation with property owner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
