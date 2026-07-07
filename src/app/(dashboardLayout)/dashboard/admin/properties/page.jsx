"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from "react-icons/fa";

export default function PropertyTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({
        id: null,
        type: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/admin/get-properties`,
                    { cache: "no-store" }
                );

                const json = await res.json();
                setData(Array.isArray(json) ? json : json?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAction = async (id, status) => {
        setActionLoading({ id, type: status });

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/approve-reject-property/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const result = await res.json();

            setData((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            status,
                            locked: true, // lock permanently
                        }
                        : item
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading({ id: null, type: null });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Property Requests</h1>

            {loading ? (
                <div className="text-center">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-12 h-12 text-neutral-tertiary animate-spin fill-brand"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <motion.table
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden"
                    >
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Rent</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item) => {
                                const isLocked =
                                    item.status === "approved" ||
                                    item.status === "rejected";

                                return (
                                    <tr
                                        key={item._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3 font-medium">
                                            {item.title}
                                        </td>

                                        <td className="p-3 flex items-center gap-2 text-gray-600">
                                            <FaMapMarkerAlt />
                                            {item.location}
                                        </td>

                                        <td className="p-3">
                                            {item.propertyType}
                                        </td>

                                        <td className="p-3 font-semibold text-cyan-600">
                                            {item.rent} / {item.rentType}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`font-semibold ${item.status === "approved"
                                                        ? "text-green-600"
                                                        : item.status ===
                                                            "rejected"
                                                            ? "text-red-600"
                                                            : "text-yellow-600"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                {/* APPROVE */}
                                                <button
                                                    disabled={
                                                        isLocked ||
                                                        (actionLoading.id ===
                                                            item._id &&
                                                            actionLoading.type ===
                                                            "approved")
                                                    }
                                                    onClick={() =>
                                                        handleAction(
                                                            item._id,
                                                            "approved"
                                                        )
                                                    }
                                                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                                >
                                                    <FaCheckCircle />
                                                    {isLocked
                                                        ? "Finalized"
                                                        : actionLoading.id ===
                                                            item._id &&
                                                            actionLoading.type ===
                                                            "approved"
                                                            ? "Processing..."
                                                            : "Approve"}
                                                </button>

                                              
                                                <button
                                                    disabled={
                                                        isLocked ||
                                                        (actionLoading.id ===
                                                            item._id &&
                                                            actionLoading.type ===
                                                            "rejected")
                                                    }
                                                    onClick={() =>
                                                        handleAction(
                                                            item._id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                                                >
                                                    <FaTimesCircle />
                                                    {isLocked
                                                        ? "Finalized"
                                                        : actionLoading.id ===
                                                            item._id &&
                                                            actionLoading.type ===
                                                            "rejected"
                                                            ? "Processing..."
                                                            : "Reject"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </motion.table>
                </div>
            )}
        </div>
    );
}