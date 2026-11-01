"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiClock, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const BookingRequestsPage = () => {
  const { data: session } = authClient.useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

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
            cache: "no-store",
          }
        );

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : data?.data || [data]);
      } catch (err) {
        console.error("Failed to fetch booking requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  const handleStatusUpdate = async (id, status) => {
    try {
      setUpdatingId(id);
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
        toast.success(`Booking request ${status}!`);
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
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Booking Requests...
        </p>
      </div>
    );
  }

  const pendingCount = properties.filter((p) => p.bookingStatus === "pending").length;
  const approvedCount = properties.filter((p) => p.bookingStatus === "approved").length;
  const rejectedCount = properties.filter((p) => p.bookingStatus === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Inquiries & Reservations
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Booking Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review tenant reservation applications, check-in dates, and approve or reject stays.
        </p>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Requests</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">{properties.length}</h2>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Review</p>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1.5">{pendingCount}</h2>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Approved</p>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1.5">{approvedCount}</h2>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Rejected</p>
          <h2 className="text-2xl sm:text-3xl font-black text-rose-700 mt-1.5">{rejectedCount}</h2>
        </div>
      </div>

      {/* Requests Table / Cards */}
      {properties.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-3">
            <FiCalendar size={26} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No booking requests found</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            When tenants reserve your properties, their booking requests will appear here for your review.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Tenant</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Check In</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Duration</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Amount</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
                  <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentProperties.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1 max-w-xs">
                        {item.propertyTitle || "Rental Property"}
                      </p>
                      <p className="text-[11px] text-slate-400">ID: {item.propertyId?.slice(-6) || "N/A"}</p>
                    </td>

                    <td className="p-4">
                      <p className="text-xs font-bold text-slate-800">{item.userName || "Tenant"}</p>
                      <p className="text-[11px] text-slate-400">{item.userEmail || item.phone || ""}</p>
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-600">
                      {item.checkIn || "Flexible"}
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-600">
                      {item.totalDays ? `${item.totalDays} Days` : "1 Month"}
                    </td>

                    <td className="p-4 text-xs font-black text-slate-900">
                      ${Number(item.totalRent || 0).toLocaleString()}
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

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {item.bookingStatus === "pending" ? (
                          <>
                            <button
                              disabled={updatingId === item._id}
                              onClick={() => handleStatusUpdate(item._id, "approved")}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer"
                            >
                              <FiCheck />
                              <span>Approve</span>
                            </button>
                            <button
                              disabled={updatingId === item._id}
                              onClick={() => handleStatusUpdate(item._id, "rejected")}
                              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition disabled:opacity-50 cursor-pointer"
                            >
                              <FiX />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400">
                            Processed
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {currentProperties.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.propertyTitle || "Rental Property"}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">By {item.userName} ({item.userEmail})</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${
                      item.bookingStatus === "approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.bookingStatus === "rejected"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {item.bookingStatus || "pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Check In</span>
                    <span className="font-semibold">{item.checkIn || "Flexible"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Duration</span>
                    <span className="font-semibold">{item.totalDays || 0} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Rent Total</span>
                    <span className="font-black text-slate-900">${Number(item.totalRent || 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Payment</span>
                    <span className="font-semibold text-emerald-600">{item.paymentStatus || "Paid"}</span>
                  </div>
                </div>

                {item.bookingStatus === "pending" && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      disabled={updatingId === item._id}
                      onClick={() => handleStatusUpdate(item._id, "approved")}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
                    >
                      <FiCheck />
                      <span>Approve</span>
                    </button>
                    <button
                      disabled={updatingId === item._id}
                      onClick={() => handleStatusUpdate(item._id, "rejected")}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                    >
                      <FiX />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
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
        </>
      )}
    </div>
  );
};

export default BookingRequestsPage;
