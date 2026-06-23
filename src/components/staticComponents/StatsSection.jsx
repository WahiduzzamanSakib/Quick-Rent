'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
    HiOutlineBuildingOffice, 
    HiOutlineUsers, 
    HiOutlineCheckCircle 
} from 'react-icons/hi2';


const STATS_DATA = [
    {
        id: 1,
        value: 10,
        suffix: 'k+',
        label: 'Premium Properties',
        icon: HiOutlineBuildingOffice,
    },
    {
        id: 2,
        value: 50,
        suffix: 'k+',
        label: 'Happy Tenants',
        icon: HiOutlineUsers,
    },
    {
        id: 3,
        value: 98,
        suffix: '%',
        label: 'Satisfaction Rate',
        icon: HiOutlineCheckCircle,
    },
];


const ANIMATION_CONFIG = {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
};


function AnimatedCounter({ value, suffix }) {
    const elementRef = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, ANIMATION_CONFIG);
    const isInView = useInView(elementRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (elementRef.current) {
                elementRef.current.textContent = Intl.NumberFormat('en-US').format(
                    Math.floor(latest)
                );
            }
        });
    }, [springValue]);

    return (
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white tabular-nums z-10">
            <span ref={elementRef}>0</span>
            <span className="text-cyan-400 ml-0.5">{suffix}</span>
        </span>
    );
}

function StatCard({ stat, itemVariants }) {
    const Icon = stat.icon;
    const cardRef = useRef(null);
    
   
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
   
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
    
    // Transform coordinates into degrees of rotation
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
      
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        
        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.02, z: 20 }}
            className="flex flex-col items-center justify-center p-8 sm:p-10 group relative transition-colors duration-300 hover:bg-slate-900/40 cursor-default"
        >
          
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

            <div 
                className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 z-10"
                style={{ transform: "translateZ(30px)" }}
                aria-hidden="true"
            >
                <Icon className="w-5 h-5" />
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="flex flex-col items-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>

            <p 
                style={{ transform: "translateZ(20px)" }}
                className="mt-3 text-xs font-semibold tracking-widest text-slate-400 uppercase transition-colors duration-300 group-hover:text-slate-200 z-10"
            >
                {stat.label}
            </p>
        </motion.div>
    );
}

export default function StatsSection() {
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 24 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: 'spring', stiffness: 80, damping: 16 } 
        }
    }), []);

    return (
        <section className="relative bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-slate-900">
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none select-none" 
                aria-hidden="true" 
            />

            <div className="max-w-6xl mx-auto">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 bg-slate-900/30 backdrop-blur-sm border border-slate-900 rounded-2xl divide-y md:divide-y-0 md:divide-x divide-slate-900/80 shadow-2xl overflow-hidden"
                >
                    {STATS_DATA.map((stat) => (
                        <StatCard key={stat.id} stat={stat} itemVariants={itemVariants} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}