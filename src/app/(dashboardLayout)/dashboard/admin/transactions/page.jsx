"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { FaDollarSign, FaCreditCard, FaReceipt } from "react-icons/fa";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";

const AllTransactionsPage = () => {
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
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session]);

  const totalBookings = properties.length;
  const totalRent = properties.reduce(
    (sum, property) => sum + Number(property?.totalRent || 0),
    0
  );
  const avgBooking = totalBookings > 0 ? totalRent / totalBookings : 0;

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Transactions...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Financial Settlements
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Platform Transactions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed ledger of reservation payments, Stripe intents, and revenue flows.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Volume</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              ${totalRent.toLocaleString()}
            </h2>
            <span className="text-[11px] font-medium text-emerald-600">All-time settled rent</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FaDollarSign size={22} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Invoices</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              {totalBookings}
            </h2>
            <span className="text-[11px] font-medium text-blue-600">Processed bookings</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FaReceipt size={20} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg. Reservation</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1.5">
              ${Math.round(avgBooking).toLocaleString()}
            </h2>
            <span className="text-[11px] font-medium text-purple-600">Per booking average</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <FaCreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Transaction / Ref</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Payer (Tenant)</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Amount</th>
                <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Payment Method</th>
                <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProperties.map((property) => (
                <tr key={property._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <p className="font-mono text-xs font-bold text-slate-800">
                      {property.paymentIntent || `TXN-${property._id?.slice(-8)}`}
                    </p>
                    <p className="text-[11px] text-slate-400">Check In: {property.checkIn || "Standard"}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-xs font-bold text-slate-900 truncate max-w-xs">
                      {property.propertyTitle || "Rental Property"}
                    </p>
                    <p className="text-[11px] text-slate-400">{property.totalDays ? `${property.totalDays} Days` : "Monthly"}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-xs font-bold text-slate-800">{property.userName || "Tenant"}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{property.userEmail}</p>
                  </td>

                  <td className="p-4 text-xs font-black text-slate-900">
                    ${Number(property.totalRent || 0).toLocaleString()} USD
                  </td>

                  <td className="p-4 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                      <FaCreditCard className="text-blue-500" />
                      <span>Stripe Checkout</span>
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <FiCheckCircle size={11} />
                      {property.paymentStatus || "Settled"}
                    </span>
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

export default AllTransactionsPage;
