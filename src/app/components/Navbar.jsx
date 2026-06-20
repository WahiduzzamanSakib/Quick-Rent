"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/properties" },
  ];

  const isActive = (path) => pathname === path;

  const baseLinkClass =
    "text-md font-semibold text-black hover:text-sky-600 transition";

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/quickrent.png"
            alt="QuickRent Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-black">
            QuickRent
          </span>
        </Link>

        {/* CENTER NAV */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${baseLinkClass} ${
                isActive(link.path) ? "text-sky-600" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT AUTH */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Link
            href="/login"
            className={`${baseLinkClass} ${
              isActive("/login") ? "text-sky-600" : ""
            }`}
          >
            Login
          </Link>

          <Link href="/register">
            <Button
              color="primary"
              size="sm"
              className="text-black font-bold hover:bg-sky-600"
            >
              Register
            </Button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden text-black">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <HiX size={26} />
            ) : (
              <HiMenu size={26} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`${baseLinkClass} ${
                isActive(link.path) ? "text-sky-600" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className={`${baseLinkClass} ${
              isActive("/login") ? "text-sky-600" : ""
            }`}
          >
            Login
          </Link>

          <Link href="/register" onClick={() => setOpen(false)}>
            <Button
              className="w-full text-black hover:bg-sky-600"
              color="primary"
              size="sm"
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}