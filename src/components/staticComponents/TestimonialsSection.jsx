'use client';

import React, { useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { HiStar } from 'react-icons/hi2';

const TESTIMONIALS_DATA = [
    {
        id: 1,
        stars: 5,
        text: "The level of service and the quality of the property in London exceeded all expectations. StayFound is my only choice for business travel now.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        name: "James Carrington",
        role: "CEO, TechVanguard"
    },
    {
        id: 2,
        stars: 5,
        text: "Seamless booking process and absolute transparency. The villa in Santorini was exactly as pictured - breathtaking.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        name: "Elena Rodriguez",
        role: "Interior Architect"
    },
    {
        id: 3,
        stars: 5,
        text: "An absolute luxury experience from start to finish. The concierge team handled everything flawlessly. Will absolutely book again.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        name: "Marcus Chen",
        role: "Managing Director"
    },
    {
        id: 4,
        stars: 5,
        text: "Finding premium rentals that actually cater to remote executives is tough. This platform nailed it. High-speed internet and pristine spaces.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        name: "Sarah Jenkins",
        role: "Operations VP"
    }
];

export default function TestimonialsSection() {
    const controls = useAnimation();
    const duplicatedData = useMemo(
        () => [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA],
        []
    );

    const startAnimation = async () => {
        controls.start({
            x: ['0%', '-50%'],
            transition: {
                ease: 'linear',
                duration: 25,
                repeat: Infinity,
            }
        });
    };

    const stopAnimation = () => {
        controls.stop(); // instantly pause
    };

    return (
        <section className="bg-slate-50 py-20 overflow-hidden w-full select-none">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    What Our Guests Say
                </h2>
            </div>

            <div className="relative flex w-full overflow-hidden">
                <motion.div
                    className="flex gap-6 pr-6 whitespace-nowrap"
                    animate={controls}
                    onMouseEnter={stopAnimation}
                    onMouseLeave={startAnimation}
                    initial={{
                        x: '0%'
                    }}
                >
                    {duplicatedData.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className="inline-flex flex-col justify-between w-[380px] sm:w-[450px] bg-indigo-50/60 border border-indigo-100/40 p-8 rounded-2xl whitespace-normal transition-all duration-300 hover:shadow-lg hover:bg-indigo-50"
                        >
                            <div>
                                <div className="flex gap-1 mb-5">
                                    {[...Array(item.stars)].map((_, i) => (
                                        <HiStar key={i} className="w-5 h-5 text-cyan-600 fill-cyan-600" />
                                    ))}
                                </div>

                                <p className="text-slate-600 italic font-medium leading-relaxed mb-6">
                                    &ldquo;{item.text}&rdquo;
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border border-indigo-200"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}