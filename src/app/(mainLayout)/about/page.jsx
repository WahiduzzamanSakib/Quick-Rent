
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiSearch, FiHeart, FiCreditCard, FiStar, FiHome, FiBarChart2, FiUsers, FiCheckCircle, FiLock, FiUserCheck, FiShield, FiArrowRight, FiMapPin, FiKey, FiTrendingUp,} from "react-icons/fi";

const audiences = [
  {
    icon: FiSearch,
    number: "01",
    title: "For Tenants",
    text: "Discover a place that fits your lifestyle, location, and budget.",
    points: [
      "Search and filter approved properties",
      "Save favorite properties for later",
      "Book properties and pay securely",
      "Track booking and payment status",
      "Share ratings and reviews",
    ],
  },
  {
    icon: FiHome,
    number: "02",
    title: "For Property Owners",
    text: "Manage your listings, bookings, and rental performance in one place.",
    points: [
      "Create and manage property listings",
      "Review incoming booking requests",
      "Approve or reject tenant requests",
      "Track earnings and monthly analytics",
      "View feedback on rejected listings",
    ],
  },
  {
    icon: FiShield,
    number: "03",
    title: "For Administrators",
    text: "Keep the rental marketplace organized, transparent, and accountable.",
    points: [
      "Review and moderate property listings",
      "Manage users and account roles",
      "Provide property rejection feedback",
      "Monitor bookings and transactions",
      "Oversee marketplace activity",
    ],
  },
];

const standards = [
  {
    icon: FiCheckCircle,
    title: "Reviewed Properties",
    text: "Administrators review property listings before they become publicly available.",
  },
  {
    icon: FiLock,
    title: "Role-Based Access",
    text: "Protected routes and JWT-based authentication help restrict access to authorized users.",
  },
  {
    icon: FiCreditCard,
    title: "Stripe Payments",
    text: "Reservation payments are handled through Stripe, with successful transactions recorded.",
  },
  {
    icon: FiStar,
    title: "Community Reviews",
    text: "Authenticated tenants can share ratings and feedback about their rental experiences.",
  },
];

const steps = [
  {
    icon: FiSearch,
    title: "Discover",
    text: "Search properties by location, property type, and price without logging in.",
  },
  {
    icon: FiHeart,
    title: "Choose",
    text: "Log in or create an account to view full property details and save your favorite places.",
  },
  {
    icon: FiCreditCard,
    title: "Book Securely",
    text: "Logged-in tenants can submit booking requests and pay the reservation fee securely.",
  },
  {
    icon: FiKey,
    title: "Stay Informed",
    text: "Track your booking status and payment information anytime from your dashboard.",
  },
];


const highlights = [
  {
    icon: FiUsers,
    title: "Three Dedicated Roles",
    description: "Separate experiences for tenants, owners, and administrators.",
  },
  {
    icon: FiShield,
    title: "Approval-Based Listings",
    description: "Property moderation helps keep published listings organized.",
  },
  {
    icon: FiTrendingUp,
    title: "Owner Analytics",
    description: "Track property activity, bookings, and monthly earnings.",
  },
  {
    icon: FiMapPin,
    title: "Flexible Property Search",
    description: "Explore apartments, houses, offices, and shops.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto max-w-2xl text-center"
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] ${
          light ? "text-blue-300" : "text-blue-600"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-[#101828]"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-4 text-sm leading-7 sm:text-base ${
          light ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15 },
        variants: containerVariants,
      };

  const itemReveal = shouldReduceMotion
    ? {}
    : {
        variants: fadeUp,
        transition: { duration: 0.5 },
      };

  return (
    <main className="overflow-hidden bg-white text-[#101828]">
      {/* Hero */}
      <section className="relative isolate bg-[#050a30]">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="h-full w-full object-cover opacity-35 "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a30] via-[#050a30]/90 to-[#050a30]/45" />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65 }}
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
              <FiHome />
              About QuickRent
            </span>

            <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find a Place.
              <span className="block text-blue-400">
                Feel at Home.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              QuickRent connects property owners and tenants through a
              transparent rental marketplace. Discover suitable properties,
              manage bookings, and handle reservation payments in one
              convenient place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a30]"
              >
                Explore Properties
                <FiArrowRight />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Join QuickRent
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="Modern residential property with a welcoming interior"
                className="h-64 w-full rounded-xl object-cover sm:h-80"
              />

              <div className="flex items-center gap-3 px-3 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <FiCheckCircle size={22} />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    A clearer rental journey
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Discover, book, and manage in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-14 sm:py-18">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2"
        >
          <motion.div {...itemReveal}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Making property rental simpler for everyone.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Finding a place to rent can involve too many separate steps.
              QuickRent brings property discovery, listing management,
              booking requests, and reservation payments into a single
              platform.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our goal is to make the rental process easier to understand.
              Property owners can manage their listings and bookings, while
              tenants can compare properties, save favorites, and follow
              their booking progress.
            </p>

            <div className="mt-7 flex items-start gap-3">
              <FiCheckCircle className="mt-1 shrink-0 text-blue-600" size={20} />
              <p className="text-sm leading-7 text-slate-700">
                Clear property information, visible booking statuses, and
                structured property reviews help everyone stay informed.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...itemReveal}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {highlights.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">{title}</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Audiences */}
      <section className="bg-slate-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div {...reveal}>
            <SectionHeading
              eyebrow="Who We Serve"
              title="One platform. Three dedicated experiences."
              description="Tenants, property owners, and administrators get the tools they need through role-specific dashboards."
            />
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-12 grid items-stretch gap-6 lg:grid-cols-3"
          >
            {audiences.map(({ icon: Icon, number, title, text, points }) => (
              <motion.article
                key={title}
                {...itemReveal}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={24} />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-slate-300">
                    {number}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 min-h-14 text-sm leading-7 text-slate-600">
                  {text}
                </p>

                <div className="my-5 border-t border-slate-100" />

                <ul className="space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                    >
                      <FiCheckCircle
                        className="mt-1 shrink-0 text-blue-600"
                        size={16}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust and security */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div {...reveal}>
            <SectionHeading
              eyebrow="Trust & Transparency"
              title="A better rental experience starts with trust."
              description="QuickRent brings together listing moderation, protected access, payment processing, and tenant feedback."
            />
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {standards.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                {...itemReveal}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f4f7fc] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div {...reveal}>
            <SectionHeading
              eyebrow="How It Works"
              title="Your next place is just a few steps away."
              description="From the first search to checking your reservation, QuickRent keeps the process organized."
            />
          </motion.div>

          <motion.div
            {...reveal}
            className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                {...itemReveal}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="absolute right-4 top-4 text-xs font-bold text-slate-300">
                  0{index + 1}
                </span>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {text}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#050a30] py-14 sm:py-18">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="mx-auto max-w-3xl px-5 text-center sm:px-8"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
            <FiHome size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to find your next place?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Explore available properties or create an account to start your
            rental journey with QuickRent.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Browse Properties
              <FiArrowRight />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Create Free Account
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
