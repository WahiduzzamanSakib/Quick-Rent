
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <section className="bg-gray-50 border-t border-blue-300 py-10 sm:py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="animate-fade-in-up text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
          {faqs.map(({ q, a }, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={q}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in-up"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900 transition-colors duration-300 ease-in-out hover:bg-slate-50 hover:text-blue-600"
                >
                  <span>{q}</span>

                  <FiChevronDown
                    size={20}
                    className={`shrink-0 text-slate-500 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 text-sm leading-7 text-slate-600 transition-[padding,opacity] duration-300 ease-in-out sm:text-base ${
                        isOpen
                          ? "pb-5 opacity-100"
                          : "pb-0 opacity-0"
                      }`}
                    >
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Still have a question?{" "}
          <Link
            href="/contact"
            className="font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800 hover:underline"
          >
            Contact us →
          </Link>
        </p>
      </div>
    </section>
  );
}
