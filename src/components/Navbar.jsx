"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role.toLowerCase();


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/properties" },
  ];
  

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successfully");
      router.push("/"); // 👈 redirect to home
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setAvatarOpen(false);
      setOpen(false);
    }
  };
  const isActive = (path) => pathname === path;

  const baseLinkClass =
    "text-md font-semibold text-black hover:text-sky-600 transition";

  const isLoggedIn = !!session?.user;

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">


        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/quickrent.png" alt="QuickRent Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-black">QuickRent</span>
        </Link>


        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${baseLinkClass} ${isActive(link.path) ? "text-sky-600" : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>


        <div className="hidden md:flex items-center gap-4 shrink-0 relative">

          {isLoggedIn ? (
            <>

              <div className="relative">
                <button
                  className="cursor-pointer rounded-full overflow-hidden"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                >
                  <Image
                    src={session?.user?.image || "/avatar.png"}
                    alt="avatar"
                    width={40}
                    height={36}
                    className="rounded-full"
                  />
                </button>


                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md overflow-hidden">
                    <Link
                      href={`/dashboard/${role}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setAvatarOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>

              <Link
                href="/login"
                className={`${baseLinkClass} ${isActive("/login") ? "text-sky-600" : ""
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
            </>
          )}
        </div>

        <div className="md:hidden text-black">
          <button onClick={() => setOpen(!open)}>
            {open ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>


      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`${baseLinkClass} ${isActive(link.path) ? "text-sky-600" : ""
                }`}
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={baseLinkClass}
              >
                Login
              </Link>

              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full text-black hover:bg-sky-600" color="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/dashboard/${role}`}
                className="text-blue-500"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}