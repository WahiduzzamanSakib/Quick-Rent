"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FcApprove, FcDisapprove } from "react-icons/fc";

const AllBookingsPage = () => {
    const { data: session } = authClient.useSession();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    useEffect(() => {
        const fetchProperties = async () => {
            if (!session?.user?.email) return;

            try {
                const { data: tokenData } = await authClient.token();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/all-properties/booking`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                        cache: "no-store",
                    }
                );

                const data = await res.json();
                // console.log(data);
                setProperties(Array.isArray(data) ? data : [data]);

            } catch (err) {
                console.error("Failed to fetch properties:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();

    }, [session]);


    const handleBookingStatus = async (id, bookingStatus) => {
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                    body: JSON.stringify({ bookingStatus }),
                }
            );
            const data = await res.json();
            if (data.modifiedCount > 0) {
                setProperties((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? { ...item, bookingStatus }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const bookingStats = useMemo(() => {
        return {
            total: properties.length,

            approved: properties.filter(
                (property) =>
                    property?.bookingStatus === "approved"
            ).length,

            rejected: properties.filter(
                (property) =>
                    property?.bookingStatus === "rejected"
            ).length,

            pending: properties.filter(
                (property) =>
                    property?.bookingStatus === "pending"
            ).length,
        };
    }, [properties]);

    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const paginatedProperties = properties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
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
                All Bookings
            </motion.h1>




            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white shadow rounded-xl p-5 border"
                >
                    <h3 className="text-gray-500 font-semibold">
                        Total Bookings
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {bookingStats.total}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-green-50 shadow rounded-xl p-5 border"
                >
                    <h3 className="text-green-700 font-semibold">
                        Approved
                    </h3>
                    <p className="text-3xl font-bold text-green-700 mt-2">
                        {bookingStats.approved}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-red-50 shadow rounded-xl p-5 border"
                >
                    <h3 className="text-red-700 font-semibold">
                        Rejected
                    </h3>
                    <p className="text-3xl font-bold text-red-700 mt-2">
                        {bookingStats.rejected}
                    </p>
                </motion.div>



                <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-yellow-50 shadow rounded-xl p-5 border"
                >
                    <h3 className="text-yellow-700 font-semibold">
                        Pending
                    </h3>

                    <p className="text-3xl font-bold text-yellow-700 mt-2">
                        {bookingStats.pending}
                    </p>
                </motion.div>


            </div>

            {properties.length === 0 ? (

                <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-center text-gray-500 py-10"
                >
                    No Bookings found.
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
                                        "Booking Date",
                                        "Booking Status",
                                        "Manage",
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
                                {paginatedProperties.map((property, index) => (
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
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4 font-semibold">
                                            {property?.propertyTitle}
                                        </td>


                                        <td className="p-4 text-gray-600 break-all">
                                            {property?.paymentIntent}
                                        </td>


                                        <td className="p-4 font-bold">
                                            {property?.totalDays} Days
                                        </td>


                                        <td className="p-4 text-green-600 font-bold">
                                            ${property?.totalRent}
                                        </td>


                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${property?.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {property?.paymentStatus}
                                            </span>

                                        </td>



                                        <td>
                                            {property?.checkIn}
                                        </td>


                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${property.bookingStatus === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : property.bookingStatus === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {property.bookingStatus}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleBookingStatus(property._id, "approved")
                                                    }
                                                    disabled={property.bookingStatus !== "pending"}
                                                    className={`px-3 py-1 rounded text-white text-xs ${property.bookingStatus === "pending"
                                                        ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <FcApprove size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleBookingStatus(property._id, "rejected")
                                                    }
                                                    disabled={property.bookingStatus !== "pending"}
                                                    className={`px-3 py-1 rounded text-white text-xs ${property.bookingStatus === "pending"
                                                        ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    <FcDisapprove size={20} />

                                                </button>
                                            </div>
                                        </td>


                                    </motion.tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {paginatedProperties.map((property, index) => (
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

                                <p className=" flex justify-between">
                                    <b>Booking ID:</b> {property?.paymentIntent}
                                </p>

                                <div className="flex justify-between">
                                    <p>
                                        <b>Total Days:</b> {property?.totalDays} Days
                                    </p>

                                    <p>
                                        <b>Rent:</b>
                                        <span className="text-green-600 font-bold ml-2">
                                            ${property?.totalRent}
                                        </span>
                                    </p>
                                </div>


                                <div className="flex justify-between">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            Payment Status:
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
                                            Booking Status:
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

                                  <div className="flex items-center justify-end gap-2 pt-2">
                                        <button
                                            onClick={() =>
                                                handleBookingStatus(property._id, "approved")
                                            }
                                            disabled={property.bookingStatus !== "pending"}
                                            className={`flex items-center gap-1 justify-center px-3 py-2 rounded text-white text-xs ${property.bookingStatus === "pending"
                                                    ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                                    : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            <FcApprove size={20} /> Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleBookingStatus(property._id, "rejected")
                                            }
                                            disabled={property.bookingStatus !== "pending"}
                                            className={`flex items-center gap-2 px-3 py-2 rounded text-white text-xs ${property.bookingStatus === "pending"
                                                    ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                                                    : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            <FcDisapprove size={20} /> Reject
                                        </button>
                                    </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={currentPage === 1}
                                className=" cursor-pointer px-4 py-2 rounded-lg border disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg border ${currentPage === index + 1
                                        ? "bg-black text-white"
                                        : "bg-white"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}


                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="cursor-pointer px-4 py-2 rounded-lg border disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>
                    )}


                </>
            )}
        </motion.div>
    );
};
export default AllBookingsPage;