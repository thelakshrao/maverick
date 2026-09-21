"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import MavericVerify from "@/components/Mavericverify";
import Footer from "@/components/Footer";

import styleproduct1 from "@/images/styleproduct1.png";
import heroLab from "@/images/quality-hero-lab.jpg";
import processHplc from "@/images/quality-process-hplc.jpg";
import coaSealMacro from "@/images/quality-coa-seal.jpg";

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
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.7, ease: EASE },
        },
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

function IconTrace({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="18" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
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

const STATS = [
    { value: "99.9%", label: "Average verified purity" },
    { value: "100%", label: "Batches HPLC-tested" },
    { value: "3rd-Party", label: "Independent verification" },
    { value: "1-of-1", label: "Unique code per unit" },
];

const PROMISES = [
    {
        edge: "left",
        Icon: IconPrecision,
        title: "Precision manufacturing",
        detail: "Produced in-house under pharmaceutical-grade conditions — no outsourced blends, no shortcuts.",
    },
    {
        edge: "top",
        Icon: IconFlask,
        title: "Rigorous testing",
        detail: "Every batch is HPLC-analysed to confirm identity, assay, and purity before it's released.",
    },
    {
        edge: "bottom",
        Icon: IconTrace,
        title: "Clean & traceable",
        detail: "Clean excipients, sterile processes, and full traceability from raw material to sealed pack.",
    },
    {
        edge: "right",
        Icon: IconShield,
        title: "Independently verified",
        detail: "Results are confirmed by an independent laboratory — the label is proven, not just printed.",
    },
];

const PROCESS_STEPS = [
    {
        title: "Raw materials",
        detail: "Pharmaceutical-grade inputs, identity-checked on intake.",
    },
    {
        title: "In-house synthesis",
        detail: "Made under controlled, pharma-grade conditions. No outsourced blends.",
    },
    {
        title: "HPLC assay",
        detail: "Every batch analysed to confirm identity, assay, and purity.",
    },
    {
        title: "Independent lab",
        detail: "A third-party laboratory re-tests to confirm the result.",
    },
    {
        title: "Sealed + coded",
        detail: "Sealed with a holographic seal and a unique one-time verification code.",
    },
];

const COA_ROWS = [
    { test: "Appearance", spec: "White lyophilized cake", result: "Conforms" },
    { test: "Identity", spec: "Conforms to reference", result: "Conforms" },
    { test: "Assay", spec: "98.0 – 102.0%", result: "99.9%" },
    { test: "Related substances", spec: "≤ 1.0%", result: "0.3%" },
    { test: "Sterility", spec: "Pass", result: "Pass" },
];

const COA_EXPLAINER = [
    {
        title: "Identity",
        detail: "Confirms the product is exactly the compound named on the label — not a substitute, not a guess.",
    },
    {
        title: "Assay",
        detail: "Measures how much active ingredient is actually present, checked against a tight specification range.",
    },
    {
        title: "Purity",
        detail: "Quantifies related substances left over from synthesis — the lower the number, the cleaner the batch.",
    },
];

export default function QualityPage() {
    return (
        <main className="w-full min-h-dvh bg-[#eef1f6] overflow-x-hidden">
            <Navbar />

            <section
                data-navbar="dark"
                className="relative overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8] pt-32 pb-24 md:pt-40 md:pb-32"
            >
                <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
                    <Image
                        src={styleproduct1}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover object-[80%_center]"
                    />
                </div>
                <FloatingOrb
                    className="-left-24 top-1/3 h-[420px] w-[420px] bg-[#5b8def]/40"
                    duration={9}
                />
                <FloatingOrb
                    className="right-0 bottom-0 h-[320px] w-[320px] bg-[#8fb8ff]/30"
                    duration={11}
                    delay={1.2}
                    driftX={-14}
                    driftY={16}
                />

                <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={container}
                    >
                        <motion.p
                            variants={edgeVariants("top")}
                            className="text-xs font-medium uppercase tracking-[0.3em] text-white/60"
                        >
                            Quality &amp; Testing
                        </motion.p>

                        <motion.h1
                            variants={edgeVariants("left")}
                            className="mt-6 text-[34px] leading-[1.15] text-white md:text-[52px] md:leading-[1.1]"
                        >
                            <span className="block font-light">Quality you can trust,</span>
                            <span className="block font-bold">
                                down to the{" "}
                                <span className="bg-gradient-to-r from-[#8fb8ff] to-[#5b8def] bg-clip-text text-transparent">
                                    molecule
                                </span>
                                .
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={edgeVariants("right")}
                            className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
                        >
                            Every Maveric Lab product is made in-house under
                            pharmaceutical-grade conditions and independently tested —
                            so what&apos;s on the label is what&apos;s inside, every time.
                        </motion.p>

                        <motion.div
                            variants={container}
                            className="mt-12 grid max-w-md grid-cols-2 gap-x-6 gap-y-8"
                        >
                            {STATS.map((stat) => (
                                <motion.div key={stat.label} variants={popIn}>
                                    <div className="text-2xl font-bold text-white md:text-3xl">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
                                        {stat.label}
                                    </div>
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
                            <Image
                                src={heroLab}
                                alt="Lab technician inspecting a Maveric Lab vial"
                                fill
                                sizes="(min-width: 768px) 480px, 90vw"
                                className="object-cover"
                                priority
                            />
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
                                    <div className="text-sm font-bold text-[#12306e]">
                                        Batch Verified
                                    </div>
                                    <div className="text-[11px] text-[#12306e]/60">
                                        Scan · Verify · Track
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section
                data-navbar="light"
                className="relative z-10 mx-auto mt-24 max-w-6xl px-4 md:mt-32 md:px-6"
            >
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("top")}
                    className="mb-4 text-center text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50 md:text-left"
                >
                    Our standards
                </motion.p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PROMISES.map(({ edge, Icon, title, detail }, i) => (
                        <motion.div
                            key={title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={edgeVariants(edge)}
                            whileHover={cardHover}
                            transition={{ delay: i * 0.06 }}
                            className="rounded-3xl border border-[#12306e]/10 bg-white p-6 shadow-[0_20px_45px_-25px_rgba(18,48,110,0.35)]"
                        >
                            <motion.div
                                whileHover={{ rotate: 8, scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#12306e]/8 text-[#274690]"
                            >
                                <Icon className="h-5 w-5" />
                            </motion.div>
                            <h3 className="mt-5 text-[15px] font-bold text-[#12306e]">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#12306e]/60">{detail}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section
                data-navbar="dark"
                className="relative mt-24 overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690] md:mt-32"
            >
                <FloatingOrb
                    className="right-1/4 top-0 h-[300px] w-[300px] bg-[#5b8def]/25"
                    duration={10}
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
                        <div>
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={edgeVariants("top")}
                                className="text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                            >
                                The process
                            </motion.p>

                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={edgeVariants("left")}
                                className="mt-4 max-w-xl text-[28px] font-bold leading-tight text-white md:text-[36px]"
                            >
                                How every batch is proven.
                            </motion.h2>

                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={edgeVariants("right")}
                                className="mt-4 max-w-xl text-sm leading-relaxed text-white/60"
                            >
                                From raw material to a sealed, verifiable unit — five
                                steps, none of them skipped.
                            </motion.p>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={edgeVariants("right")}
                            className="relative h-[180px] md:h-[220px]"
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-[24px] ring-1 ring-white/10">
                                <Image
                                    src={processHplc}
                                    alt="HPLC testing equipment used to verify each batch"
                                    fill
                                    sizes="(min-width: 768px) 400px, 90vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050b2e]/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>

                    <motion.ol
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={container}
                        className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                            style={{ transformOrigin: "left" }}
                            className="pointer-events-none absolute left-0 right-0 top-4 hidden h-px bg-gradient-to-r from-white/0 via-white/25 to-white/0 lg:block"
                            aria-hidden
                        />

                        {PROCESS_STEPS.map((step, i) => (
                            <motion.li
                                key={step.title}
                                variants={edgeVariants(i % 2 === 0 ? "bottom" : "top")}
                                whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.07)" }}
                                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 140, damping: 14 }}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white"
                                >
                                    {i + 1}
                                </motion.div>
                                <h3 className="mt-4 text-sm font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-white/55">
                                    {step.detail}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("top")}
                    className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50"
                >
                    Certificate of Analysis
                </motion.p>

                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("left")}
                    className="mt-4 max-w-lg text-[28px] font-bold leading-tight text-[#12306e] md:text-[36px]"
                >
                    What a sample COA looks like.
                </motion.h2>

                <div className="relative mt-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={edgeVariants("bottom")}
                        whileHover={cardHover}
                        className="overflow-hidden rounded-3xl border border-[#12306e]/10 bg-white shadow-[0_30px_70px_-35px_rgba(18,48,110,0.35)]"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#12306e]/10 bg-[#12306e]/[0.03] px-6 py-5 sm:px-8">
                            <div>
                                <p className="text-sm font-bold text-[#12306e]">
                                    Tesamoreline 10 mg — Lyophilized Powder
                                </p>
                                <p className="mt-0.5 text-xs text-[#12306e]/50">
                                    Batch ML-2603 · Method HPLC (RP)
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ scale: [1, 1.06, 1] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                    className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 sm:inline-flex"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    PASS
                                </motion.div>
                                <div className="relative h-12 w-12 flex-none overflow-hidden rounded-xl ring-1 ring-[#12306e]/10 sm:hidden">
                                    <Image
                                        src={coaSealMacro}
                                        alt="Maveric Lab holographic verification seal"
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-[#12306e]/10 px-6 py-5 text-xs text-[#12306e]/60 sm:grid-cols-4 sm:px-8">
                            <div>
                                <p className="text-[10px] uppercase tracking-wide text-[#12306e]/40">
                                    Manufactured
                                </p>
                                <p className="mt-1 font-medium text-[#12306e]">04 Jan 2026</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wide text-[#12306e]/40">
                                    Tested
                                </p>
                                <p className="mt-1 font-medium text-[#12306e]">10 Jan 2026</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[480px] text-left text-sm">
                                <thead>
                                    <tr className="text-[11px] uppercase tracking-wide text-[#12306e]/40">
                                        <th className="px-6 py-3 font-medium sm:px-8">Test</th>
                                        <th className="px-6 py-3 font-medium sm:px-8">Specification</th>
                                        <th className="px-6 py-3 font-medium sm:px-8">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COA_ROWS.map((row, i) => (
                                        <motion.tr
                                            key={row.test}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.6 }}
                                            transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
                                            className="border-t border-[#12306e]/10 text-[#12306e]"
                                        >
                                            <td className="px-6 py-3 font-medium sm:px-8">{row.test}</td>
                                            <td className="px-6 py-3 text-[#12306e]/60 sm:px-8">{row.spec}</td>
                                            <td className="px-6 py-3 font-semibold sm:px-8">{row.result}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="border-t border-[#12306e]/10 px-6 py-4 text-[11px] text-[#12306e]/40 sm:px-8">
                            Analysed by an independent laboratory. Representative sample
                            shown for illustration.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 110, damping: 15 }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        className="absolute -right-4 -top-10 hidden h-28 w-28 overflow-hidden rounded-2xl shadow-[0_20px_45px_-15px_rgba(18,48,110,0.5)] ring-2 ring-white sm:block md:-right-10 md:h-32 md:w-32"
                    >
                        <Image
                            src={coaSealMacro}
                            alt="Macro shot of a Maveric Lab holographic verification seal"
                            fill
                            sizes="160px"
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("top")}
                    className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50"
                >
                    Read the proof
                </motion.p>

                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("left")}
                    className="mt-4 max-w-lg text-[28px] font-bold leading-tight text-[#12306e] md:text-[36px]"
                >
                    What a Certificate of Analysis tells you.
                </motion.h2>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
                >
                    {COA_EXPLAINER.map((item, i) => (
                        <motion.div
                            key={item.title}
                            variants={edgeVariants(i === 0 ? "left" : i === 1 ? "bottom" : "right")}
                            whileHover={cardHover}
                            className="rounded-2xl border border-[#12306e]/10 bg-white p-6"
                        >
                            <h3 className="text-sm font-bold text-[#12306e]">{item.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#12306e]/60">
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <MavericVerify />

            <Footer />
        </main>
    );
}