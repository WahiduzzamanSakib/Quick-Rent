"use client";

import { motion } from "framer-motion";
import { FiHome, FiSearch, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50/60 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute w-96 h-96 bg-blue-500/10 blur-3xl rounded-full top-[-50px] left-[-50px] pointer-events-none" />
      <div className="absolute w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full bottom-[-50px] right-[-50px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md text-center"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl backdrop-blur-md">
          {/* Logo icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <Image
              src="/quickrent.png"
              alt="QuickRent Logo"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>

          {/* 404 Error Code */}
          <h1 className="text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Page or Listing Not Found
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            The property or page you are looking for does not exist, has been unlisted, or moved to a new address.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-2.5">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <FiHome />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/properties"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <FiSearch />
              <span>Browse All Properties</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
