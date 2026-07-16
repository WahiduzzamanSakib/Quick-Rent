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
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/dashboard/owner/approve-reject-property/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            setData((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? {
                              ...item,
                              status,
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


    // Statistics
    const totalProperties = data.length;

    const approvedProperties = data.filter(
        (item) => item.status === "approved"
    ).length;

    const rejectedProperties = data.filter(
        (item) => item.status === "rejected"
    ).length;

    const pendingProperties = data.filter(
        (item) => item.status === "pending"
    ).length;


    return (
        <div className="p-4 md:p-8">

            <h1 className="text-2xl font-bold mb-6">
                Property Requests
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow p-5 border"
                >
                    <p className="text-gray-500 font-medium">
                        Total Properties
                    </p>
                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {totalProperties}
                    </h2>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow p-5 border"
                >
                    <p className="text-gray-500 font-medium">
                        Approved Properties
                    </p>
                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {approvedProperties}
                    </h2>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow p-5 border"
                >
                    <p className="text-gray-500 font-medium">
                        Rejected Properties
                    </p>
                    <h2 className="text-3xl font-bold text-red-600 mt-2">
                        {rejectedProperties}
                    </h2>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow p-5 border"
                >
                    <p className="text-gray-500 font-medium">
                        Pending Properties
                    </p>
                    <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                        {pendingProperties}
                    </h2>
                </motion.div>

            </div>



            {loading ? (
                <div className="text-center">
                    <svg
                        aria-hidden="true"
                        className="inline w-12 h-12 animate-spin text-gray-300 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            ) : (

                <div className="overflow-x-auto">

                    <motion.table
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="min-w-full border bg-white rounded-lg overflow-hidden"
                    >

                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Rent</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">
                                    Action
                                </th>
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
                                                className={`font-semibold ${
                                                    item.status === "approved"
                                                        ? "text-green-600"
                                                        : item.status === "rejected"
                                                        ? "text-red-600"
                                                        : "text-yellow-600"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    disabled={
                                                        isLocked ||
                                                        (actionLoading.id === item._id &&
                                                        actionLoading.type === "approved")
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
                                                    {actionLoading.id === item._id &&
                                                    actionLoading.type === "approved"
                                                        ? "Processing..."
                                                        : isLocked
                                                        ? "Finalized"
                                                        : "Approve"}
                                                </button>
                                                <button
                                                    disabled={
                                                        isLocked ||
                                                        (actionLoading.id === item._id &&
                                                        actionLoading.type === "rejected")
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

                                                    {actionLoading.id === item._id &&
                                                    actionLoading.type === "rejected"
                                                        ? "Processing..."
                                                        : isLocked
                                                        ? "Finalized"
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