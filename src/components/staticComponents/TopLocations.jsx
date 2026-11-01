'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';
import Link from 'next/link';

const locations = [
  {
    id: 1,
    name: 'London',
    country: 'United Kingdom',
    properties: '1,240 Properties',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    className: 'md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[460px]',
  },
  {
    id: 2,
    name: 'New York',
    country: 'United States',
    properties: '850 Properties',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-2 min-h-[200px] md:min-h-[218px]',
  },
  {
    id: 3,
    name: 'Tokyo',
    country: 'Japan',
    properties: '630 Properties',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-1 min-h-[200px] md:min-h-[218px]',
  },
  {
    id: 4,
    name: 'Paris',
    country: 'France',
    properties: '920 Properties',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    className: 'md:col-span-1 min-h-[200px] md:min-h-[218px]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function TopLocations() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Global Destinations
          </span> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Explore Top Locations
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mt-2">
            The world's most sought-after rental destinations and thriving metropolitan hubs.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              variants={itemVariants}
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 ${loc.className}`}
            >
              <Link href={`/properties?location=${encodeURIComponent(loc.name)}`} className="block w-full h-full">
                {/* Background Image */}
                <motion.div
                  variants={{
                    hover: { scale: 1.06 },
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>

                {/* Dark Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent transition-opacity group-hover:from-slate-950/90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10">
                  <div className="self-end">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-xs">
                      {loc.properties}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-300 font-medium">
                      <HiOutlineMapPin />
                      <span>{loc.country}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                      {loc.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
