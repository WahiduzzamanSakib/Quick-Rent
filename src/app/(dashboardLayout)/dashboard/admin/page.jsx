"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiCheckCircle,
  FiActivity,
  FiLayers,
  FiUsers,
  FiKey,
} from "react-icons/fi";
import Link from "next/link";
import { EditProfileModal } from "@/components/modal/EditProfile";

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AdminProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loader" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200">
        <p className="text-sm text-slate-500">Please log in to access the administrator panel.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">Platform governance, user management, and system credentials</p>
      </motion.div>

      {/* Main Profile Header Card */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs"
      >
        <div className="h-28 sm:h-32 bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-700 w-full" />

        <div className="p-6 pt-0 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5 text-center sm:text-left">
          <div className="relative -mt-14 sm:-mt-16 flex z-10">
            <img
              src={
                user.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "Admin"
                )}&background=7c3aed&color=fff&bold=true`
              }
              alt={user.name || "Admin"}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-4 ring-white bg-white shadow-xl"
            />
          </div>

          <div className="mt-4 sm:mt-6 flex-1 min-w-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:pb-1">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                {user.name}
              </h2>
              <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                <FiShield className="text-xs" />
                Administrator
              </div>
            </div>

            <div className="shrink-0">
              <EditProfileModal user={user} />
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6 sm:p-8 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Administrator Credentials
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-base">
                <FiMail />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-base">
                <FiCheckCircle />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Access Scope</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">Full Marketplace Authority</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Nav Shortcuts for Admin */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/admin/users"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform">
            <FiUsers size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Manage Users</h4>
            <p className="text-xs text-slate-400">Review roles and accounts</p>
          </div>
        </Link>

        <Link
          href="/dashboard/admin/properties"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:scale-105 transition-transform">
            <FiLayers size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">All Properties</h4>
            <p className="text-xs text-slate-400">Approve or reject listings</p>
          </div>
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
            <FiActivity size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Transactions</h4>
            <p className="text-xs text-slate-400">Monitor booking revenues</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfilePage;
