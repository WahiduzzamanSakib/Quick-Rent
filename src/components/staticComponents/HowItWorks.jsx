
import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";

const steps = [
    {
        icon: FiSearch,
        title: "Search",
        text: "Filter by location, property type and price to find places that fit.",
    },
    {
        icon: FiCalendar,
        title: "Login & Book",
        text: "Log in to your account, check the property details, and send your booking request to the owner.",
    },
    {
        icon: FiKey,
        title: "Move In",
        text: "Once the owner confirms your booking, coordinate with the owner and prepare to move in.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                        Simple Process
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        How it works
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
                        Three simple steps from searching to moving in.
                    </p>
                </div>

                {/* Steps */}
                <ol className="mt-12 grid gap-6 md:grid-cols-3">
                    {steps.map(({ icon: Icon, title, text }, i) => (
                        <li
                            key={title}
                            className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 sm:p-8"
                        >
                            {/* Step Number */}
                            <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                {i + 1}
                            </span>

                            {/* Icon */}
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                <Icon size={28} strokeWidth={1.8} />
                            </div>

                            <span className="mt-6 block text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                                Step {i + 1}
                            </span>

                            <h3 className="mt-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                                {title}
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-600 sm:text-base">
                                {text}
                            </p>

                            {/* Decorative Line */}
                            <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-600" />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
