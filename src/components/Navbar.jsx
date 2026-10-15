
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role?.toLowerCase();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/properties" },
    { name: "About Us", path: "/about" },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setAvatarOpen(false);
      setOpen(false);
    }
  };

  const isActive = (path) => pathname === path;
  const isLoggedIn = !!session?.user;

  const baseLinkClass =
    "relative text-md font-semibold text-black border p-2 rounded-md transition-colors duration-200 hover:border-blue-600 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-600 after:transition-transform after:duration-300 after:content-[''] after:scale-x-0";

  const activeLinkClass =
    "border-blue-600 text-blue-600";
  // const activeLinkClass =
  //   "border-blue-600 text-blue-600 after:scale-x-100";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/quickrent.png"
            alt="QuickRent Logo"
            width={42}
            height={42}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Quick<span className="text-blue-600">Rent</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${baseLinkClass} ${isActive(link.path) ? activeLinkClass : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="relative hidden shrink-0 items-center gap-4 md:flex">
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Open user menu"
                aria-expanded={avatarOpen}
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex h-12 items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md"
              >
                <Image
                  src={session?.user?.image || "/avatar.png"}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />

                <HiChevronDown
                  size={18}
                  className={`shrink-0 text-slate-500 transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {avatarOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/60">
                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() => setAvatarOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`${baseLinkClass} ${isActive("/login") ? "text-blue-600" : ""
                  }`}
              >
                Login
              </Link>

              <Link href="/register">
                <Button
                  color="primary"
                  size="md"
                  className="rounded-lg px-5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
        >
          {open ? <HiX size={23} /> : <HiMenu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 ${isActive(link.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100" />

            {!isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-lg font-semibold text-white transition-colors hover:bg-blue-700"
                    color="primary"
                    size="md"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <Link
                  href={`/dashboard/${role}`}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
