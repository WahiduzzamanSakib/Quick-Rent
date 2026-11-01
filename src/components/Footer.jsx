import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiCheckCircle, FiShield, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300 mt-5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500">
                <Image
                  src="/quickrent.png"
                  alt="QuickRent Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Quick<span className="text-blue-500">Rent</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              The premier property rental platform connecting quality-seeking tenants with verified property owners. Fast, secure, and transparent booking everywhere.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <FiCheckCircle className="text-emerald-400" />
                <span>Verified Hosts</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <FiShield className="text-blue-400" />
                <span>Stripe Secure</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  About QuickRent
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Explore Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-to-works"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Guest Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Support & Trust
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#help"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about#standards"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Platform Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/#help"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Stay Connected */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Join our growing community of happy renters and verified property owners worldwide.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400 hover:scale-105"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:border-pink-500/50 hover:bg-pink-600/10 hover:text-pink-400 hover:scale-105"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:border-sky-500/50 hover:bg-sky-600/10 hover:text-sky-400 hover:scale-105"
              >
                <FaTwitter size={15} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400 hover:scale-105"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} QuickRent Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>
              Developed By{" "}
              <a
                href="https://waheduzzaman.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="https://waheduzzaman.vercel.app/"
                className="hover:underline hover:text-primary transition-colors duration-200 cursor-pointer text-white"
              >
                Md Waheduzzaman
              </a>
            </span>
            <FiHeart className="text-red-500 text-xs ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
