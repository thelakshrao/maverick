"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import athleteWoman from "@/images/styleimage2.webp";
import athleteMan from "@/images/styleimage3.webp";
import styleproduct1 from "@/images/styleproduct1.png";
import styleproduct2 from "@/images/styleproduct2.png";

const OFFSET = 64;

const edgeOffset = {
    left: { x: -OFFSET, y: 0 },
    right: { x: OFFSET, y: 0 },
    top: { x: 0, y: -OFFSET },
    bottom: { x: 0, y: OFFSET },
};

function reveal(edge = "bottom", delay = 0, duration = 0.7) {
    const { x, y } = edgeOffset[edge];
    return {
        initial: { opacity: 0, x, y },
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" },
        transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
    };
}

function IconPrecision({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8.2V12l2.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2.6v1.6M12 19.8v1.6M21.4 12h-1.6M4.2 12H2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function IconFlask({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M10 3h4M10 3v6.2L5.4 18a2 2 0 0 0 1.8 2.9h9.6a2 2 0 0 0 1.8-2.9L14 9.2V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 15.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function IconShield({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 3.2 19 6v5.4c0 4.6-3 7.9-7 9.4-4-1.5-7-4.8-7-9.4V6l7-2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 12.3l2 2 4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconTrophy({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M7 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5v.5C3 9.5 5 11 7 11M17 5h2.5A1.5 1.5 0 0 1 21 6.5v.5c0 2.5-2 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 13v3.5M9 20.5h6M9.5 20.5c0-1.7.9-2.6 2.5-2.6s2.5.9 2.5 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const STANDARDS = [
    {
        edge: "left",
        Icon: IconPrecision,
        title: "Precision manufacturing",
        detail: "Produced in-house under pharmaceutical-grade conditions. No outsourced blends, no shortcuts.",
    },
    {
        edge: "top",
        Icon: IconFlask,
        title: "Rigorous testing & verification",
        detail: "Every batch is HPLC-analysed by an independent lab to confirm identity, assay, and purity.",
    },
    {
        edge: "bottom",
        Icon: IconShield,
        title: "Health & safety first",
        detail: "Clean excipients, sterile processes, and full traceability from raw material to sealed pack.",
    },
    {
        edge: "right",
        Icon: IconTrophy,
        title: "Trusted by professionals",
        detail: "Formulated and dosed to the standards that top athletes and their coaches rely on.",
    },
];

export default function OurStandards() {
    return (
        <main className="bg-[#eef1f6]">
            <section data-navbar="dark" className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8] pb-24">
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                    <Image
                        src={styleproduct1}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover object-[80%_center]"
                    />
                </div>

                <div
                    className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#5b8def]/40 blur-3xl"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#8fb8ff]/30 blur-3xl"
                    aria-hidden
                />

                <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16 text-center md:pt-24">
                    <motion.p
                        {...reveal("top", 0.05)}
                        className="text-xs font-medium uppercase tracking-[0.3em] text-white/60"
                    >
                        Our Standards
                    </motion.p>

                    <h1 className="mt-6 text-[34px] leading-[1.15] text-white md:text-[52px] md:leading-[1.1]">
                        <motion.span {...reveal("left", 0.15)} className="block font-light">
                            Quality you can trust,
                        </motion.span>
                        <motion.span {...reveal("right", 0.28)} className="block font-bold">
                            down to the molecule.
                        </motion.span>
                    </h1>

                    <motion.p
                        {...reveal("bottom", 0.42)}
                        className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
                    >
                        From raw material sourcing to final packaging, every step is documented
                        and independently verified — so what&apos;s on the label is exactly
                        what&apos;s in the vial.
                    </motion.p>

                    <motion.div
                        {...reveal("bottom", 0.55)}
                        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-wide text-white/50"
                    >
                        <span>Third-Party Tested</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>cGMP Compliant</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>Full COA on Request</span>
                    </motion.div>
                </div>
            </section>

            <section data-navbar="light" className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 md:-mt-20 md:px-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {STANDARDS.map(({ edge, Icon, title, detail }, i) => (
                        <motion.div
                            key={title}
                            {...reveal(edge, 0.1 + i * 0.08)}
                            className="rounded-3xl border border-[#12306e]/10 bg-white p-6 shadow-[0_20px_45px_-25px_rgba(18,48,110,0.35)]"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#12306e]/8 text-[#274690]">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-5 text-[15px] font-bold text-[#12306e]">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#12306e]/60">{detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section data-navbar="dark" className="relative mt-24 overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690] md:mt-32">
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                    <Image
                        src={styleproduct2}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover object-[20%_center]"
                    />
                </div>

                <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-0 px-6 py-16 md:grid-cols-2 md:py-24">
                    <motion.div {...reveal("left", 0.1)} className="order-2 md:order-1 mt-8 md:mt-0">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                            Verified, batch by batch
                        </p>
                        <h2 className="mt-4 text-[28px] font-bold leading-tight text-white md:text-[36px]">
                            Nothing ships until the lab confirms it.
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                            Every production run is sent to an independent, third-party lab for
                            HPLC analysis before it&apos;s cleared for sale. Identity, assay, and
                            purity are confirmed — not assumed.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-6">
                            {[
                                { value: "99%+", label: "Purity" },
                                { value: "100%", label: "Batches tested" },
                                { value: "0", label: "Outsourced blends" },
                            ].map((stat, i) => (
                                <motion.div key={stat.label} {...reveal("bottom", 0.3 + i * 0.1)}>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        {...reveal("right", 0.15)}
                        className="order-1 md:order-2 relative h-[280px] md:h-[420px]"
                    >
                        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[#5b8def]/20 blur-2xl" />
                        <div className="relative h-full w-full overflow-hidden rounded-[28px] ring-1 ring-white/10">
                            <Image
                                src={athleteMan}
                                alt="Athlete training, verified by lab-tested performance products"
                                fill
                                sizes="(min-width: 768px) 480px, 90vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050b2e]/70 via-transparent to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section data-navbar="light" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                    <motion.div {...reveal("left", 0.1)} className="relative h-[320px] md:h-[460px]">
                        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                            <Image
                                src={athleteWoman}
                                alt="Athlete relying on Maveric Lab's verified quality standards"
                                fill
                                sizes="(min-width: 768px) 480px, 90vw"
                                className="object-cover"
                            />
                        </div>

                        <motion.div
                            {...reveal("bottom", 0.4)}
                            className="absolute -bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_45px_-20px_rgba(18,48,110,0.35)] md:left-8 md:right-auto md:w-64"
                        >
                            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#12306e]/8 text-[#274690]">
                                <IconShield className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#12306e]">Batch Verified</div>
                                <div className="text-[11px] text-[#12306e]/60">Scan · Verify · Track</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div {...reveal("right", 0.15)}>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50">
                            Trusted by professionals
                        </p>
                        <h2 className="mt-4 text-[28px] font-bold leading-tight text-[#12306e] md:text-[36px]">
                            Formulated to the standard athletes actually train by.
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#12306e]/60">
                            Coaches and competitors don&apos;t gamble on what they put in their
                            body. Every Maveric Lab product is dosed and documented to hold up
                            to that scrutiny, with a full Certificate of Analysis available on
                            request for anything in our range.
                        </p>

                        <motion.a
                            {...reveal("bottom", 0.35)}
                            href="/quality"
                            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#12306e] px-7 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-transform duration-150 ease-out active:scale-95"
                        >
                            See How
                            <span aria-hidden>→</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <motion.section
                {...reveal("bottom", 0.05, 0.8)}
                data-navbar="dark"
                className="relative mx-4 mb-16 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#12306e] to-[#050b2e] px-6 py-14 text-center md:mx-auto md:max-w-6xl md:py-20"
            >
                <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
                    <Image src={styleproduct1} alt="" fill sizes="100vw" className="object-cover object-center" />
                </div>

                <h2 className="relative text-2xl font-bold text-white md:text-3xl">
                    Every vial, traceable from source to seal.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
                    See the products behind the standards.
                </p>
                <button className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg transition-transform duration-150 ease-out active:scale-95">
                    Explore Products
                    <span aria-hidden>→</span>
                </button>
            </motion.section>
        </main>
    );
}