"use client";

import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button, Link } from "@heroui/react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-800 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">

      {/* Background Decorative Blobs */}
      <div className="absolute w-120 h-120 bg-indigo-500/10 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-100 h-100 bg-blue-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-gray-400 dark:bg-slate-900/70 border border-white/40 dark:border-slate-800 rounded-3xl shadow-2xl p-10 text-center">


          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-inner"
          >
            <FiHome size={36} />
          </motion.div>

          {/* 404 Error Code */}
          <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>

          {/* Contextual Title */}
          <h2 className="mt-3 text-xl font-bold text-gray-800 dark:text-gray-200">
            Listing or Page Not Found
          </h2>

          {/* Rental Platform Content */}
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The rental property or page you are looking for does not exist, has been unlisted, or moved to a new location.
          </p>

          {/* CTA - Explore Properties */}
          <Link href="/">
            <Button
              className="mt-4 text-md  w-full font-bold text-white hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
            >
              Go Back
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}