"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I book a property?",
    a: "Open any listing, check the details and click the booking button. You need to be logged in. The owner will review your request and confirm.",
  },
  {
    q: "Do I need an account to browse properties?",
    a: "No. You can search and view all listings without an account. You only need to register or log in when you want to book.",
  },
  {
    q: "Are the listings verified?",
    a: "Yes. Every property is reviewed and approved before it appears on the site.",
  },
  {
    q: "What types of properties can I find?",
    a: "Apartments, houses, offices, shops and other commercial or residential spaces.",
  },
  {
    q: "How is payment handled?",
    a: "Payments are encrypted and processed securely through Stripe. The monthly price is shown on each listing.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. See the cancellation policy page for the rules and deadlines.",
  },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <section id="help" className="scroll-mt-20 border-t border-blue-300 bg-gray-50 py-10 sm:py-10">
      <div className="mx-auto max-w-3xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={listVariants}
          className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200"
        >
          {faqs.map(({ q, a }, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={q}
                variants={itemVariants}
                className="bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900 transition-colors duration-300 ease-in-out hover:bg-slate-50 hover:text-blue-600"
                >
                  <span>{q}</span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 text-slate-500"
                  >
                    <FiChevronDown
                      size={20}
                      className={isOpen ? "text-blue-600" : ""}
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: "easeInOut",
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-600 sm:text-base">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}