"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  FiArrowRight,
  FiMapPin,
  FiKey,
  FiTrendingUp,
} from "react-icons/fi";

const audiences = [
  {
    icon: FiSearch,
    number: "01",
    title: "For Tenants",
    text: "Discover a place that fits your lifestyle, location preferences, and monthly budget.",
    points: [
      "Search and filter approved properties",
      "Save favorite properties for later",
      "Book properties and pay securely via Stripe",
      "Track booking and payment status in dashboard",
      "Share verified ratings and community reviews",
    ],
  },
  {
    icon: FiHome,
    number: "02",
    title: "For Property Owners",
    text: "Manage your listings, booking requests, and rental performance in one central place.",
    points: [
      "Create and publish property listings with photos",
      "Review incoming booking requests in real-time",
      "Approve or reject tenant reservation requests",
      "Track earnings and monthly revenue analytics",
      "Manage property statuses and active tenancies",
    ],
  },
  {
    icon: FiShield,
    number: "03",
    title: "For Administrators",
    text: "Keep the rental marketplace organized, transparent, secure, and accountable.",
    points: [
      "Review and moderate all property listings",
      "Manage users and assign system account roles",
      "Approve or reject properties with clear criteria",
      "Monitor bookings and transaction histories",
      "Oversee marketplace operations and reviews",
    ],
  },
];

const standards = [
  {
    icon: FiCheckCircle,
    title: "Reviewed Properties",
    text: "Administrators review property listings before they become publicly available to ensure authentic images and accurate details.",
  },
  {
    icon: FiLock,
    title: "Role-Based Access",
    text: "Protected routes and JWT-based session tokens guarantee that tenants, owners, and admins access only authorized tools.",
  },
  {
    icon: FiCreditCard,
    title: "Stripe Secure Payments",
    text: "Reservation fees and deposits are encrypted and processed through Stripe, with instant receipts and verifiable transaction IDs.",
  },
  {
    icon: FiStar,
    title: "Community Reviews",
    text: "Authenticated tenants can share ratings and honest feedback about their rental experiences to guide fellow renters.",
  },
];

const steps = [
  {
    icon: FiSearch,
    title: "Discover",
    text: "Search properties by location, property type, and price range with instant filtering.",
  },
  {
    icon: FiHeart,
    title: "Inspect & Choose",
    text: "View full property details, verified amenities, size, and save favorites to your wishlist.",
  },
  {
    icon: FiCreditCard,
    title: "Reserve Securely",
    text: "Submit your reservation dates and complete checkout through Stripe's encrypted payment gateway.",
  },
  {
    icon: FiKey,
    title: "Move In & Track",
    text: "Track your booking confirmation and manage your rental journey directly from your dashboard.",
  },
];

const highlights = [
  {
    icon: FiUsers,
    title: "Three Dedicated Roles",
    description: "Customized experiences designed specifically for tenants, property owners, and platform administrators.",
  },
  {
    icon: FiShield,
    title: "Approval-Based Listings",
    description: "Human-reviewed property moderation maintains listing quality and eliminates spam.",
  },
  {
    icon: FiTrendingUp,
    title: "Owner Analytics",
    description: "Real-time earnings tracking, reservation performance charts, and booking request management.",
  },
  {
    icon: FiMapPin,
    title: "Flexible Property Search",
    description: "Explore diverse property categories: apartments, residential houses, corporate offices, and shops.",
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
    <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${
          light ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-3 text-sm sm:text-base leading-relaxed ${
          light ? "text-slate-300" : "text-slate-500"
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

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate bg-slate-950 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Interior"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
              <FiHome />
              About QuickRent
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              Find a Place. <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Feel at Home.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
              QuickRent connects quality-seeking tenants and verified property owners through a transparent, automated rental marketplace. Discover suitable properties, book in seconds, and handle secure payments with total peace of mind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-98"
              >
                <span>Explore Properties</span>
                <FiArrowRight />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-md transition-all hover:border-slate-500 hover:text-white active:scale-98"
              >
                Join QuickRent
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-blue-500/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2.5 shadow-2xl backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="Modern property"
                className="h-64 sm:h-80 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Built for Everyone"
            title="A Unified Platform for All Rental Needs"
            description="Whether you're renting your next apartment, listing your properties, or moderating listings, QuickRent delivers tailored tools."
          />

          <motion.div
            {...reveal}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {audiences.map((aud) => {
              const Icon = aud.icon;
              return (
                <motion.div
                  key={aud.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={20} />
                      </div>
                      <span className="text-xl font-black text-slate-200">
                        {aud.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {aud.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {aud.text}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {aud.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quality & Security"
            title="Our Platform Standards"
            description="Built from the ground up with verification, role-based protection, and reliable payments."
          />

          <motion.div
            {...reveal}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {standards.map((std) => {
              const Icon = std.icon;
              return (
                <motion.div
                  key={std.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {std.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {std.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it Works Summary */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Simplicity First"
            title="Four Steps to Exceptional Living"
            description="From discovery to move-in, QuickRent simplifies your entire rental journey."
          />

          <motion.div
            {...reveal}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
