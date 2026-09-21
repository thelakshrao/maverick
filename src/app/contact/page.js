"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styleproduct2 from "@/images/styleproduct2.png";
import athleteWoman from "@/images/styleimage5.webp";
import athleteMan from "@/images/styleimage6.webp";
import heroLab from "@/images/quality-hero-lab.jpg";
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
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE } },
    };
}

const popIn = {
    hidden: { opacity: 0, scale: 0.85, rotate: -6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, duration: 0.9 },
    },
};

function IconMail({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
            <path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconClock({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconHandshake({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M3 11.5 8 8l3 2.2M21 11.5 16 8l-3 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m8 12.5 2.6 2.2a1.6 1.6 0 0 0 2.3-.2l.1-.1a1.6 1.6 0 0 0-.1-2.2L11 10.4M16 12.5l-2.6 2.2a1.6 1.6 0 0 1-2.3-.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 11.5v5.3c0 .7.5 1.2 1.2 1.2H6M21 11.5v5.3c0 .7-.5 1.2-1.2 1.2H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

const POINTS = [
    {
        Icon: IconMail,
        title: "Real people, real answers",
        detail: "Every message is read by our team — not a bot, not a ticket queue.",
    },
    {
        Icon: IconClock,
        title: "We reply within 24 hours",
        detail: "Usually much sooner, on business days.",
    },
    {
        Icon: IconHandshake,
        title: "Vendors & partners welcome",
        detail: "Stockist inquiries and institutional collaborations go straight to the team above.",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState("idle");

    function update(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
        setStatus("sending");
        setTimeout(() => setStatus("sent"), 1000);
    }

    return (
        <main className="w-full min-h-dvh overflow-x-hidden bg-[#eef1f6]">
            <Navbar />

            <section data-navbar="light" className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" aria-hidden>
                    <Image src={styleproduct2} alt="" fill sizes="100vw" className="object-cover object-[15%_center]" />
                </div>

                <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2 md:gap-12">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
                        <motion.p variants={edgeVariants("top")} className="text-xs font-medium uppercase tracking-[0.3em] text-[#12306e]/50">
                            Get in touch
                        </motion.p>

                        <motion.h1 variants={edgeVariants("left")} className="mt-4 text-[32px] font-bold leading-[1.1] text-[#12306e] md:text-[44px]">
                            Let&apos;s talk peptides, protocols, or partnerships.
                        </motion.h1>

                        <motion.p variants={edgeVariants("right")} className="mt-4 max-w-md text-sm leading-relaxed text-[#12306e]/60 md:text-base">
                            Questions about a product, a batch, or becoming an official
                            stockist — the form on the right goes straight to the people
                            who can actually help.
                        </motion.p>

                        <motion.div
                            variants={container}
                            className="mt-8 grid grid-cols-2 gap-3 sm:hidden"
                        >
                            {[
                                { src: athleteWoman, alt: "An athlete who trusts Maveric Lab" },
                                { src: heroLab, alt: "Lab technician verifying a batch" },
                                { src: athleteMan, alt: "Training with confidence in what you're taking" },
                                { src: coaSealMacro, alt: "Maveric Lab holographic verification seal" },
                            ].map((img, i) => (
                                <motion.div
                                    key={img.alt}
                                    variants={edgeVariants(i % 2 === 0 ? "left" : "right")}
                                    className="relative h-32 overflow-hidden rounded-2xl shadow-sm"
                                >
                                    <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={edgeVariants("bottom")}
                            className="relative mt-12 hidden h-[380px] sm:block md:h-[420px]"
                        >
                            <motion.div
                                variants={popIn}
                                whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                                style={{ rotate: -6 }}
                                className="absolute left-0 top-0 h-[220px] w-[64%] overflow-hidden rounded-[24px] shadow-[0_25px_50px_-20px_rgba(18,48,110,0.4)] ring-4 ring-white"
                            >
                                <Image src={athleteWoman} alt="An athlete who trusts Maveric Lab" fill sizes="320px" className="object-cover" />
                            </motion.div>

                            <motion.div
                                variants={popIn}
                                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
                                style={{ rotate: 5 }}
                                className="absolute right-0 top-6 h-[190px] w-[48%] overflow-hidden rounded-[22px] shadow-[0_25px_50px_-20px_rgba(18,48,110,0.4)] ring-4 ring-white"
                            >
                                <Image src={heroLab} alt="Lab technician verifying a batch" fill sizes="260px" className="object-cover" />
                            </motion.div>

                            <motion.div
                                variants={popIn}
                                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
                                style={{ rotate: 4 }}
                                className="absolute bottom-0 left-6 h-[190px] w-[52%] overflow-hidden rounded-[22px] shadow-[0_25px_50px_-20px_rgba(18,48,110,0.4)] ring-4 ring-white"
                            >
                                <Image src={athleteMan} alt="Training with confidence in what you're taking" fill sizes="280px" className="object-cover" />
                            </motion.div>

                            <motion.div
                                variants={popIn}
                                whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.3 }}
                                style={{ rotate: -8 }}
                                className="absolute bottom-2 right-2 h-[130px] w-[34%] overflow-hidden rounded-[20px] shadow-[0_25px_50px_-20px_rgba(18,48,110,0.4)] ring-4 ring-white"
                            >
                                <Image src={coaSealMacro} alt="Maveric Lab holographic verification seal" fill sizes="180px" className="object-cover" />
                            </motion.div>
                        </motion.div>

                        <motion.div variants={container} className="mt-10 space-y-5 sm:mt-8">
                            {POINTS.map(({ Icon, title, detail }) => (
                                <motion.div key={title} variants={edgeVariants("left")} className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#12306e]/8 text-[#274690]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#12306e]">{title}</p>
                                        <p className="mt-0.5 text-sm text-[#12306e]/60">{detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={edgeVariants("right")}
                        className="rounded-[28px] border border-[#12306e]/10 bg-white p-7 shadow-[0_30px_70px_-35px_rgba(18,48,110,0.35)] md:p-9"
                    >
                        <AnimatePresence mode="wait">
                            {status === "sent" ? (
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                                        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                                            <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="mt-5 text-lg font-bold text-[#12306e]">Message sent.</h3>
                                    <p className="mt-2 max-w-xs text-sm text-[#12306e]/60">
                                        Thanks, {form.name.split(" ")[0] || "there"} — we&apos;ll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setForm({ name: "", email: "", phone: "", message: "" });
                                            setStatus("idle");
                                        }}
                                        className="mt-6 text-sm font-medium text-[#12306e] underline underline-offset-2"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                >
                                    <p className="text-xs font-bold uppercase tracking-wide text-[#12306e]/50">
                                        Send us a message
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold text-[#12306e]">We&apos;d love to hear from you.</h2>

                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[#12306e]/60">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={update("name")}
                                                placeholder="Jane Doe"
                                                className="w-full rounded-xl border border-[#12306e]/15 bg-[#eef1f6]/60 px-4 py-3 text-sm text-[#12306e] placeholder-[#12306e]/30 outline-none transition-colors focus:border-[#3f7ee8]/60 focus:bg-white"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[#12306e]/60">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={form.email}
                                                    onChange={update("email")}
                                                    placeholder="jane@email.com"
                                                    className="w-full rounded-xl border border-[#12306e]/15 bg-[#eef1f6]/60 px-4 py-3 text-sm text-[#12306e] placeholder-[#12306e]/30 outline-none transition-colors focus:border-[#3f7ee8]/60 focus:bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-[#12306e]/60">
                                                    Phone <span className="text-[#12306e]/35">(optional)</span>
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={form.phone}
                                                    onChange={update("phone")}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full rounded-xl border border-[#12306e]/15 bg-[#eef1f6]/60 px-4 py-3 text-sm text-[#12306e] placeholder-[#12306e]/30 outline-none transition-colors focus:border-[#3f7ee8]/60 focus:bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-[#12306e]/60">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                value={form.message}
                                                onChange={update("message")}
                                                placeholder="Tell us what you need..."
                                                className="w-full resize-none rounded-xl border border-[#12306e]/15 bg-[#eef1f6]/60 px-4 py-3 text-sm text-[#12306e] placeholder-[#12306e]/30 outline-none transition-colors focus:border-[#3f7ee8]/60 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={status === "sending"}
                                        className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#12306e] text-sm font-semibold text-white shadow-lg disabled:opacity-70"
                                    >
                                        {status === "sending" ? (
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                            />
                                        ) : (
                                            <>
                                                Send message
                                                <span aria-hidden>→</span>
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="mt-4 text-center text-[11px] text-[#12306e]/40">
                                        By submitting, you agree to be contacted about your inquiry.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}