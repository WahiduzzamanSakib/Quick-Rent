"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaMoneyCheckAlt,
  FaHeart,
  FaUserCircle,
  FaChartLine,
  FaUsersCog,
  FaPlus,
  FaClipboardList,
  FaCalendarCheck,
  FaUser,
  FaClipboardCheck,
  FaBuilding,
  FaUserShield,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";

const DashBoardSidebar = ({ isOpen, setIsOpen }) => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  // Owner Dashboard Menu
  const ownerMenu = [
    { key: "overview", label: "Dashboard", icon: FaChartLine, href: "/dashboard/owner" },
    { key: "add-property", label: "Add Property", icon: FaPlus, href: "/dashboard/owner/add-property" },
    { key: "my-properties", label: "My Properties", icon: FaHome, href: "/dashboard/owner/my-properties" },
    { key: "booking-requests", label: "Booking Requests", icon: FaClipboardList, href: "/dashboard/owner/booking-requests" },
    { key: "profile", label: "Profile", icon: FaUserCircle, href: "/dashboard/profile" },
  ];

  // Tenant Dashboard Menu
  const tenantMenu = [
    { key: "overview", label: "Profile", icon: FaUser, href: "/dashboard/profile" },
    { key: "bookings", label: "My Bookings", icon: FaCalendarCheck, href: "/dashboard/tenant/my-bookings" },
    { key: "favorites", label: "Favorites", icon: FaHeart, href: "/dashboard/tenant/favorites" },
  ];

  // Admin Dashboard Menu
  const adminMenu = [
    { key: "overview", label: "Profile", icon: FaUserShield, href: "/dashboard/profile" },
    { key: "users", label: "All Users", icon: FaUsersCog, href: "/dashboard/admin/users" },
    { key: "properties", label: "All Properties", icon: FaBuilding, href: "/dashboard/admin/properties" },
    { key: "bookings", label: "All Bookings", icon: FaClipboardCheck, href: "/dashboard/admin/bookings" },
    { key: "transactions", label: "Transactions", icon: FaMoneyCheckAlt, href: "/dashboard/admin/transactions" },
    { key: "allreviews", label: "All Reviews", icon: MdReviews, href: "/dashboard/admin/allreviews" },
  ];

  const role = session?.user?.role?.toLowerCase();
  const menuItems =
    role === "owner"
      ? ownerMenu
      : role === "tenant"
      ? tenantMenu
      : role === "admin"
      ? adminMenu
      : null;

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const isActive = (href) => {
    return pathname === href;
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-slate-950 border-r border-slate-900 text-slate-300">
      {/* Brand Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-900">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 p-1.5 transition-transform group-hover:scale-105">
            <Image
              src="/quickrent.png"
              alt="QuickRent Logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Quick<span className="text-blue-500">Rent</span>
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 transition-colors"
          aria-label="Close menu"
        >
          <FaTimes size={16} />
        </button>
      </div>

      {/* User Profile Card */}
      <div className="px-5 py-4 border-b border-slate-900">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/60 border border-slate-850">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/30 shrink-0">
            <Image
              fill
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  session?.user?.name || "User"
                )}&background=2563eb&color=fff&bold=true`
              }
              alt="Avatar"
              className="object-cover"
            />
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-white text-xs font-bold truncate leading-tight">
              {session?.user?.name || "Loading..."}
            </p>
            <span
              className={`inline-block mt-0.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                role === "admin"
                  ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  : role === "owner"
                  ? "bg-purple-400/10 text-purple-400 border border-purple-400/20"
                  : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
              }`}
            >
              {role || "user"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto px-3.5 py-4 space-y-1">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 pb-2">
          Management
        </p>

        {menuItems?.map(({ key, label, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 text-left ${
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/70"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  active ? "bg-white/20 text-white" : "bg-slate-900 text-slate-400"
                }`}
              >
                <Icon size={14} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation: Back to Site */}
      <div className="px-3.5 py-3 border-t border-slate-900 mb-2">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/70 transition-all"
        >
          <span className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
            <FaArrowLeft size={12} />
          </span>
          <span>Back to Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 overflow-hidden z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            />

            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 w-64 h-full z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashBoardSidebar;
