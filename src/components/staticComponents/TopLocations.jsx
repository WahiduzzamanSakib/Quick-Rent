'use client'; // Required for Next.js App Router since we are using Framer Motion

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const locations = [
    {
        id: 1,
        name: 'London',
        properties: '1,240 Properties',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3yMKb1VIbRcHVHkvXDpU_j9iaEkpJEr2HA&s',
        className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[520px]',
    },
    {
        id: 2,
        name: 'New York',
        properties: '850 Properties',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
        className: 'md:col-span-2 h-[190px] md:h-[244px]',
    },
    {
        id: 3,
        name: 'Tokyo',
        properties: '630 Properties',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        className: 'md:col-span-1 h-[190px] md:h-[252px]',
    },
    {
        id: 4,
        name: 'Paris',
        properties: '920 Properties',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        className: 'md:col-span-1 h-[190px] md:h-[252px]',
    },
];


const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Delay between each item appearing
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
};

export default function TopLocations() {
    return (
        <section className="bg-[#f8faff] -z-50 py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
            <div className="max-w-6xl mx-auto -z-50">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e293b] mb-3">
                        Explore Top Locations
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                        The world's most sought-after destinations at your fingertips.
                    </p>
                </div>

                {/* Animated Bento Grid Wrapper */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }} // Triggers once when scrolled into view
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 -z-50"
                >
                    {locations.map((loc) => (
                        <motion.div
                            key={loc.id}
                            variants={itemVariants}
                            whileHover="hover" // Syncs hover states across child components
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 ${loc.className}`}
                        >

                            <motion.div
                                variants={{
                                    hover: { scale: 1.05 }
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={loc.image}
                                    alt={loc.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={loc.id === 1}
                                    className="object-cover"
                                />
                            </motion.div>


                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                            {/* Text Content Overlay */}
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-20">
                                <h3 className="text-xl md:text-2xl font-bold tracking-wide mb-1 drop-shadow-md">
                                    {loc.name}
                                </h3>
                                <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-300 font-medium">
                                    <HiOutlineBuildingOffice2 className="w-4 h-4 text-amber-400" />
                                    <span>{loc.properties}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}