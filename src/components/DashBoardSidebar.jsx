
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    FaHome, FaMoneyCheckAlt, FaHeart, FaUserCircle, FaChartLine, FaUsersCog, FaPlus, FaClipboardList,
    FaCalendarCheck, FaUser, FaChartPie, FaClipboardCheck, FaBuilding, FaUserShield
} from 'react-icons/fa';

const DashBoardSidebar = ({ children }) => {
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
        { key: "overview", label: "Dashboard", icon: FaUserCircle, href: "/dashboard/tenant", },
        { key: "bookings", label: "My Bookings", icon: FaCalendarCheck, href: "/dashboard/tenant/bookings", },
        { key: "favorites", label: "Favorites", icon: FaHeart, href: "/dashboard/tenant/favorites", },
        { key: "profile", label: "Profile", icon: FaUser, href: "/dashboard/profile", },
    ];

    // Admin Dashboard Menu
    const adminMenu = [
        { key: "overview", label: "Dashboard", icon: FaChartPie, href: "/dashboard/admin", },
        { key: "users", label: "All Users", icon: FaUsersCog, href: "/dashboard/admin/users", },
        { key: "properties", label: "All Properties", icon: FaBuilding, href: "/dashboard/admin/properties", },
        { key: "bookings", label: "All Bookings", icon: FaClipboardCheck, href: "/dashboard/admin/bookings", },
        { key: "transactions", label: "Transactions", icon: FaMoneyCheckAlt, href: "/dashboard/admin/transactions", },
        { key: "profile", label: "Profile", icon: FaUserShield, href: "/dashboard/profile", },
    ];



    const role = session?.user?.role?.toLowerCase();
    
    const manuItems = role === "owner" ? ownerMenu : role === "tenant" ? tenantMenu : role === "admin" ? adminMenu : null;


    return (
        <div className="min-h-screen flex gap-4 ">
            <aside className="w-72 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shrink-0">
                <div>
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image src="/quickrent.png" alt="QuickRent Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-black">QuickRent</span>
                    </Link>
                </div>

                <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">

                    {/* User Profile */}
                    <div className="px-6 py-5 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                                <Image
                                    width={44}
                                    height={44}
                                    src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`}
                                    alt="Avatar"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-bold truncate leading-tight">
                                    {session?.user?.name}
                                </p>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "owner" ? "text-indigo-400" : "text-pink-400"}`}>
                                    {role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
                            Navigation
                        </p>

                        {manuItems?.map(({ key, label, icon: Icon, href }) => (
                            <Link
                                key={key}
                                href={href}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer text-slate-400 hover:text-white hover:bg-white/5"
                            >
                                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-slate-400">
                                    <Icon size={20} />
                                </span>
                                <span>{label}</span>
                            </Link>
                        ))}


                    </nav>
                    {/* Bottom Links */}
                    <div className="px-3 py-2 border-t border-white/5 space-y-1 mb-3">
                        <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150">
                            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                <FaHome size={13} />
                            </span>
                            Back to Site
                        </Link>

                    </div>
                </div>
            </aside>

        </div>
    );
};

export default DashBoardSidebar;