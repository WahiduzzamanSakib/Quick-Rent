"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const MyBookingsPage = () => {
    const { data: session } = authClient.useSession();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

            {properties.length === 0 ? (
                <p>No Bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3">Title</th>
                                <th className="text-left p-3">Booking ID</th>
                                <th className="text-left p-3">Rent</th>
                                <th className="text-left p-3">Payment Status</th>
                                <th className="text-left p-3">Booking Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {properties.map((property) => (
                                <motion.tr
                                    key={property._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-3 font-semibold">
                                        {property.title}
                                    </td>

                                    <td className="p-3 text-gray-600">
                                        {property.location}
                                    </td>

                                    <td className="p-3 text-green-600 font-bold">
                                        <div className="flex items-center gap-1">
                                            {property.rent} 
                                        </div>
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

                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;