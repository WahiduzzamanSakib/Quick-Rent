"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function HeroBanner() {
    // Animation variants for smooth text and bar entry
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <section
            className="relative mx-auto min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')`
            }}
        >

            <div className="absolute inset-0 bg-[#3A4350]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3540]/80 via-transparent to-transparent" />


            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl w-full"
            >

                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight"
                >
                    Find Your Perfect <br />
                    <span className="text-[#10B981]">Stay.</span>
                </motion.h1>


                <motion.p
                    variants={fadeInUp}
                    className="mt-6 text-[#BAC5D1] max-w-xl text-base sm:text-lg font-sans font-light leading-relaxed"
                >
                    Discover a curated collection of premier properties designed for exceptional living.
                    From modern urban retreats to serene coastal escapes, find your perfect stay.
                </motion.p>


                <motion.div
                    variants={fadeInUp}
                    className="mt-12 bg-white mx-auto rounded-2xl p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end max-w-4xl"
                >

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase font-sans">Location</label>
                        <div className="relative flex items-center">
                            <HiOutlineMapPin className="absolute left-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                className="w-full bg-[#EBF1FA] text-[#0A1E36] font-sans text-sm pl-10 pr-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 transition"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase font-sans">
                            Type
                        </label>

                        <select
                            defaultValue=""
                            className="w-full bg-[#EBF1FA] text-[#0A1E36] font-sans text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 transition appearance-none cursor-pointer"
                        >
                            <option value="" disabled>
                                All Types
                            </option>
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Resort">Resort</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase font-sans">Min Price</label>
                        <input
                            type="text"
                            placeholder="$0"
                            className="w-full bg-[#EBF1FA] text-[#0A1E36] font-sans text-sm px-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 transition"
                        />
                    </div>


                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase font-sans">Max Price</label>
                        <input
                            type="text"
                            placeholder="$10k+"
                            className="w-full bg-[#EBF1FA] text-[#0A1E36] font-sans text-sm px-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 transition"
                        />
                    </div>


                    <button
                        type="button"
                        className="w-full bg-black hover:bg-gray-900 text-white font-sans font-semibold text-sm py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-transform active:scale-95 duration-150 h-[46px]"
                    >
                        <HiOutlineMagnifyingGlass className="w-4 h-4 stroke-[2.5]" />
                        <span>Search</span>
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}