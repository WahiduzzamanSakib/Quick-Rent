"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { DeletedBooking } from "@/components/modal/DelateBooking";
import Link from "next/link";
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiCreditCard, FiSearch } from "react-icons/fi";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!session?.user?.email) return;

      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties/booking/${session?.user?.email}`,
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
        console.error("Failed to fetch tenant bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <div className="loader"></div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Your Bookings...
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
            Tenant Reservations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            My Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your confirmed stays, reservation payments, and check-in schedules.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition active:scale-98 w-fit"
        >
          <FiSearch />
          <span>Browse More Places</span>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-3">
            <FiCalendar size={26} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No active bookings found</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You haven't booked any rental spaces yet. Explore available apartments, houses, and studios today.
          </p>
          <Link
            href="/properties"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>Explore Properties</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Property</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Duration</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Total Paid</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Check In</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Payment</th>
                  <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Status</th>
                  <th className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1 max-w-xs">
                        {item.propertyTitle || "Reserved Property"}
                      </p>
                      <p className="text-[11px] text-slate-400">ID: {item.propertyId?.slice(-6) || "N/A"}</p>
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-600">
                      {item.totalDays ? `${item.totalDays} Days` : "1 Month"}
                    </td>

                    <td className="p-4 text-xs font-black text-slate-900">
                      ${Number(item.totalRent || 0).toLocaleString()}
                    </td>

                    <td className="p-4 text-xs font-medium text-slate-600">
                      {item.checkIn || "Flexible"}
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <FiCheckCircle size={11} />
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
                      <DeletedBooking property={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {properties.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.propertyTitle || "Reserved Space"}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Booking Ref: {item._id?.slice(-6)}</p>
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
                    <span className="text-slate-400 text-[10px] block">Check In Date</span>
                    <span className="font-semibold">{item.checkIn || "Flexible"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Duration</span>
                    <span className="font-semibold">{item.totalDays || 0} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Total Amount</span>
                    <span className="font-black text-slate-900">${Number(item.totalRent || 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Payment</span>
                    <span className="font-semibold text-emerald-600">{item.paymentStatus || "Paid"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <DeletedBooking property={item} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
