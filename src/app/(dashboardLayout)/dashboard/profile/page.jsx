"use client";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiCalendar, FiShield, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { EditProfileModal } from "@/components/modal/EditProfile";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center rounded-2xl bg-white border border-slate-200 p-8 max-w-sm w-full shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">Please Sign In</h2>
          <p className="mt-2 text-xs text-slate-500">
            You must be logged in to access and edit your account profile.
          </p>
        </div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Member";

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your personal information and credentials</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs"
      >
        {/* Banner with user info */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row text-center sm:text-left">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden ring-4 ring-white/30 bg-white shadow-xl shrink-0">
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=2563eb&color=fff&bold=true`
                }
                alt={user.name || "User"}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black text-white truncate">
                {user.name || "User"}
              </h2>

              <p className="mt-1 text-xs text-blue-100/90 truncate">
                {user.email}
              </p>

              <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <FiShield />
                <span>{user.role || "Member"}</span>
              </div>
            </div>

            <div className="mt-2 sm:mt-0">
              <EditProfileModal user={user} />
            </div>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="p-6 sm:p-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Personal Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={<FiUser />}
              label="Full Name"
              value={user.name || "Not provided"}
            />

            <InfoCard
              icon={<FiMail />}
              label="Email Address"
              value={user.email || "Not provided"}
            />

            <InfoCard
              icon={<FiCalendar />}
              label="Member Since"
              value={joinedDate}
            />

            <InfoCard
              icon={<FiShield />}
              label="Account Verification"
              value={user.emailVerified ? "Verified Email" : "Active Member"}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 hover:border-blue-200">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-base">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
