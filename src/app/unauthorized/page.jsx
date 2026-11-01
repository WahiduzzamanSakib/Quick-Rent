"use client";

import { motion } from "framer-motion";
import { FiHome, FiLock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";


export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50/70 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute w-96 h-96 bg-rose-500/10 blur-3xl rounded-full top-[-50px] right-[-50px] pointer-events-none" />
      <div className="absolute w-96 h-96 bg-amber-500/10 blur-3xl rounded-full bottom-[-50px] left-[-50px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md text-center"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl backdrop-blur-md">
          {/* Lock icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner">
            <FiLock size={32} />
          </div>

          <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-100 mb-2">
            Restricted Access
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Access Unauthorized
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            You do not have the required permissions or role to access this dashboard section.
          </p>

          <div className="mt-7 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <span>Sign In with Different Account</span>
              <FiArrowRight />
            </Link>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <FiHome />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
