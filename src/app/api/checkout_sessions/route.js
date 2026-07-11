import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUser } from '@/lib/api/session'



export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user = await getUser()

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: 'price_1TqCnk0mHYtrrA0KTHIY5emV',
          quantity: 2,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard/tenant/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
