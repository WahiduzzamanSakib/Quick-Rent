"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-[#050a30] py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-4xl px-4 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          Ready to find your next place?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 max-w-xl text-blue-100"
        >
          Browse verified properties or create a free account to start booking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/properties"
              className="block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-blue-50 hover:shadow-lg"
            >
              Browse properties
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/register"
              className="block rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10 hover:shadow-lg"
            >
              Create free account
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}