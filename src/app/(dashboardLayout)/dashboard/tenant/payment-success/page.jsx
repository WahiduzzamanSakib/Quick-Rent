import { stripe } from '../../../../../lib/stripe'
import { Button, Card, CardFooter, CardHeader, Link } from '@heroui/react'
import { FaArrowRight, FaCheckCircle, FaHome } from 'react-icons/fa'


export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams
  console.log(session_id)

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

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
    paymentIntent: session?.payment_intent?.id
    // checkIn: session?.metadata?.checkIn,
    // checkOut: session?.metadata?.checkOut,
    // paymentType: session?.metadata?.paymentType,
    // rentMonthly: session?.metadata?.rentMonthly,
    // rentPerDay: session?.metadata?.rentPerDay,
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPayment)
  })
  const PaymentData = await res.json()
  console.log(PaymentData)

  return (

    <div className="min-h-[80vh] flex items-center justify-center bg-[#080c16] px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10" />

      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
        <>
          <CardHeader className="flex flex-col gap-1 items-center pb-3 text-center">

            <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 border border-blue-500/20 mb-2">
              <FaHome size={48} className="animate-pulse" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-500 bg-clip-text text-transparent">
              Booking Successful!
            </h1>


          </CardHeader>
          <div className="gap-6 bg-slate-900/40 p-6 rounded-2xl border border-white/5 text-center">
            <div className="space-y-4">
              <FaCheckCircle
                className="text-green-500 mx-auto"
                size={40}
              />
              <h3 className="text-white font-bold text-lg">
                Reservation Confirmed
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
                Your property booking payment has been completed successfully
              </p>
              <Card className="bg-gray-800 ">
                <div className="text-white text-sm space-y-2 text-gray-400">
                  <p className="flex justify-between ">
                    <span>Email:</span>
                    <span>{session?.customer_email}  </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Booking ID:</span>
                    <span>{session?.payment_intent?.id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Booking Amount:</span>
                    <span>{session?.metadata?.totalRent} USD</span>
                  </p>

                </div>
              </Card>
            </div>
          </div>
          <CardFooter className="flex pt-4 justify-center">
            <Link href="/dashboard/tenant/my-bookings">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-extrabold h-11 px-8 
                  shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20" radius="lg" endContent={<FaArrowRight />}>
                View My Bookings
              </Button>
            </Link>
          </CardFooter>
        </>
      </Card>
    </div>
  )
}
