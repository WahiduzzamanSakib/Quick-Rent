"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";

const AllBookingsPage = () => {
  const { data: session } = authClient.useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);
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
        setProperties(Array.isArray(data) ? data : data?.data || [data]);
      } catch (err) {
        console.error("Failed to fetch admin bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  const handleBookingStatus = async (id, bookingStatus) => {
    try {
      setActionLoading(id);
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
        toast.success(`Booking status set to ${bookingStatus}`);
        setProperties((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, bookingStatus } : item
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking status");
    } finally {
      setActionLoading(null);
    }
  };

  const bookingStats = useMemo(() => {
    return {
      total: properties.length,
      approved: properties.filter((p) => p?.bookingStatus === "approved").length,
      rejected: properties.filter((p) => p?.bookingStatus === "rejected").length,
      pending: properties.filter((p) => p?.bookingStatus === "pending").length,
    };
  }, [properties]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading All Bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Reservations Oversight
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          All System Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor all reservation transactions, tenant applications, and owner statuses.
        </p>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">{bookingStats.total}</h2>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Approved</p>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{bookingStats.approved}</h2>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending</p>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1.5">{bookingStats.pending}</h2>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Rejected</p>
          <h2 className="text-2xl sm:text-3xl font-black text-rose-700 mt-1.5">{bookingStats.rejected}</h2>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Tenant</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Check In</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Total Rent</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Payment</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
                <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProperties.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-xs">
                      {item.propertyTitle || "Rental Property"}
                    </p>
                    <p className="text-[11px] text-slate-400">Ref: {item._id?.slice(-6)}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-xs font-bold text-slate-800">{item.userName || "Tenant"}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{item.userEmail}</p>
                  </td>

                  <td className="p-4 text-xs font-medium text-slate-600">
                    {item.checkIn || "Flexible"}
                  </td>

                  <td className="p-4 text-xs font-black text-slate-900">
                    ${Number(item.totalRent || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.paymentStatus || "Paid"}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        item.bookingStatus === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.bookingStatus === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.bookingStatus || "pending"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        disabled={actionLoading === item._id || item.bookingStatus === "approved"}
                        onClick={() => handleBookingStatus(item._id, "approved")}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-40 cursor-pointer"
                      >
                        <FiCheck />
                        <span>Approve</span>
                      </button>
                      <button
                        disabled={actionLoading === item._id || item.bookingStatus === "rejected"}
                        onClick={() => handleBookingStatus(item._id, "rejected")}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition disabled:opacity-40 cursor-pointer"
                      >
                        <FiX />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-8 min-w-8 px-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBookingsPage;
