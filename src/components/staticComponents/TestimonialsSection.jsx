'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { HiStar } from 'react-icons/hi2';
import { GiveFeedbackModal } from '../modal/GiveFeedbackModal';
import { FiMessageSquare } from 'react-icons/fi';

export default function TestimonialsSection() {
  const [data, setData] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/single-properties/review`,
          {
            cache: 'no-store',
          }
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
        duration: 35,
        repeat: Infinity,
      },
    });
  }, [data, controls]);

  const pauseAnimation = () => controls.stop();

  const resumeAnimation = () => {
    if (!data.length) return;

    controls.start({
      x: ['0%', '-50%'],
      transition: {
        ease: 'linear',
        duration: 35,
        repeat: Infinity,
      },
    });
  };

  return (
    <section id="reviews" className="scroll-mt-24 bg-slate-50/70 border-t border-slate-200/80 py-16 overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Real Tenant Experiences
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          What Our Community Says
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mt-2">
          Read genuine reviews from registered renters and verified property owners.
        </p>
      </div>

      {data.length > 0 ? (
        <div className="relative flex w-full overflow-hidden py-4">
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
                className="inline-flex flex-col justify-between w-[340px] sm:w-[420px] bg-white border border-slate-200/80 p-6 rounded-2xl whitespace-normal shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < (Number(item?.rating) || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal line-clamp-4">
                    &ldquo;{item?.review}&rdquo;
                  </p>
                </div>

                {/* Reviewer Meta */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/20 bg-slate-100">
                    <img
                      src={
                        item?.reviewerImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item?.reviewerName || 'User'
                        )}&background=2563eb&color=fff&bold=true`
                      }
                      alt={item?.reviewerName || 'Reviewer'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item?.reviewerName || 'Verified Guest'}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item?.reviewerRole || 'Tenant'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">
          No community reviews available yet.
        </div>
      )}

      {/* Give Feedback Action */}
      <div className="flex justify-center pt-8">
        <GiveFeedbackModal />
      </div>
    </section>
  );
}
