"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiImage, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);

    const { name, email, image, password } = user;
    const errors = [];

    if (!password || password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image || null,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google login failed");
        return;
      }

      if (data) {
        toast.success("Login successful!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/70 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-xl relative z-10"
      >
        <div className="p-8 sm:p-10 shadow-xl rounded-3xl bg-white border border-slate-200/90">
          {/* Header */}
          <motion.div variants={item} className="text-center mb-8">
            <Link href="/" className="inline-flex justify-center mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 p-2 shadow-xs">
                <Image
                  src="/quickrent.png"
                  alt="Quick Rent Logo"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create an Account
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join QuickRent to explore, book, and list properties
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <motion.div variants={item}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-slate-400 text-sm pointer-events-none" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-slate-400 text-sm pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Photo URL <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative flex items-center">
                <FiImage className="absolute left-3.5 text-slate-400 text-sm pointer-events-none" />
                <input
                  name="image"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-slate-400 text-sm pointer-events-none" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create strong password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3 pl-10 pr-11 text-sm font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                At least 6 characters with uppercase, lowercase, and number
              </p>
            </motion.div>

            <motion.div variants={item} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={item} className="flex items-center my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="px-3 text-xs font-medium text-slate-400">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </motion.div>

          {/* Google Button */}
          <motion.div variants={item}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white font-semibold text-xs text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
            >
              <FcGoogle size={18} />
              <span>Continue with Google</span>
            </button>
          </motion.div>

          {/* Login Link */}
          <motion.p variants={item} className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
