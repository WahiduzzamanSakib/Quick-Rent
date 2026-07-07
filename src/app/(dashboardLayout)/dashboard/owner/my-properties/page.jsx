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
            <div role="status" className="flex justify-center items-center h-64">
               <svg aria-hidden="true" className="mt-10 w-12 h-12 mx-auto justify-center items-center  text-cyan-500 animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Properties</h1>

            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
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
                                          {property.rent} / {property.rentType}  
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
            )}
        </div>
    );
};

export default MyPropertiesPage;