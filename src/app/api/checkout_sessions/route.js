import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUser } from "@/lib/api/session";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const body = await req.json();
    const { type } = body;

    const user = await getUser();

    let lineObj;
    let metaObj;

    if (type === "subscription") {
      lineObj = {
        price: "price_1TgpUbKExS1h0fIImDNtiaU2",
        quantity: 1,
      };
    } else {
      const totalRent = Number(body?.totalRent);
      lineObj = {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(totalRent * 100),
          product_data: {
            name: body?.propertyTitle || "Property Booking",
            description: `${body?.totalDays || 0} Days Booking`,
          },
        },
        quantity: 1,
      };
      metaObj = {
        paymentType: type,
        userId: user?.id || "",
        userName: body?.name || "",
        userEmail: body?.userEmail || user?.email || "",
        propertyId: body?.propertyId || "",
        propertyTitle: body?.propertyTitle || "",
        ownerEmail: body?.ownerEmail || "",
        checkIn: body?.checkIn || "",
        checkOut: body?.checkOut || "",
        rentMonthly: body?.rentMonthly || "",
        rentPerDay: body?.rentPerDay || "",
        message: body?.message || "",
        totalDays: body?.totalDays || "",
        totalRent: body?.totalRent || "",
        phone: body?.phone || "",
        paymentStatus: body?.paymentStatus || "",
        bookingStatus: body?.bookingStatus || "",
      };
    }


    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || body?.userEmail,
      line_items: [lineObj],

      metadata: metaObj,
      mode: type === "subscription" ? "subscription" : "payment",
      success_url:
        `${origin}/dashboard/tenant/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${origin}/dashboard/tenant/payment-cancel`,
    });


    return NextResponse.json({
      url: session.url,
    });

  } catch (err) {
    console.error("Stripe Checkout Error:", err);

    return NextResponse.json(
      { error: err.message || "Something went wrong", },
      { status: err.statusCode || 500, }
    );
  }
}