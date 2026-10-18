"use client";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiCalendar, FiShield,} from "react-icons/fi";
import { EditProfileModal } from "@/components/modal/EditProfile";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please sign in</h2>
          <p className="mt-2 text-gray-500">
            Sign in to view your profile.
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
    : "Not available";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=random`
                }
                alt={user.name || "User"}
                className="h-28 w-28 rounded-full border-4 border-white/70 bg-white object-cover shadow-lg"
              />

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                  {user.name || "User"}
                </h1>

                <p className="mt-2 break-all text-sm text-white/80">
                  {user.email}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                  <FiShield />
                  <span>
                    {user.role || "user"}
                      
                  </span>
                </div>
              </div>

              {/* Functional Edit Profile Modal */}
              <div className="mt-2 sm:mt-0">
                <EditProfileModal user={user} />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Personal Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
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
                label="Email Verification"
                value={
                  user.emailVerified ? "Verified" : "Not verified"
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-4 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}