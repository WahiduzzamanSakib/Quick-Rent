"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const AllTransactionsPage = () => {
    const { data: session } = authClient.useSession();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/all-properties/booking`,
                );

                const data = await res.json();

                setProperties(Array.isArray(data) ? data : [data]);

            } catch (err) {
                console.error("Failed to fetch properties:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [session]);


    const totalBookings = properties.length;

    const totalRent = properties.reduce(
        (sum, property) => sum + Number(property?.totalRent || 0),
        0
    );


    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center min-h-[300px]"
            >
                <div className="loader"></div>
            </motion.div>
        );
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 max-w-7xl mx-auto"
        >

            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl sm:text-2xl font-bold mb-6"
            >
                All Transactions
            </motion.h1>



            <div className="grid grid-cols-2 gap-5 mb-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white shadow-lg rounded-2xl p-6 border"
                >
                    <p className="text-gray-500 text-sm font-medium">
                        Total Bookings
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-blue-600">
                        {totalBookings}
                    </h2>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white shadow-lg rounded-2xl p-6 border"
                >
                    <p className="text-gray-500 text-sm font-medium">
                        Total Rent
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-green-600">
                        ${totalRent}
                    </h2>
                </motion.div>

            </div>



            {properties.length === 0 ? (

                <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-center text-gray-500 py-10"
                >
                    No Transactions found.
                </motion.p>

            ) : (

                <>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">

                        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">

                            <thead className="bg-gray-100">
                                <tr>
                                    {[
                                        "Title",
                                        "Booking ID",
                                        "Total Days",
                                        "Rent",
                                        "Payment Status",
                                        "Booking Status"
                                    ].map((item) => (
                                        <th
                                            key={item}
                                            className="text-left p-4 text-sm font-semibold"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>


                            <tbody>

                                {properties.map((property, index) => (

                                    <motion.tr
                                        key={property._id}
                                        initial={{
                                            opacity: 0,
                                            y: 30
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            delay: index * 0.1
                                        }}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="p-4 font-semibold">
                                            {property?.propertyTitle}
                                        </td>

                                        <td className="p-4 text-gray-600 break-all">
                                            {property?.paymentIntent}
                                        </td>


                                        <td className="p-4 font-bold">
                                            {property?.totalDays}  Days
                                        </td>

                                        <td className="p-4 text-green-600 font-bold">
                                            ${property?.totalRent}
                                        </td>


                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${property?.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {property?.paymentStatus}
                                            </span>
                                        </td>


                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${property?.bookingStatus === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : property?.bookingStatus === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {property?.bookingStatus}
                                            </span>
                                        </td>

                                    </motion.tr>

                                ))}

                            </tbody>

                        </table>

                    </div>



                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">

                        {properties.map((property, index) => (

                            <motion.div
                                key={property._id}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                                className="bg-white shadow rounded-xl p-4 space-y-3"
                            >

                                <h2 className="font-bold text-lg">
                                    {property?.propertyTitle}
                                </h2>



                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Booking ID:
                                    </span>

                                    <p className="text-gray-500 break-all">
                                        {property?.paymentIntent}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex justify-between">
                                        <span className="font-semibold mr-1">
                                            Days:
                                        </span>

                                        <span className="font-bold text-green-600">
                                            {property?.totalDays}
                                        </span>
                                    </div>



                                    <div className="flex justify-between">

                                        <span className="font-semibold mr-1">
                                            Rent:
                                        </span>

                                        <span className="font-bold text-green-600">
                                            $ {property?.totalRent}
                                        </span>
                                    </div>
                                </div>



                                <div className="flex justify-between">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            Payment:  
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${property?.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {property?.paymentStatus}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="font-semibold">
                                            Booking:  
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${property?.bookingStatus === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : property?.bookingStatus === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {property?.bookingStatus}
                                        </span>
                                    </div>
                                </div>


                            </motion.div>

                        ))}

                    </div>

                </>
            )}

        </motion.div>
    );
};

export default AllTransactionsPage;