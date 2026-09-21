"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styleproduct1 from "@/images/styleproduct1.png";
import styleproduct2 from "@/images/styleproduct2.png";
import athleteWoman from "@/images/styleimage5.webp";
import athleteMan from "@/images/styleimage6.webp";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function edgeVariants(edge, distance = 48) {
    const offsets = {
        left: { x: -distance, y: 0 },
        right: { x: distance, y: 0 },
        top: { x: 0, y: -distance },
        bottom: { x: 0, y: distance },
    };
    const { x, y } = offsets[edge];
    return {
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE } },
    };
}

const popIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, duration: 0.9 },
    },
};

const cardHover = {
    y: -8,
    boxShadow: "0 30px 60px -25px rgba(18,48,110,0.35)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
};

function FloatingOrb({ className, duration = 8, delay = 0, driftX = 12, driftY = 20 }) {
    return (
        <motion.div
            aria-hidden
            className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
            animate={{ y: [0, -driftY, 0], x: [0, driftX, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
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

function IconFlask({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M10 3h4M10 3v6.2L5.4 18a2 2 0 0 0 1.8 2.9h9.6a2 2 0 0 0 1.8-2.9L14 9.2V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 15.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function IconDocument({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 12.5h6M9 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function IconHeadset({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="3" y="13" width="4" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            <rect x="17" y="13" width="4" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M19 18.5v.5a3 3 0 0 1-3 3h-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}


const STATS = [
    { value: "99%+", label: "Average verified purity" },
    { value: "100%", label: "Batches HPLC-tested" },
    { value: "3rd-Party", label: "Independent verification" },
    { value: "1-of-1", label: "Unique code per unit" },
];

const TEAM_STEPS = [
    {
        Icon: IconFlask,
        title: "Formulation chemists",
        detail: "Design and produce every compound in-house, under pharmaceutical-grade conditions.",
    },
    {
        Icon: IconShield,
        title: "QC & lab analysts",
        detail: "Run HPLC analysis on every batch and flag anything that doesn't meet spec.",
    },
    {
        Icon: IconDocument,
        title: "Compliance & documentation",
        detail: "Turn lab results into the Certificate of Analysis and verification record for that batch.",
    },
    {
        Icon: IconHeadset,
        title: "Verification & support",
        detail: "Answer every code check and question — the same team that tested it can talk you through it.",
    },
];

export default function AboutPage() {
    return (
        <main className="w-full min-h-dvh bg-[#eef1f6] overflow-x-hidden">
            <Navbar />

            <section
                data-navbar="dark"
                className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8] pt-32 pb-24 md:pt-40 md:pb-32"
            >
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                    <Image src={styleproduct2} alt="" fill sizes="100vw" className="object-cover object-[20%_center]" />
                </div>
                <FloatingOrb className="-left-24 top-1/3 h-[420px] w-[420px] bg-[#5b8def]/40" duration={9} />
                <FloatingOrb className="right-0 bottom-0 h-[320px] w-[320px] bg-[#8fb8ff]/30" duration={11} delay={1.2} driftX={-14} driftY={16} />

                <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={container}>
                        <motion.p variants={edgeVariants("top")} className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                            About Maveric Lab
                        </motion.p>

                        <motion.h1 variants={edgeVariants("left")} className="mt-6 text-[34px] leading-[1.15] text-white md:text-[52px] md:leading-[1.1]">
                            <span className="block font-light">Built for people</span>
                            <span className="block font-bold">
                                who don&apos;t{" "}
                                <span className="bg-gradient-to-r from-[#8fb8ff] to-[#5b8def] bg-clip-text text-transparent">
                                    guess
                                </span>
                                .
                            </span>
                        </motion.h1>

                        <motion.p variants={edgeVariants("right")} className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                            Maveric Lab exists for the athletes, coaches, and researchers
                            who need to know exactly what&apos;s in the vial — not take
                            someone&apos;s word for it. Everything we make, we make to be
                            checked.
                        </motion.p>

                        <motion.div variants={container} className="mt-12 grid max-w-md grid-cols-2 gap-x-6 gap-y-8">
                            {STATS.map((stat) => (
                                <motion.div key={stat.label} variants={popIn}>
                                    <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                                    <div className="mt-1 text-[11px] uppercase tracking-wide text-white/50">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={edgeVariants("right")}
                        className="relative h-[340px] sm:h-[420px] md:h-[480px]"
                    >
                        <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[#5b8def]/20 blur-2xl" />
                        <div className="relative h-full w-full overflow-hidden rounded-[32px] ring-1 ring-white/10">
                            <Image src={athleteWoman} alt="An athlete who relies on Maveric Lab's verified products" fill sizes="(min-width: 768px) 480px, 90vw" className="object-cover" priority />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050b2e]/60 via-transparent to-transparent" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 130, damping: 16 }}
                            className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto sm:w-64"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_45px_-20px_rgba(18,48,110,0.35)]"
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
                    </motion.div>
                </div>
            </section>

            <section data-navbar="light" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" aria-hidden>
                    <Image src={styleproduct1} alt="" fill sizes="100vw" className="object-cover object-[70%_center]" />
                </div>
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={edgeVariants("left")}
                        className="relative order-2 h-[280px] md:order-1 md:h-[380px]"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                            <Image src={athleteMan} alt="Training hard is easier when you trust what you're taking" fill sizes="(min-width: 768px) 480px, 90vw" className="object-cover" />
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={container} className="order-1 md:order-2">
                        <motion.p variants={edgeVariants("top")} className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50">
                            Our approach
                        </motion.p>

                        <motion.h2 variants={edgeVariants("right")} className="mt-4 text-[28px] font-bold leading-tight text-[#12306e] md:text-[36px]">
                            We&apos;d rather prove it than promise it.
                        </motion.h2>

                        <motion.p variants={edgeVariants("bottom")} className="mt-4 max-w-md text-sm leading-relaxed text-[#12306e]/60">
                            Most labels ask you to take them on faith. Ours doesn&apos;t
                            have to — every batch carries a code you can check yourself,
                            against results from a lab that has no reason to protect us.
                            If it doesn&apos;t pass, it doesn&apos;t ship. That&apos;s the
                            whole approach.
                        </motion.p>

                        <motion.div variants={edgeVariants("bottom")} className="mt-6 flex flex-wrap gap-3">
                            {["No outsourced blends", "No shortcuts", "No unverifiable claims"].map((tag) => (
                                <span key={tag} className="rounded-full border border-[#12306e]/15 px-4 py-1.5 text-xs font-medium text-[#12306e]/70">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section data-navbar="dark" className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                    <Image src={styleproduct1} alt="" fill sizes="100vw" className="object-cover object-[30%_center]" />
                </div>
                <FloatingOrb className="right-1/4 top-0 h-[300px] w-[300px] bg-[#5b8def]/25" duration={10} />

                <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr]">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={container}>
                            <motion.p variants={edgeVariants("top")} className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                                Science &amp; quality
                            </motion.p>

                            <motion.h2 variants={edgeVariants("left")} className="mt-4 max-w-xl text-[28px] font-bold leading-tight text-white md:text-[36px]">
                                The proof is in the batch.
                            </motion.h2>

                            <motion.p variants={edgeVariants("right")} className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                                Every product is made under pharmaceutical-grade conditions,
                                HPLC-tested, independently verified, and sealed with a code
                                you can check yourself. See exactly how — or confirm a
                                product you already have.
                            </motion.p>

                            <motion.div variants={edgeVariants("bottom")} className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/quality"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#12306e] shadow-lg transition-transform duration-150 ease-out active:scale-95"
                                >
                                    How we test
                                    <span aria-hidden>→</span>
                                </Link>
                                <Link
                                    href="/verify-code"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-transform duration-150 ease-out active:scale-95"
                                >
                                    Verify a product
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={container} className="grid grid-cols-2 gap-4">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    variants={edgeVariants(["left", "top", "bottom", "right"][i])}
                                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
                                >
                                    <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                                    <div className="mt-1 text-[11px] uppercase tracking-wide text-white/50">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <section data-navbar="light" className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" aria-hidden>
                    <Image src={styleproduct2} alt="" fill sizes="100vw" className="object-cover object-[85%_center]" />
                </div>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={edgeVariants("top")} className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50">
                    The people behind it
                </motion.p>

                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={edgeVariants("left")} className="mt-4 max-w-lg text-[28px] font-bold leading-tight text-[#12306e] md:text-[36px]">
                    How our team gets you a verified batch.
                </motion.h2>

                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={edgeVariants("right")} className="mt-4 max-w-xl text-sm leading-relaxed text-[#12306e]/60">
                    No headshots or titles competing for attention — just the hand-off
                    that happens on every single batch, from formulation to the person
                    who answers when you check a code.
                </motion.p>

                <motion.ol
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                        style={{ transformOrigin: "left" }}
                        className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-[#12306e]/0 via-[#12306e]/15 to-[#12306e]/0 lg:block"
                        aria-hidden
                    />

                    {TEAM_STEPS.map(({ Icon, title, detail }, i) => (
                        <motion.li
                            key={title}
                            variants={edgeVariants(i % 2 === 0 ? "bottom" : "top")}
                            whileHover={cardHover}
                            className="relative rounded-2xl border border-[#12306e]/10 bg-white p-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 140, damping: 14 }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12306e]/8 text-sm font-bold text-[#274690]"
                            >
                                {i + 1}
                            </motion.div>
                            <div className="mt-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#12306e]/8 text-[#274690]">
                                <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="mt-3 text-sm font-bold text-[#12306e]">{title}</h3>
                            <p className="mt-2 text-xs leading-relaxed text-[#12306e]/60">{detail}</p>
                        </motion.li>
                    ))}
                </motion.ol>
            </section>

            <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-4 text-center md:pb-32">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden>
                    <Image src={styleproduct1} alt="" fill sizes="100vw" className="object-cover object-center" />
                </div>
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={edgeVariants("top")}
                    className="text-[32px] font-bold leading-tight text-[#12306e] md:text-[44px]"
                >
                    Partner with Maveric.
                </motion.h2>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={edgeVariants("bottom")}
                    className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#12306e]/60 md:text-base"
                >
                    We collaborate with academic institutions, biotech innovators, and
                    patient communities to bring transformative medicines to the world.
                    We also work with established pharmaceutical vendors looking to
                    become official Maveric stockists.
                </motion.p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={container}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
                >
                    <motion.div variants={popIn}>
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#12306e] px-7 text-sm font-semibold text-white shadow-lg transition-transform duration-150 ease-out active:scale-95"
                        >
                            Get in touch
                        </Link>
                    </motion.div>
                    <motion.div variants={popIn}>
                        <Link
                            href="/"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-[#12306e]/15 bg-white px-7 text-sm font-semibold text-[#12306e] shadow-sm transition-transform duration-150 ease-out active:scale-95"
                        >
                            Maveric
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}