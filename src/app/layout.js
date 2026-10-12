import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://quick-rent-ecru.vercel.app"),
  title: "Quick Rent | Property Rental & Booking Platform",
  description:
    "Discover a curated collection of premier properties designed for exceptional living. From modern urban retreats to serene coastal escapes, find your perfect stay.",
  openGraph: {
    title: "Quick Rent | Find Your Perfect Stay",
    description:
      "Discover a curated collection of premier properties designed for exceptional living.",
    url: "https://quick-rent-ecru.vercel.app",
    siteName: "Quick Rent",
    images: [
      {
        url: "/Quick-Rent.png",
        width: 1200,
        height: 630,
        alt: "Quick Rent - Find Your Perfect Stay",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Rent | Find Your Perfect Stay",
    description:
      "Discover a curated collection of premier properties designed for exceptional living.",
    images: ["/Quick-Rent.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <ToastContainer position="top-right" autoClose={3000} />
        <Analytics />
      </body>
    </html>
  );
}