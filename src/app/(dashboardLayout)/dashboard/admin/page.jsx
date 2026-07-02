"use client"
import {
    Card
} from "@heroui/react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    FaDollarSign,
    FaHome,
    FaClipboardList,
    FaChartLine,
} from "react-icons/fa";

const OwnerOverviewPage = () => {
    const stats = {
        totalEarnings: 25840,
        totalProperties: 18,
        totalBookings: 143,
    };

    const chartData = [
        { month: "Jan", earnings: 1200 },
        { month: "Feb", earnings: 1700 },
        { month: "Mar", earnings: 2100 },
        { month: "Apr", earnings: 2600 },
        { month: "May", earnings: 2400 },
        { month: "Jun", earnings: 3100 },
        { month: "Jul", earnings: 3900 },
        { month: "Aug", earnings: 3600 },
        { month: "Sep", earnings: 4300 },
        { month: "Oct", earnings: 4700 },
        { month: "Nov", earnings: 5200 },
        { month: "Dec", earnings: 6100 },
    ];

    return (
        <div className="space-y-6 mt-6">

            <div>
                <h2 className="text-2xl font-bold text-gray-500">Overview</h2>
                <p className="text-sm text-gray-400 mt-1">Overview of your account</p>
            </div>


            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Earnings */}

                <Card className="glass bg-gray-300 border-white/5">
                    <div className="p-6 flex justify-between items-center">

                        <div>
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Total Earnings
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-500 mt-2">
                                ${stats.totalEarnings.toLocaleString()}
                            </h2>
                        </div>

                        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                            <FaDollarSign size={24} />
                        </div>

                    </div>
                </Card>

                {/* Properties */}

                <Card className="glass bg-gray-300 border-white/5">
                    <div className="p-6 flex justify-between items-center">

                        <div>
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Total Properties
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-500 mt-2">
                                {stats.totalProperties}
                            </h2>
                        </div>

                        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                            <FaHome size={24} />
                        </div>

                    </div>
                </Card>

                {/* Bookings */}

                <Card className="glass bg-gray-300 border-white/5">
                    <div className="p-6 flex justify-between items-center">

                        <div>
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                Total Bookings
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-500 mt-2">
                                {stats.totalBookings}
                            </h2>
                        </div>

                        <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                            <FaClipboardList size={20} />
                        </div>

                    </div>
                </Card>

            </div>

            {/* Monthly Earnings Chart */}

            <Card
                className="glass border border-white/10 bg-gradient-to-br from-slate-500 via-slate-500/95 to-slate-800/90 shadow-xl"
                radius="lg"
            >
                <div className="p-6 md:p-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Monthly Earnings
                            </h2>

                            <p className="text-sm text-slate-400 mt-1">
                                Revenue generated over the last 12 months
                            </p>
                        </div>

                        <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <FaChartLine className="text-green-400 text-2xl" />
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[360px] rounded-2xl bg-slate-900/40 border border-white/5 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    stroke="#1e293b"
                                    strokeDasharray="4 4"
                                />

                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#94A3B8", fontSize: 13 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    tick={{ fill: "#94A3B8", fontSize: 13 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    cursor={{
                                        stroke: "#22c55e",
                                        strokeWidth: 1,
                                    }}
                                    contentStyle={{
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        borderRadius: "14px",
                                        color: "#fff",
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#22c55e"
                                    strokeWidth={4}
                                    dot={{
                                        fill: "#22c55e",
                                        stroke: "#fff",
                                        strokeWidth: 2,
                                        r: 5,
                                    }}
                                    activeDot={{
                                        r: 8,
                                        fill: "#22c55e",
                                        stroke: "#fff",
                                        strokeWidth: 3,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default OwnerOverviewPage;