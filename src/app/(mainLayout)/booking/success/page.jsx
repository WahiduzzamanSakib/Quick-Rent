"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCalendar, FiHome, FiArrowRight } from "react-icons/fi";

const SuccessPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center"
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 mb-6 shadow-inner"
        >
          <FiCheckCircle size={44} />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Booking Confirmed!
        </h1>

        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          Your booking request and reservation fee have been received successfully. The property owner has been notified to review your move-in request.
        </p>

        <div className="my-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <FiCalendar className="text-blue-600 shrink-0" />
            <span>Track progress in your dashboard</span>
          </div>
          <p className="text-slate-500 pl-5">
            You can monitor approval status, payment details, and communicate directly through your Tenant Portal.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/dashboard/tenant/my-bookings"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>View My Bookings</span>
            <FiArrowRight />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <FiHome />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
