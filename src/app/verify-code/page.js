"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerificationModal from "@/components/VerificationModal";
import heroProduct from "@/images/heroproduct.png";
import styleproduct1 from "@/images/styleproduct1.png";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const rise = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function VerifyCodePage() {
    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!code1.trim() || !code2.trim() || loading) return;

        setLoading(true);
        try {
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code1, code2 }),
            });
            const data = await res.json();
            const validStatus = ["genuine", "used", "invalid", "error"].includes(data.status)
                ? data.status
                : "error";
            setResult(validStatus);
            setIsModalOpen(true);
        } catch {
            setResult("error");
            setIsModalOpen(true);
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setIsModalOpen(false);
        setCode1("");
        setCode2("");
        setResult(null);
    }

    return (
        <main
            data-navbar="dark"
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
                <Image
                    src={styleproduct1}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[70%_center]"
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

            <Navbar />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-28">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="w-full max-w-md"
                >
                    <motion.div variants={rise} className="mb-6 text-center">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                            Product Verification
                        </p>
                        <h1 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                            Is your vial the real thing?
                        </h1>
                    </motion.div>

                    <motion.div
                        variants={rise}
                        className="relative overflow-hidden rounded-[28px] border border-white/20 shadow-[0_40px_80px_-30px_rgba(5,11,46,0.6)]"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={heroProduct}
                                alt=""
                                fill
                                sizes="480px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#12306e]/85 via-[#12306e]/70 to-[#050b2e]/85" />
                        </div>

                        <div className="relative z-10 bg-white/[0.04] p-7 backdrop-blur-xl md:p-8">
                            <p className="text-xs font-bold uppercase tracking-wide text-white/70">
                                Enter both codes
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">
                                Enter both codes printed on your product — we confirm a
                                match once both are in.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                                <div className="flex overflow-hidden rounded-2xl border border-white/25">
                                    <label
                                        htmlFor="verify-code-1"
                                        className="flex w-28 flex-shrink-0 items-center justify-center bg-white/10 px-2 py-4 text-center text-xs font-bold uppercase tracking-wide text-white"
                                    >
                                        Code 1
                                    </label>
                                    <input
                                        id="verify-code-1"
                                        type="text"
                                        value={code1}
                                        onChange={(e) => setCode1(e.target.value)}
                                        placeholder="Enter code"
                                        autoComplete="off"
                                        className="w-full bg-white/5 px-5 py-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:bg-white/10"
                                    />
                                </div>

                                <div className="flex overflow-hidden rounded-2xl border border-white/25">
                                    <label
                                        htmlFor="verify-code-2"
                                        className="flex w-28 flex-shrink-0 items-center justify-center bg-white/10 px-2 py-4 text-center text-xs font-bold uppercase tracking-wide text-white"
                                    >
                                        Code 2
                                    </label>
                                    <input
                                        id="verify-code-2"
                                        type="text"
                                        value={code2}
                                        onChange={(e) => setCode2(e.target.value)}
                                        placeholder="Enter code"
                                        autoComplete="off"
                                        className="w-full bg-white/5 px-5 py-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:bg-white/10"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={loading}
                                    className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-[#12306e] shadow-lg disabled:opacity-70"
                                >
                                    {loading ? (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="h-4 w-4 rounded-full border-2 border-[#12306e]/30 border-t-[#12306e]"
                                        />
                                    ) : (
                                        <>
                                            Verify product
                                            <span aria-hidden>→</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-4 py-3.5 text-xs leading-relaxed text-amber-100/90">
                                <span aria-hidden className="mt-0.5">⚠</span>
                                <span>
                                    A code can be verified only once. If it comes back as
                                    already verified, do not use the product — contact us
                                    immediately.
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        variants={rise}
                        className="mt-6 text-center text-xs text-white/50"
                    >
                        Can&apos;t find your code?{" "}
                        <a href="/contact" className="font-medium text-white underline underline-offset-2">
                            Contact support
                        </a>
                    </motion.p>
                </motion.div>
            </div>

            <Footer />

            <VerificationModal
                isOpen={isModalOpen}
                onClose={reset}
                result={result}
                codes={{ code1, code2 }}
            />
        </main>
    );
}