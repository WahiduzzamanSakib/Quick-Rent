"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiCheck, FiX, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

const BookingRequestsPage = () => {
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
                    `${process.env.NEXT_PUBLIC_API_URL}/api/properties/all-booking/${session.user.email}`,
                    {
                        headers: {
                            authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
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

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/status/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        status: status,
                    }),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                setProperties((prev) =>
                    prev.map((property) =>
                        property._id === id
                            ? {
                                ...property,
                                bookingStatus: status,
                            }
                            : property
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProperties = properties.slice(
        startIndex,
        startIndex + itemsPerPage
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
                className="text-2xl font-bold mb-6"
            >
                My Booking Requests
            </motion.h1>


            {properties.length === 0 ? (

                <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-center text-2xl font-bold text-gray-500 py-10"
                >
                    No Booking Requests found.
                </motion.p>

            ) : (

                <>

                    {/* Booking Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            className="bg-white shadow rounded-xl p-4 border cursor-pointer"
                        >
                            <p className="text-gray-500 text-sm">
                                Total Requests
                            </p>

                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold mt-2"
                            >
                                {properties.length}
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            className="bg-green-50 shadow rounded-xl p-4 border border-green-100 cursor-pointer"
                        >
                            <p className="text-green-700 text-sm">
                                Approved
                            </p>

                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-bold text-green-700 mt-2"
                            >
                                {
                                    properties.filter(
                                        (item) => item.bookingStatus === "approved"
                                    ).length
                                }
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            className="bg-yellow-50 shadow rounded-xl p-4 border border-yellow-100 cursor-pointer"
                        >
                            <p className="text-yellow-700 text-sm">
                                Pending
                            </p>

                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-3xl font-bold text-yellow-700 mt-2"
                            >
                                {
                                    properties.filter(
                                        (item) => item.bookingStatus === "pending"
                                    ).length
                                }
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            className="bg-red-50 shadow rounded-xl p-4 border border-red-100 cursor-pointer"
                        >
                            <p className="text-red-700 text-sm">
                                Rejected
                            </p>
                            <motion.h2
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold text-red-700 mt-2"
                            >
                                {
                                    properties.filter(
                                        (item) => item.bookingStatus === "rejected"
                                    ).length
                                }
                            </motion.h2>
                        </motion.div>

                    </div>


                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">

                        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">

                            <thead className="bg-gray-100">
                                <tr>
                                    {[
                                        "Title",
                                        "Booking ID",
                                        "Rent",
                                        "Payment Status",
                                        "Booking Status",
                                        "Actions"
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

                                {currentProperties.map((property, index) => (

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
                                                className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${property?.bookingStatus === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : property?.bookingStatus === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                                            >
                                                {property?.bookingStatus}
                                            </span>

                                        </td>

                                        <td className="p-4 flex gap-2">
                                            <Button
                                                variant="outline"
                                                isDisabled={property?.bookingStatus !== "pending"}
                                                onPress={() =>
                                                    handleStatusUpdate(property._id, "approved")
                                                }
                                            >
                                                {property?.bookingStatus === "approved"
                                                    ? "Approved"
                                                    : "Approve"}
                                            </Button>

                                            <Button
                                                variant="danger"
                                                isDisabled={property?.bookingStatus !== "pending"}
                                                onPress={() =>
                                                    handleStatusUpdate(property._id, "rejected")
                                                }
                                            >
                                                {property?.bookingStatus === "rejected"
                                                    ? "Rejected"
                                                    : "Reject"}
                                            </Button>

                                        </td>


                                    </motion.tr>

                                ))}

                            </tbody>

                        </table>

                    </div>



                    {/* Mobile Cards */}

                    <div className="md:hidden space-y-4 px-2">
                        {currentProperties.map((property, index) => (

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
                                className="bg-white shadow rounded-xl p-4 space-y-4 w-full"
                            >

                                <h2 className="font-bold text-lg break-words">
                                    {property?.propertyTitle}
                                </h2>

                                <div className="flex justify-between">

                                    <span className="font-semibold">
                                        Booking ID:
                                    </span>

                                    <p className="text-gray-500 text-sm break-all">
                                        {property?.paymentIntent}
                                    </p>

                                </div>

                                <div className="flex justify-between">

                                    <div>
                                        <span className="font-semibold">
                                            Rent:
                                        </span>

                                        <span className="text-green-600 font-bold ml-2">
                                            ${property?.totalRent}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="font-semibold">
                                            Payment:
                                        </span>
                                        <span
                                            className={`ml-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${property?.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {property?.paymentStatus}
                                        </span>

                                    </div>

                                </div>

                                <div className="flex justify-between space-y-3">
                                    <div className="flex justify-between">

                                        <span className="font-semibold">
                                            Status:
                                        </span>
                                        <span
                                            className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs ${property?.bookingStatus === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : property?.bookingStatus === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {
                                                property?.bookingStatus === "approved"
                                                && <FiCheckCircle size={14} />
                                            }
                                            {
                                                property?.bookingStatus === "rejected"
                                                && <FiXCircle size={14} />
                                            }
                                            {
                                                property?.bookingStatus === "pending"
                                                && <FiClock size={14} />
                                            }
                                            {property?.bookingStatus}
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <Button
                                            className="w-full sm:w-auto flex items-center justify-center gap-2"
                                            variant="outline"
                                            isDisabled={property?.bookingStatus !== "pending"}
                                            onPress={() =>
                                                handleStatusUpdate(property._id, "approved")
                                            }
                                        >
                                            <FiCheck size={18} />
                                        </Button>

                                        <Button
                                            className="w-full sm:w-auto flex items-center ml-1 justify-center gap-2"
                                            variant="danger"
                                            isDisabled={property?.bookingStatus !== "pending"}
                                            onPress={() =>
                                                handleStatusUpdate(property._id, "rejected")
                                            }
                                        >
                                            <FiX size={18} />


                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="cursor-pointer flex justify-center items-center gap-2 mt-8">
                        <Button
                            variant="outline"
                            isDisabled={currentPage === 1}
                            onPress={() => setCurrentPage(prev => prev - 1)}
                            className='bg-gray-400 text-black'
                        >
                            Previous
                        </Button>

                        {
                            [...Array(totalPages)].map((_, index) => (
                                <Button
                                    variant="outline"
                                    key={index}
                                    onPress={() => setCurrentPage(index + 1)}
                                    className={
                                        currentPage === index + 1
                                            ? " text-black"
                                            : ""
                                    }
                                >
                                    {index + 1}
                                </Button>
                            ))
                        }

                        <Button
                            variant="outline"
                            isDisabled={currentPage === totalPages}
                            onPress={() => setCurrentPage(prev => prev + 1)}
                            className='bg-gray-400 text-black'
                        >
                            Next
                        </Button>

                    </div>
                </>
            )}
        </motion.div>
    );
};

export default BookingRequestsPage;