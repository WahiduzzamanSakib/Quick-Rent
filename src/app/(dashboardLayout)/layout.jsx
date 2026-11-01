"use client";

import { useState } from "react";
import DashBoardSidebar from "@/components/DashBoardSidebar";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const role = session?.user?.role?.toLowerCase();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Mobile Top Navbar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 p-1">
            <Image
              src="/quickrent.png"
              alt="QuickRent Logo"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Quick<span className="text-blue-600">Rent</span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {session?.user && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {role || "user"}
              </span>
              <div className="relative h-7 w-7 rounded-full overflow-hidden ring-1 ring-blue-500/20">
                <Image
                  src={
                    session?.user?.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      session?.user?.name || "User"
                    )}&background=2563eb&color=fff&bold=true`
                  }
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <FaBars size={18} />
          </button>
        </div>
      </header>

      {/* Main Sidebar */}
      <DashBoardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
