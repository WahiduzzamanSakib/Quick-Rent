import { stripe } from "../../../../../lib/stripe";
import Link from "next/link";
import { FaCheckCircle, FaHome, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const newPayment = {
    bookingStatus: session?.metadata?.bookingStatus,
    message: session?.metadata?.message,
    ownerEmail: session?.metadata?.ownerEmail,
    paymentStatus: session?.metadata?.paymentStatus,
    phone: session?.metadata?.phone,
    propertyId: session?.metadata?.propertyId,
    propertyTitle: session?.metadata?.propertyTitle,
    totalDays: session?.metadata?.totalDays,
    totalRent: session?.metadata?.totalRent,
    userEmail: session?.metadata?.userEmail,
    userId: session?.metadata?.userId,
    userName: session?.metadata?.userName,
    paymentIntent: session?.payment_intent?.id,
    checkIn: session?.metadata?.checkIn,
  };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPayment),
    });
  } catch (e) {
    console.error("Error saving booking on payment success:", e);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl text-center">
        {/* Animated Check */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 mb-6 shadow-inner">
          <FaCheckCircle size={44} />
        </div>

        <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100 mb-2">
          Payment Verified
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Reservation Completed!
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Your payment was processed securely via Stripe. Your booking application has been delivered to the property owner.
        </p>

        {/* Receipt Box */}
        <div className="my-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 text-left space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Property</span>
            <span className="font-bold text-slate-900 truncate max-w-[200px]">
              {session?.metadata?.propertyTitle || "Rental Property"}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Account Email</span>
            <span className="font-medium text-slate-800">{session?.customer_email}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Stripe Payment ID</span>
            <span className="font-mono text-[11px] text-slate-600">
              {session?.payment_intent?.id || session_id?.slice(0, 16)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-slate-700">Total Settled</span>
            <span className="text-base font-black text-emerald-600">
              ${session?.metadata?.totalRent || session?.amount_total / 100} USD
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/dashboard/tenant/my-bookings"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>View My Bookings</span>
            <FaArrowRight size={11} />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <FaHome size={13} />
            <span>Return to Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
