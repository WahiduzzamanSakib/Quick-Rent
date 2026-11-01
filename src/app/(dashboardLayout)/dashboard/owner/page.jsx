"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FaDollarSign, FaHome, FaClipboardList, FaChartLine } from "react-icons/fa";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiPlus, FiArrowRight } from "react-icons/fi";

const OwnerOverviewPage = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalProperties: 0,
    totalBookings: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/overview/${session?.user?.email}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalEarnings: data.totalEarnings || 0,
          totalProperties: data.totalProperties || 0,
          totalBookings: data.totalBookings || 0,
        });
        setChartData(data.chartData || []);
      })
      .catch((err) => console.error("Error fetching owner overview:", err))
      .finally(() => setLoading(false));
  }, [session?.user?.email]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Owner Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics for your rental listings, inquiries, and earnings
          </p>
        </div>

        <Link
          href="/dashboard/owner/add-property"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-98"
        >
          <FiPlus />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all flex justify-between items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              ${stats.totalEarnings.toLocaleString()}
            </h2>
            <p className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span>●</span> Verified Stripe settlements
            </p>
          </div>

          <div className="flex h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 items-center justify-center border border-emerald-100 shadow-xs">
            <FaDollarSign size={24} />
          </div>
        </motion.div>

        {/* Total Properties */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all flex justify-between items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Listed Properties
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              {stats.totalProperties}
            </h2>
            <Link
              href="/dashboard/owner/my-properties"
              className="text-[11px] font-medium text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>Manage listings</span>
              <FiArrowRight size={10} />
            </Link>
          </div>

          <div className="flex h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 items-center justify-center border border-blue-100 shadow-xs">
            <FaHome size={24} />
          </div>
        </motion.div>

        {/* Total Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all flex justify-between items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Reservations
            </p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              {stats.totalBookings}
            </h2>
            <Link
              href="/dashboard/owner/booking-requests"
              className="text-[11px] font-medium text-purple-600 hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View requests</span>
              <FiArrowRight size={10} />
            </Link>
          </div>

          <div className="flex h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 items-center justify-center border border-purple-100 shadow-xs">
            <FaClipboardList size={22} />
          </div>
        </motion.div>
      </div>

      {/* Monthly Earnings Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-3xl border border-slate-900 bg-slate-950 p-6 md:p-8 shadow-xl text-white overflow-hidden relative"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xl font-black text-white tracking-tight">
                Monthly Earnings
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Gross reservation revenue generated across past 12 months
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
            <FaChartLine />
            <span>Revenue Trajectory</span>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 15,
                right: 25,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 1.5,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
                formatter={(val) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#10b981"
                strokeWidth={3.5}
                dot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 4.5,
                }}
                activeDot={{
                  r: 7,
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default OwnerOverviewPage;
