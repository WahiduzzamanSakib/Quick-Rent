"use client"

import DashBoardSidebar from "@/components/DashBoardSidebar";

const DashboardLayout = ({ children }) => {
   


    return (
        <div className="min-h-screen flex gap-4 ">
           <DashBoardSidebar/>
            <div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;