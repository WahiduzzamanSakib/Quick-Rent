"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaUser, FaCrown, FaBan } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { toast } from "react-toastify";

const roles = ["TENANT", "ADMIN", "OWNER"];

/* ROLE ICON */
const roleIcon = (role) => {
    switch (role) {
        case "ADMIN":
            return <FaUserShield className="text-yellow-500" />;
        case "OWNER":
            return <FaCrown className="text-purple-500" />;
        default:
            return <FaUser className="text-gray-500" />;
    }
};

/* ROLE BADGE COLOR */
const roleBadgeColor = (role) => {
    switch (role) {
        case "ADMIN":
            return "bg-yellow-100 text-yellow-700 border-yellow-300";
        case "OWNER":
            return "bg-purple-100 text-purple-700 border-purple-300";
        default:
            return "bg-gray-100 text-gray-700 border-gray-300";
    }
};

export default function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    /* GET USERS */
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                "http://localhost:5000/dashboard/admin/get-users"
            );
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* PATCH ROLE UPDATE */
    const updateRole = async (id, role) => {
        try {
            const res = await fetch(
                `http://localhost:5000/dashboard/admin/update-role/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();

            if (res.ok) {
              
                setUsers((prev) =>
                    prev.map((u) =>
                        u._id === id ? { ...u, role } : u
                    )
                );
                toast.success(`Role Update Successfully`);
            } else {
                toast.error(data.message || "Update failed");
            }

        } catch (error) {
            console.log(error);
            toast.error("Server error");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-500">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">

           
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    All Users
                </h2>

                <button
                    onClick={fetchUsers}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 shadow-sm transition w-full sm:w-auto"
                >
                    <MdRefresh />
                    Refresh
                </button>
            </div>

            
            <div className="hidden md:block bg-white shadow-md rounded-xl border overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <motion.tr
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="border-t hover:bg-gray-50 transition"
                            >
                              
                                <td className="p-4 flex items-center gap-2 font-medium">
                                    {roleIcon(user.role)}
                                    {user.name}
                                </td>

                               
                                <td className="p-4 text-gray-600">
                                    {user.email}
                                </td>

                              
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleBadgeColor(user.role)}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                               
                                <td className="p-4">
                                    {user.isBlocked ? (
                                        <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                                            <FaBan />
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="text-green-600 text-sm font-medium">
                                            Active
                                        </span>
                                    )}
                                </td>

                              
                                <td className="p-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            updateRole(user._id, e.target.value)
                                        }
                                        className="px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.map((user, index) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border rounded-xl shadow-sm p-4 space-y-3"
                    >
                        <div className="flex items-center gap-2 font-semibold">
                            {roleIcon(user.role)}
                            {user.name}
                        </div>

                        <p className="text-sm text-gray-600">{user.email}</p>

                        {user.isBlocked ? (
                            <span className="text-red-600 text-sm flex items-center gap-1">
                                <FaBan /> Blocked
                            </span>
                        ) : (
                            <span className="text-green-600 text-sm">
                                Active
                            </span>
                        )}

                        <select
                            value={user.role}
                            onChange={(e) =>
                                updateRole(user._id, e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}