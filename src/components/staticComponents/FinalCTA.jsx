
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#050a30] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to find your next place?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          Browse verified properties or create a free account to start booking.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/properties"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-lg"
          >
            Browse properties
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
          >
            Create free account
          </Link>
        </div>
      </div>
    </section>
  );
}
