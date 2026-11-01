"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineCreditCard } from "react-icons/hi2";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Verified Listings",
      description:
        "Every property undergoes a 50-point inspection for verified accuracy, amenities, and security.",
    },
    {
      id: 2,
      icon: <HiOutlineCreditCard className="w-6 h-6 text-emerald-600" />,
      title: "Secure Payments",
      description:
        "Bank-grade Stripe encryption ensuring your reservation deposit and rental payments are 100% protected.",
    },
    {
      id: 3,
      icon: <RiCustomerService2Fill className="w-6 h-6 text-indigo-600" />,
      title: "24/7 Dedicated Support",
      description:
        "Our customer concierge team is available around the clock to assist tenants and owners at every step.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-slate-50/70 border-b border-slate-200/70 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative flex flex-col items-center p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50/60 shadow-xs">
              {badge.icon}
            </div>

            {/* Title */}
            <h3 className="text-slate-900 text-lg font-bold tracking-tight mb-2 transition-colors duration-200 group-hover:text-blue-600">
              {badge.title}
            </h3>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              {badge.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
