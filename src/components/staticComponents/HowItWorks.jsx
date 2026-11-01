"use client";

import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: FiSearch,
    title: "Search & Discover",
    text: "Filter through verified apartments, homes, and offices by location, property type, and budget to find your ideal match.",
  },
  {
    number: "02",
    icon: FiCalendar,
    title: "Request & Reserve",
    text: "Log in to inspect detailed photos, review terms, and submit your reservation request with secure Stripe processing.",
  },
  {
    number: "03",
    icon: FiKey,
    title: "Move In & Enjoy",
    text: "Once the owner approves your booking, coordinate your move-in date smoothly with direct confirmation in your dashboard.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-to-works" className="scroll-mt-20 bg-slate-50/80 border-y border-slate-200/80 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            Streamlined Journey
          </span>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            How QuickRent Works
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-500">
            Three simple, transparent steps from exploring your dream location to picking up the keys.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {steps.map(({ number, icon: Icon, title, text }) => (
            <motion.li
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-xl sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/60 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="text-xl" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                    {number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>

                {/* Text */}
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {text}
                </p>
              </div>

              {/* Progress Line */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <span>Step {number}</span>
                <span className="h-1 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <span
                    className={`block h-full bg-blue-600 rounded-full ${
                      number === "01" ? "w-1/3" : number === "02" ? "w-2/3" : "w-full"
                    }`}
                  />
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
