"use client"

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaMoneyCheckAlt, FaHeart, FaUserCircle, FaChartLine, FaUsersCog, FaPlus, FaClipboardList,
    FaCalendarCheck, FaUser, FaChartPie, FaClipboardCheck, FaBuilding, FaUserShield, FaTimes
} from 'react-icons/fa';

const DashBoardSidebar = ({ isOpen, setIsOpen }) => {
    const { data: session } = authClient.useSession();

    // Owner Dashboard Menu
    const ownerMenu = [
        { key: "overview", label: "Dashboard", icon: FaChartLine, href: "/dashboard/owner", },
        { key: "add-property", label: "Add Property", icon: FaPlus, href: "/dashboard/owner/add-property", },
        { key: "my-properties", label: "My Properties", icon: FaHome, href: "/dashboard/owner/my-properties", },
        { key: "booking-requests", label: "Booking Requests", icon: FaClipboardList, href: "/dashboard/owner/booking-requests", },
        { key: "profile", label: "Profile", icon: FaUserCircle, href: "/dashboard/profile", },
    ];

    // Tenant Dashboard Menu
    const tenantMenu = [
        { key: "overview", label: "Profile", icon: FaUser, href: "/dashboard/tenant", },
        { key: "bookings", label: "My Bookings", icon: FaCalendarCheck, href: "/dashboard/tenant/my-bookings", },
        { key: "favorites", label: "Favorites", icon: FaHeart, href: "/dashboard/tenant/favorites", },
    ];

    // Admin Dashboard Menu
    const adminMenu = [
        { key: "overview", label: "Profile", icon: FaUserShield, href: "/dashboard/admin", },
        { key: "users", label: "All Users", icon: FaUsersCog, href: "/dashboard/admin/users", },
        { key: "properties", label: "All Properties", icon: FaBuilding, href: "/dashboard/admin/properties", },
        { key: "bookings", label: "All Bookings", icon: FaClipboardCheck, href: "/dashboard/admin/bookings", },
        { key: "transactions", label: "Transactions", icon: FaMoneyCheckAlt, href: "/dashboard/admin/transactions", },
    ];


    const role = session?.user?.role?.toLowerCase();
    const menuItems = role === "owner" ? ownerMenu : role === "tenant" ? tenantMenu : role === "admin" ? adminMenu : null;


    const sidebarVariants = {
        open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
    };

    const SidebarContent = () => (
        <div className="h-full flex flex-col bg-slate-950/95 backdrop-blur-xl border-r border-white/5">

            <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image src="/quickrent.png" alt="QuickRent Logo" width={40} height={40} />
                    <span className="text-2xl font-bold text-white">QuickRent</span>
                </Link>

                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-white/5"
                >
                    <FaTimes size={18} />
                </button>
            </div>

            {/* User Profile */}
            <div className="px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                        <Image
                            width={44}
                            height={44}
                            src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=7c3aed&color=fff&bold=true`}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-white text-sm font-bold truncate leading-tight">
                            {session?.user?.name || "Loading..."}
                        </p>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "owner" ? "text-indigo-400" : "text-pink-400"}`}>
                            {role || "guest"}
                        </span>
                    </div>
                </div>
            </div>


            <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 pb-2">
                    Navigation
                </p>

                {menuItems?.map(({ key, label, icon: Icon, href }) => (
                    <Link
                        key={key}
                        href={href}
                        onClick={() => setIsOpen(false)} // Mobile-এ ক্লিক করলে সাইডবার বন্ধ হবে
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-slate-400 hover:text-white hover:bg-white/5"
                    >
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-slate-400">
                            <Icon size={18} />
                        </span>
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>


            <div className="px-3 py-2 border-t border-white/5 space-y-1 mb-3">
                <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <FaHome size={13} />
                    </span>
                    Back to Site
                </Link>
            </div>
        </div>
    );

    return (
        <>

            <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 overflow-hidden z-40">
                <SidebarContent />
            </aside>


            <AnimatePresence>
                {isOpen && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />


                        <motion.aside
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                            className="fixed inset-y-0 left-0 w-72 h-full z-50 lg:hidden"
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