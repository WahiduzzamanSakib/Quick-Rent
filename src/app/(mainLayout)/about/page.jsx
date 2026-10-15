"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiHeart,
  FiCreditCard,
  FiStar,
  FiHome,
  FiBarChart2,
  FiUsers,
  FiCheckCircle,
  FiLock,
  FiUserCheck,
  FiShield,
} from "react-icons/fi";

const audiences = [
  {
    icon: FiSearch,
    title: "For tenants",
    text: "Find the right place faster, and book it with confidence.",
    points: [
      "Search by location, type and price, then sort results",
      "Save properties to your favorites",
      "Book online and pay your reservation fee securely",
      "Track every booking and payment from your dashboard",
      "Rate and review the places you stayed in",
    ],
  },
  {
    icon: FiHome,
    title: "For property owners",
    text: "List your property and manage everything in one place.",
    points: [
      "Add listings with photos, amenities and rent details",
      "Review and approve or reject booking requests",
      "See total earnings, properties and bookings at a glance",
      "Follow monthly earnings on a 12-month chart",
      "Read feedback if a listing needs changes",
    ],
  },
  {
    icon: FiUserCheck,
    title: "For administrators",
    text: "Keep the marketplace accurate, fair and safe.",
    points: [
      "Approve or reject every property before it goes live",
      "Give owners clear feedback on rejected listings",
      "Manage users and change roles",
      "Monitor all bookings and transactions",
    ],
  },
];

const standards = [
  {
    icon: FiCheckCircle,
    title: "Reviewed listings",
    text: "A property appears publicly only after an administrator approves it.",
  },
  {
    icon: FiLock,
    title: "Protected access",
    text: "JWT-based authentication and role-based access keep each account limited to what it should see.",
  },
  {
    icon: FiCreditCard,
    title: "Secure payments",
    text: "Reservation fees are processed through Stripe, and every payment is saved as a transaction record.",
  },
  {
    icon: FiStar,
    title: "Honest reviews",
    text: "Only logged-in tenants can leave a rating, so feedback comes from real users.",
  },
];

const steps = [
  {
    icon: FiSearch,
    title: "Search",
    text: "Filter listings by location, type and price.",
  },
  {
    icon: FiHeart,
    title: "Shortlist",
    text: "Save favorites and compare details.",
  },
  {
    icon: FiCreditCard,
    title: "Book and pay",
    text: "Send a booking request and pay the reservation fee.",
  },
  {
    icon: FiBarChart2,
    title: "Track",
    text: "Follow booking status and payments in your dashboard.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#050a30] py-16 sm:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-4xl px-4 text-center"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            A clearer way to rent property
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            QuickRent is a rental marketplace where owners list their
            properties and tenants discover, book and pay online. We keep the
            process transparent for everyone involved.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Our mission
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 leading-relaxed text-slate-600"
            >
              Finding a rental should not mean chasing phone numbers or
              guessing whether a listing is real. QuickRent brings owners and
              tenants together on one platform, with reviewed listings, online
              booking and secure payment built in.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 leading-relaxed text-slate-600"
            >
              Apartments, houses, offices and shops are all listed here. Each
              property goes through approval, each booking has a clear status,
              and each payment is recorded, so tenants and owners always know
              where they stand.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: FiUsers,
                label: "Three roles",
                text: "Tenant, Owner and Admin",
              },
              {
                icon: FiShield,
                label: "Approval first",
                text: "Listings are reviewed before going live",
              },
              {
                icon: FiCreditCard,
                label: "Stripe payments",
                text: "Secure reservation fees",
              },
              {
                icon: FiStar,
                label: "Real reviews",
                text: "Ratings from logged-in tenants",
              },
            ].map(({ icon: Icon, label, text }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <Icon className="text-blue-600" size={24} />
                <h3 className="mt-3 font-semibold text-slate-900">{label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Audiences */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Built for everyone in the rental process
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3 max-w-2xl text-slate-600"
            >
              Each role gets its own dashboard with only the tools it needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mt-12 grid gap-6 lg:grid-cols-3"
          >
            {audiences.map(({ icon: Icon, title, text, points }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="mt-1 text-slate-600">{text}</p>

                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <FiCheckCircle
                        className="mt-0.5 shrink-0 text-blue-600"
                        size={16}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              How we keep QuickRent trustworthy
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-3 max-w-2xl text-slate-600"
            >
              Trust is built into how the platform works, not added afterwards.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {standards.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="h-full rounded-xl border border-slate-200 bg-slate-50 p-5 transition-shadow duration-300 hover:shadow-lg"
              >
                <Icon className="text-blue-600" size={26} />
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              From search to booking
            </h2>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 ease-out hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white"
                >
                  <Icon size={24} />
                </motion.div>

                <span className="mt-4 block text-sm font-semibold text-blue-600">
                  Step {i + 1}
                </span>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm text-slate-600">
                  {text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-4 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start with Quick Rent today
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Browse approved properties, or create an account to list your own.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/properties"
                className="block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg"
              >
                Browse properties
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className="block rounded-lg border border-white px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
              >
                Create free account
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}