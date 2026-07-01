"use client"

import { useState } from "react";
import DashBoardSidebar from "@/components/DashBoardSidebar";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";


const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950">

            <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-30">
                <span className="text-xl font-bold text-black dark:text-white">QuickRent</span>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <FaBars size={20} />
                </button>
            </div>

            <DashBoardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />


            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden"
            >
          
                {children}
               
            </motion.div>
        </div>
    );
};

export default DashboardLayout;