"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { FiHome, FiGrid, FiInfo, FiLayout, FiLogOut, FiUser } from "react-icons/fi";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role?.toLowerCase();

  const navLinks = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "All Properties", path: "/properties", icon: FiGrid },
    { name: "About Us", path: "/about", icon: FiInfo },
  ];

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-xs backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/quickrent.png"
              alt="QuickRent Logo"
              width={34}
              height={34}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
              Quick<span className="text-blue-600">Rent</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Property & Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-md font-semibold rounded-lg transition-all duration-200 ${
                  active
                    ? "text-blue-600 bg-blue-50/80 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User / Auth Actions */}
        <div className="relative hidden shrink-0 items-center gap-3 md:flex" ref={menuRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Open user menu"
                aria-expanded={avatarOpen}
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="group flex items-center gap-3 rounded-full border border-slate-200/90 bg-white p-1 pr-3.5 shadow-xs transition-all duration-200 hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/20">
                  <Image
                    src={
                      session?.user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        session?.user?.name || "User"
                      )}&background=2563eb&color=fff&bold=true`
                    }
                    alt={session?.user?.name || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight line-clamp-1 max-w-[110px]">
                    {session?.user?.name || "User"}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                    {role || "member"}
                  </span>
                </div>
                <HiChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 group-hover:text-slate-600 ${
                    avatarOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {avatarOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-60 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/10 animate-fade-in-up">
                  {/* User summary header */}
                  <div className="rounded-xl bg-slate-50 p-3 mb-1.5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/${role || "profile"}`}
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiLayout className="text-sm text-blue-500" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FiUser className="text-sm text-slate-400" />
                    Profile Details
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    <FiLogOut className="text-sm" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive("/login")
                    ? "text-blue-600 bg-blue-50 font-bold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Sign In
              </Link>

              <Link href="/register">
                <Button
                  color="primary"
                  size="sm"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-98"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:hidden"
        >
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 pb-6 pt-3 shadow-xl backdrop-blur-md md:hidden animate-fade-in-up">
          <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon className={`text-base ${active ? "text-blue-600" : "text-slate-400"}`} />
                  {link.name}
                </Link>
              );
            })}

            <div className="my-2 border-t border-slate-100" />

            {!isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Sign In
                </Link>

                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    color="primary"
                    size="md"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 mb-1">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/20">
                    <Image
                      src={
                        session?.user?.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          session?.user?.name || "User"
                        )}&background=2563eb&color=fff&bold=true`
                      }
                      alt={session?.user?.name || "User"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {session?.user?.name}
                    </p>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                      {role || "member"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/${role || "profile"}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  <FiLayout className="text-base text-blue-500" />
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  <FiUser className="text-base text-slate-400" />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <FiLogOut className="text-base" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
