"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import ParticleLogo from "./ParticleLogo";
import logoDesktop from "../images/logo.png";
import logoMobile from "../images/logo1.png";

const EASE = [0.16, 1, 0.3, 1];

const container = (stagger = 0.12, delay = 0.2) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const fromLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fromRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fromBottom = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const FEATURES = [
    {
        label: ["Lean", "Muscle"],
        icon: (
            <path d="M6.5 18.5 L4.5 15.5 M4.5 15.5 H8 L7 18.5 Z M7 14 C7 10 9 6 12.5 6 C16 6 17.5 9 16 12 C14.5 15 15 17 18.5 18" />
        ),
    },
    {
        label: ["Fat", "Loss"],
        icon: <path d="M12 3c1 3-2 4-2 7a3 3 0 1 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a6 6 0 1 1-12 0c0-4 3-6 6-9z" />,
    },
    {
        label: ["Metabolic", "Health"],
        icon: (
            <>
                <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" />
                <path d="M12 8v4l3 2" />
            </>
        ),
    },
];

const HIGHLIGHTS = [
    { title: "Lab tested", text: "Every batch is tested for purity before it ships." },
    { title: "Verified batches", text: "Enter the code on your vial to confirm it is genuine." },
    { title: "Sealed vials", text: "Lyophilized powder, packed to stay stable." },
    { title: "Research use only", text: "Supplied for laboratory research purposes." },
];

export default function Home() {
    return (
        <LazyMotion features={domAnimation} strict>
            <main className="min-h-dvh bg-[#050b2e]">
                <section
                    data-navbar="dark"
                    className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#16337f] to-[#4a77da] font-sans md:flex-row md:items-center md:pb-36"
                >
                    {/* CSS radial gradients replace blur-3xl orb divs — same visual, no paint layer cost */}
                    <div
                        className="pointer-events-none absolute inset-0 z-0"
                        aria-hidden
                        style={{
                            background:
                                "radial-gradient(ellipse 65% 65% at -10% 40%, rgba(63,126,232,0.18) 0%, transparent 70%), radial-gradient(ellipse 70% 70% at 110% 45%, rgba(169,196,255,0.22) 0%, transparent 70%)",
                        }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[#050b2e]/60 to-transparent" />

                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={container(0.12, 0.3)}
                        className="contents md:flex md:w-[42%] md:flex-col md:gap-10 md:pl-14 md:pr-6"
                    >
                        <div className="relative z-10 order-1 px-6 pt-28 text-center md:px-0 md:pt-0 md:text-left">
                            <m.p
                                variants={fromLeft}
                                className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5b8def]"
                            >
                                Advanced Peptide Therapy
                            </m.p>

                            <h1 className="mt-4 text-[34px] leading-[1.08] text-white md:text-[52px]">
                                <m.span variants={fromLeft} className="block font-light">
                                    Optimize today.
                                </m.span>
                                <m.span variants={fromRight} className="block font-bold">
                                    Perform tomorrow.
                                </m.span>
                            </h1>

                            <m.p
                                variants={fromBottom}
                                className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/70 md:mx-0 md:text-lg"
                            >
                                Pure. Precise. Performance driven.
                                <br />
                                Unlock your body&apos;s full potential.
                            </m.p>
                        </div>

                        <div className="relative z-10 order-3 px-6 pb-10 pt-2 md:px-0 md:pb-0">
                            <m.div variants={fromBottom} className="flex items-start justify-center gap-5 text-white md:justify-start">
                                {FEATURES.map((f, i) => (
                                    <div key={f.label.join("")} className="flex items-start gap-5">
                                        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="h-6 w-6"
                                                stroke="white"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                {f.icon}
                                            </svg>
                                            <span className="text-[11px] font-medium uppercase leading-tight tracking-wide md:text-xs">
                                                {f.label[0]}
                                                <br />
                                                {f.label[1]}
                                            </span>
                                        </div>
                                        {i < FEATURES.length - 1 && <div className="mt-3 h-8 w-px bg-white/25" />}
                                    </div>
                                ))}
                            </m.div>

                            <m.button
                                variants={fromBottom}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                className="mx-auto mt-8 flex h-14 w-full max-w-[280px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg md:mx-0 md:w-56"
                            >
                                Explore Products
                                <span aria-hidden>→</span>
                            </m.button>
                        </div>
                    </m.div>

                    <ParticleLogo
                        theme="dark"
                        desktopLogo={logoDesktop}
                        mobileLogo={logoMobile}
                        className="relative z-[5] order-2 h-[38vh] min-h-[260px] w-full md:absolute md:bottom-36 md:right-0 md:top-0 md:h-auto md:w-[58%]"
                    />

                    <m.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
                        className="absolute inset-x-14 bottom-8 z-10 hidden grid-cols-4 gap-10 border-t border-white/10 pt-6 md:grid"
                    >
                        {HIGHLIGHTS.map((item) => (
                            <div key={item.title}>
                                <p className="text-sm font-semibold text-white">{item.title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-white/55">{item.text}</p>
                            </div>
                        ))}
                    </m.div>
                </section>
            </main>
        </LazyMotion>
    );
}