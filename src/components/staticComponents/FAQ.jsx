"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I book a rental property?",
    a: "Browse the property listing, select your move-in and move-out dates, and click 'Book Now'. Once logged in, confirm your booking details and complete the secure payment through Stripe. The owner will promptly receive and confirm your request.",
  },
  {
    q: "Do I need an account to browse properties?",
    a: "No! Anyone can freely search, filter by location or price, and explore all published listings. You only need to create a free account when you're ready to submit a booking or save favorites.",
  },
  {
    q: "How are properties verified on QuickRent?",
    a: "Every listing submitted by a property owner is reviewed and moderated by our administration team to ensure accurate photos, clear amenities, and legitimate ownership before going public.",
  },
  {
    q: "What types of properties are available?",
    a: "QuickRent supports an extensive variety of properties including apartments, detached family houses, modern corporate offices, retail shops, and commercial studios.",
  },
  {
    q: "How are payments handled securely?",
    a: "All financial transactions and reservation deposits are encrypted and processed through Stripe, the global leader in payment security. You will receive an immediate receipt and booking confirmation.",
  },
  {
    q: "Can I manage or cancel my bookings?",
    a: "Yes. From your tenant dashboard, you can track current booking statuses, view past reservations, and coordinate directly with property owners.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section id="help" className="scroll-mt-20 border-t border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 mb-2">
            <FiHelpCircle />
            Got Questions?
          </div> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Everything you need to know about the QuickRent rental platform, bookings, and owner verification.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map(({ q, a }, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={q}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/20 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-200 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white" : ""
                    }`}
                  >
                    <FiChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-slate-100/80 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
