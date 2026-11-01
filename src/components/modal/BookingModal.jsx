"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { FiLock, FiCalendar, FiDollarSign } from "react-icons/fi";

export function BookingModalPage({ property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { data: session } = authClient.useSession();

  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const { owner, rent, _id, title } = property;

  const monthlyRent = Number(property.rent || 0);
  const rentPerDay = monthlyRent / 30;

  const totalDays =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const totalRent = totalDays * rentPerDay;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const paymentData = {
        ...data,
        type: "booking",
        propertyId: _id,
        propertyTitle: title,
        rentMonthly: rent,
        rentPerDay: Number(rentPerDay.toFixed(2)),
        totalDays,
        totalRent: Number(totalRent.toFixed(2)),
        paymentStatus: "paid",
        bookingStatus: "pending",
      };

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      const result = await res.json();
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.log("Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition active:scale-98 cursor-pointer"
      >
        <FiLock />
        <span>Book & Reserve Stay</span>
      </button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Reserve Property
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {title}
                </p>
              </Modal.Header>

              <Modal.Body className="p-0 pt-4">
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={userName || ""}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-100/70 px-3 py-2 text-xs font-semibold text-slate-700 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Email Address
                      </label>
                      <input
                        name="userEmail"
                        value={userEmail || ""}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-100/70 px-3 py-2 text-xs font-semibold text-slate-700 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Check In & Check Out Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Check In Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Check Out Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        required
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Message to Owner <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="message"
                      required
                      placeholder="Share a brief introduction or your arrival details"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Owner Email hidden/readonly */}
                  <input
                    type="hidden"
                    name="ownerEmail"
                    value={owner || ""}
                  />

                  {/* Booking Summary Box */}
                  {totalDays > 0 ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Daily Rate</span>
                        <span className="font-semibold">${rentPerDay.toFixed(2)}/day</span>
                      </div>

                      <div className="flex justify-between text-slate-600">
                        <span>Stay Duration</span>
                        <span className="font-semibold">{totalDays} {totalDays === 1 ? "Day" : "Days"}</span>
                      </div>

                      <div className="pt-2 border-t border-emerald-200/80 flex justify-between items-baseline font-black text-sm text-slate-900">
                        <span>Total Due</span>
                        <span className="text-base text-emerald-600">${totalRent.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 p-3 text-center text-xs text-slate-400">
                      Select check-in and check-out dates to calculate reservation total.
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || totalDays === 0}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <FiLock />
                          <span>
                            {totalDays > 0
                              ? `Pay $${totalRent.toFixed(2)} via Stripe`
                              : "Select Dates to Pay"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
