"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  FiUser, 
  FiMail, 
  FiShield, 
  FiCheckCircle, 
  FiXCircle, 
  FiEdit3, 
  FiActivity 
} from "react-icons/fi"; 
import Image from "next/image";



const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-500 dark:text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  
  const avatarPlaceholder = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || "User")}`;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 text-gray-800 dark:text-gray-100"
    >
 
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md"
      >
        <div className="h-28 sm:h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full" />
        
       
        <div className="p-6 pt-0 flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5 text-center sm:text-left">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative -mt-14 sm:-mt-16 flex z-10"
          >
            <Image
              src={user.image || avatarPlaceholder}
              alt={user.name || "User Avatar"}
              width={112} 
              height={112} 
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-900 bg-white shadow-xl"
            />
          </motion.div>
          
          <div className="mt-4 sm:mt-6 flex-1 min-w-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 sm:pb-1">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                {user.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/50 uppercase tracking-wider">
                <FiShield className="text-xs" />
                {user.role || "user"}
              </div>
            </div>
            
            <div className="flex flex-col justify-stretch w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors shadow-sm w-full sm:w-auto"
              >
                <FiEdit3 className="text-gray-500 dark:text-gray-400" />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
       
        <motion.div 
          variants={itemVariants}
          className="md:col-span-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-md"
        >
          <h3 className="font-bold text-lg flex items-center justify-center sm:justify-start gap-2">
            <FiActivity className="text-indigo-500" /> Account Status
          </h3>
          
          <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Email Verified</span>
              {user.emailVerified ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <FiCheckCircle /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                  <FiXCircle /> Unverified
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Account Status</span>
              {user.isBlocked ? (
                <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 font-medium uppercase tracking-wider">
                  Blocked
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 uppercase tracking-wider">
                  Active
                </span>
              )}
            </div>
          </div>
        </motion.div>

       
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-md space-y-6"
        >
          <h3 className="font-bold text-lg text-center sm:text-left">Personal Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-850 text-gray-500">
                <FiUser className="text-lg text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Full Name</p>
                <p className="text-sm font-semibold mt-0.5">{user.name}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 min-w-0 w-full">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-850 text-gray-500">
                <FiMail className="text-lg text-purple-500" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold mt-0.5 truncate w-full">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:col-span-2 w-full">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-850 text-gray-500">
                <FiShield className="text-lg text-pink-500" />
              </div>
              <div className="w-full">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">User Account ID</p>
                <p className="text-xs font-mono bg-gray-50 dark:bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 mt-1 select-all break-all">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProfilePage;