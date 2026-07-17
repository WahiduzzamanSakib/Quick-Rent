"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

import EditModal from "@/components/modal/EditModal";
import { DeletedAlert } from "@/components/modal/DeletedAlert";
;

const MyPropertiesPage = () => {
    const { data: session } = authClient.useSession();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 7;

    useEffect(() => {
        const fetchProperties = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/get-properties/${session.user.email}`
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

    if (loading) {
        return (
            <div className="loader flex mx-auto justify-center items-center  my-20"></div>
        );
    }

    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProperties = properties.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Properties</h1>

            {/* Property Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white shadow rounded-xl p-4 border cursor-pointer"
                >
                    <p className="text-gray-500 text-sm">
                        Total Properties
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
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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
                                (item) => item.status === "approved"
                            ).length
                        }
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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
                                (item) => item.status === "pending"
                            ).length
                        }
                    </motion.h2>
                </motion.div>


                {/* Rejected Properties */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-50 shadow rounded-xl p-4 border border-red-100 cursor-pointer"
                >
                    <p className="text-red-700 text-sm">
                        Rejected
                    </p>

                    <motion.h2
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl font-bold text-red-700 mt-2"
                    >
                        {
                            properties.filter(
                                (item) => item.status === "rejected"
                            ).length
                        }
                    </motion.h2>
                </motion.div>
            </div>

            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <>
                    < div className="hidden md:block overflow-x-auto">

                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3">Title</th>
                                    <th className="text-left p-3">Location</th>
                                    <th className="text-left p-3">Rent</th>
                                    <th className="text-left p-3">Type</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-center p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentProperties.map((property) => (
                                    <motion.tr
                                        key={property._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3 font-semibold">
                                            {property.title}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {property.location}
                                        </td>

                                        <td className="p-3 text-green-600 font-bold">
                                            {property.rent} / {property.rentType}
                                        </td>

                                        <td className="p-3 text-blue-600 font-medium">
                                            {property.propertyType}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full ${property.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : property.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {property.status}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <EditModal property={property} />
                                                <DeletedAlert property={property} />
                                            </div>
                                        </td>

                                    </motion.tr>
                                ))}
                            </tbody>

                        </table>

                    </div>


                    <div className="md:hidden space-y-2">
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
                                className="bg-white shadow rounded-xl p-4 space-y-2 border"
                            >

                                <h2 className="font-bold text-lg">
                                    {property.title}
                                </h2>


                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Location:
                                    </span>

                                    <span className="text-gray-600 text-right">
                                        {property.location}
                                    </span>
                                </div>


                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Rent:
                                    </span>

                                    <span className="text-green-600 font-bold">
                                        {property.rent} / {property.rentType}
                                    </span>
                                </div>


                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Type:
                                    </span>

                                    <span className="text-blue-600">
                                        {property.propertyType}
                                    </span>
                                </div>


                                <div className="flex justify-between items-center">

                                    <span className="font-semibold">
                                        Status:
                                    </span>


                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${property.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : property.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {property.status}
                                    </span>

                                </div>


                                <div className="flex justify-end gap-2 pt-2">

                                    <EditModal property={property} />

                                    <DeletedAlert property={property} />

                                </div>


                            </motion.div>

                        ))}

                    </div>

                    <div className="flex justify-center items-center gap-2 mt-6">

                        <button

                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="cursor-pointer px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 rounded ${currentPage === index + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="cursor-pointer px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>
                </>
            )}
        </div >
    );
};

export default MyPropertiesPage;