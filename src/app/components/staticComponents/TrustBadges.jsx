"use client";
import React from "react";
import { motion } from "framer-motion";

import { HiOutlineShieldCheck, HiOutlineCircleStack } from "react-icons/hi2";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-[#006A4E]" />,
      title: "Verified Listings",
      description:
        "Every property undergoes a 50-point inspection for quality and security.",
    },
    {
      id: 2,
      icon: <HiOutlineCircleStack className="w-6 h-6 text-[#006A4E]" />,
      title: "Secure Payments",
      description:
        "Industry-leading encryption ensuring your transactions are always protected.",
    },
    {
      id: 3,
      icon: <RiCustomerService2Fill className="w-6 h-6 text-[#006A4E]" />,
      title: "24/7 Support",
      description:
        "Our dedicated concierge team is available around the clock for your needs.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section className="bg-[#F0F5FA] py-16 px-4 sm:px-6 lg:px-8 font-serif">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
      >
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group relative flex flex-col items-center max-w-xs mx-auto p-6 rounded-2xl
                       bg-white/60 backdrop-blur-md border border-white/40 shadow-sm
                       hover:shadow-xl hover:bg-white/80 cursor-pointer"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 bg-[#DCE6F1] rounded-full flex items-center justify-center mb-5
                         shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#cfe0f5]"
            >
              {badge.icon}
            </div>

            {/* Title */}
            <h3 className="text-[#0A1E36] text-xl font-bold tracking-wide mb-3 transition-colors duration-300 group-hover:text-[#006A4E]">
              {badge.title}
            </h3>

            {/* Description */}
            <p className="text-[#4A5E73] text-[15px] leading-relaxed font-sans font-normal transition-colors duration-300 group-hover:text-[#2f4157]">
              {badge.description}
            </p>

            {/* subtle glow accent */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-b from-white/30 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}