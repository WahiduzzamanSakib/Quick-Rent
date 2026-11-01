"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiUserCheck } from "react-icons/fi";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 py-16 sm:py-20 border-t border-slate-800">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-4 backdrop-blur-md">
          <FiUserCheck className="text-emerald-400" />
          Join Thousands of Verified Users
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Ready to Find Your Next Space?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
          Explore curated listings, reserve with complete confidence, or list your own properties with guaranteed verified tenants.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Link
            href="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl active:scale-98"
          >
            <span>Explore Properties</span>
            <FiArrowRight />
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white active:scale-98"
          >
            Create Free Account
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
