
import Link from "next/link";
import {
  HiShieldCheck,
  HiCurrencyDollar,
  HiLightningBolt,
  HiSupport,
  HiArrowRight,
} from "react-icons/hi";

const reasons = [
  {
    icon: HiShieldCheck,
    title: "Every listing is checked",
    text: "Owners are verified and each property is reviewed before it goes live, so what you see is what you get.",
  },
  {
    icon: HiCurrencyDollar,
    title: "Clear prices",
    text: "Monthly rent is shown up front. No hidden fees when you book.",
  },
  {
    icon: HiLightningBolt,
    title: "Book in minutes",
    text: "Search, pick a property and send your booking request without leaving the page.",
  },
  {
    icon: HiSupport,
    title: "Help when you need it",
    text: "Our support team answers questions before, during and after your stay.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why people rent with QuickRent
          </h2>

          <p className="mt-4 max-w-lg text-slate-600">
            We connect tenants with trusted property owners across Bangladesh.
            Apartments, houses, offices and shops are all listed in one place,
            with the details you need to decide quickly.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
          >
            About QuickRent
            <HiArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <Icon className="text-blue-600" size={26} />

              <h3 className="mt-3 font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
