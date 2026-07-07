'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { HiStar } from 'react-icons/hi2';

export default function TestimonialsSection() {
    const [data, setData] = useState([]);
    const controls = useAnimation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/single-properties/review`
                );

                const result = await res.json();
                const reviews = Array.isArray(result)
                    ? result
                    : result?.reviews || [];

                setData(reviews);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const duplicatedData = useMemo(() => {
        if (!data.length) return [];
        return [...data, ...data];
    }, [data]);

    useEffect(() => {
        if (!data.length) return;

        controls.start({
            x: ['0%', '-50%'],
            transition: {
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
            }
        });
    }, [data, controls]);

    const pauseAnimation = () => controls.stop();

    const resumeAnimation = () => {
        if (!data.length) return;

        controls.start({
            x: ['0%', '-50%'],
            transition: {
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
            }
        });
    };

    return (
        <section className="bg-slate-50 py-20 overflow-hidden w-full select-none">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    What Our Guests Say
                </h2>
            </div>

            <div className="relative flex w-full overflow-hidden">
                <motion.div
                    className="flex gap-6 pr-6 whitespace-nowrap"
                    animate={controls}
                    initial={{ x: '0%' }}
                    onMouseEnter={pauseAnimation}
                    onMouseLeave={resumeAnimation}
                >
                    {duplicatedData.map((item, idx) => (
                        <div
                            key={`${item?._id || idx}-${idx}`}
                            className="inline-flex flex-col justify-between w-[380px] sm:w-[450px] bg-indigo-50/60 border border-indigo-100/40 p-8 rounded-2xl whitespace-normal transition-all duration-300 hover:shadow-lg hover:bg-indigo-50"
                        >
                            <div>
                                {/* ⭐ Rating */}
                                <div className="flex gap-1 mb-2">
                                    {[...Array(item?.rating || 0)].map((_, i) => (
                                        <HiStar
                                            key={i}
                                            className="w-5 h-5 text-cyan-600 fill-cyan-600"
                                        />
                                    ))}
                                </div>

                               
                                <p className="text-slate-600 italic font-medium leading-relaxed mb-8">
                                    &ldquo;{item?.review}&rdquo;
                                </p>
                            </div>

                           
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src={item?.reviewerImage || '/placeholder.png'}
                                        alt={item?.reviewerName || 'User'}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border border-indigo-200"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">
                                        {item?.reviewerName}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {item?.reviewerEmail}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {item?.createdAt ? item.createdAt.split('T')[0] : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}