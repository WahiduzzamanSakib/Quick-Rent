import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-sky-400">QuickRent</h2>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            Find your perfect stay anywhere, anytime. Fast, secure, and seamless booking experience.
          </p>

         
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-slate-400 text-sm">

            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>

            <li>
              <Link href="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>

            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>

            <li>
              <Link href="/press" className="hover:text-white">
                Press
              </Link>
            </li>

          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-slate-400 text-sm">

            <li>
              <Link href="/help" className="hover:text-white">
                Help Center
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/cancellation" className="hover:text-white">
                Cancellation
              </Link>
            </li>

            <li>
              <Link href="/safety" className="hover:text-white">
                Safety
              </Link>
            </li>

          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>
          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <FaFacebookF size={24}/>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram size={24}/>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-300"
            >
              <FaTwitter size={24}/>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 rounded-full"
            >
              <FaLinkedin size={24}/>
            </a>
          </div>
        
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} QuickRent. All rights reserved.
      </div>

    </footer>
  );
}