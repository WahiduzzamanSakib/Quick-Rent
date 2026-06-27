
import { Link } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const DashboardLayout = ({ children }) => {
   
    return (
        <div className="min-h-screen flex gap-4">
            <aside className="w-72 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shrink-0">
                <div>
                    <Link herf="/" className="flex items-center gap-2 shrink-0">
                        <Image src="/quickrent.png" alt="QuickRent Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-black">QuickRent</span>
                    </Link>
                </div>
            </aside>


            <div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;