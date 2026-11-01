"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaUser,
  FaCrown,
  FaUsers,
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const roles = ["TENANT", "ADMIN", "OWNER"];

const roleIcon = (role) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return <FaUserShield className="text-amber-500" />;
    case "OWNER":
      return <FaCrown className="text-purple-500" />;
    default:
      return <FaUser className="text-blue-500" />;
  }
};

export default function AllUsersPage() {
  const { data: session } = authClient.useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/admin/get-users`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/admin/update-role/${id}`,
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
        toast.success(`Role changed to ${role}`);
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: role.toLowerCase() } : user
          )
        );
      } else {
        toast.error(data?.message || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating role");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role?.toLowerCase() === "admin").length;
  const ownerCount = users.filter((u) => u.role?.toLowerCase() === "owner").length;
  const tenantCount = users.filter((u) => u.role?.toLowerCase() === "tenant").length;

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Users Directory...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Account Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage account roles, permissions, and platform participation across QuickRent.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition w-fit cursor-pointer"
        >
          <MdRefresh size={16} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Accounts</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">{totalUsers}</h2>
        </div>

        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Tenants</p>
          <h2 className="text-2xl sm:text-3xl font-black text-blue-700 mt-1.5">{tenantCount}</h2>
        </div>

        <div className="rounded-2xl border border-purple-200/80 bg-purple-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-700">Owners</p>
          <h2 className="text-2xl sm:text-3xl font-black text-purple-700 mt-1.5">{ownerCount}</h2>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Admins</p>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1.5">{adminCount}</h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">User</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Email</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Current Role</th>
                <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-slate-100 shrink-0 bg-slate-100">
                        <img
                          src={
                            user.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name || "User"
                            )}&background=2563eb&color=fff&bold=true`
                          }
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400">ID: {user._id?.slice(-6)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-xs font-medium text-slate-600 truncate max-w-xs">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        user.role?.toLowerCase() === "admin"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : user.role?.toLowerCase() === "owner"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {roleIcon(user.role)}
                      <span>{user.role}</span>
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <select
                      disabled={updatingId === user._id}
                      value={user.role?.toUpperCase() || "TENANT"}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          Set as {r}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
