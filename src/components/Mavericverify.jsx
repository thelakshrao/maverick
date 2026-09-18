"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VerificationModal from "@/components/VerificationModal";
import athleteWoman from "@/images/styleimage4.webp";
import styleproduct1 from "@/images/styleproduct1.png";

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

const trustPoints = [
    { title: "Instant result", detail: "No waiting, no app install" },
    { title: "Works everywhere", detail: "Any phone, tablet, or desktop" },
    { title: "Lab-linked", detail: "Tied to that unit's actual COA" },
];

export default function MavericVerify() {
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
        <>
            <section
                data-navbar="dark"
                className="relative w-full overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690]"
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
                    className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#5b8def]/30 blur-3xl"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute right-1/3 bottom-0 h-[320px] w-[320px] rounded-full bg-[#8fb8ff]/20 blur-3xl"
                    aria-hidden
                />

                <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={container}
                        className="flex flex-col justify-center px-6 py-20 sm:px-10 md:py-28 lg:px-16 xl:px-24"
                    >
                        <motion.p
                            variants={edgeVariants("top")}
                            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                        >
                            <span className="h-px w-6 bg-white/30" aria-hidden />
                            Maveric Verify
                        </motion.p>

                        <motion.h2
                            variants={edgeVariants("left")}
                            className="mt-6 max-w-lg text-[36px] font-bold leading-[1.1] text-white sm:text-[44px] md:text-[52px]"
                        >
                            Genuine Maveric,{" "}
                            <span className="bg-gradient-to-r from-[#8fb8ff] via-[#a9a0ff] to-[#5b8def] bg-clip-text text-transparent">
                                verified
                            </span>{" "}
                            in seconds.
                        </motion.h2>

                        <motion.p
                            variants={edgeVariants("right")}
                            className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
                        >
                            Every unit ships with two unique verification codes. Enter
                            both right here and know instantly that your product left
                            our lab exactly as labelled.
                        </motion.p>

                        <motion.p
                            variants={edgeVariants("right")}
                            className="mt-4 max-w-md text-sm leading-relaxed text-white/60"
                        >
                            Both codes are checked against our internal batch records in
                            real time — the same records used for that unit's Certificate
                            of Analysis — so a match means the vial in your hand is
                            genuinely ours, tested, and unopened before it reached you.
                            If a code comes back unrecognised or already used, we'll flag
                            it immediately so you can report it.
                        </motion.p>

                        <motion.p
                            variants={edgeVariants("left")}
                            className="mt-4 flex max-w-md items-start gap-2 rounded-xl border border-amber-300/30 bg-amber-200/10 px-4 py-3 text-[13px] leading-relaxed text-amber-100/90"
                        >
                            <span aria-hidden>⚠</span>
                            <span>
                                Each pair of codes can be verified only once. If your
                                codes show as already verified, do not use the product —
                                the seal may have been tampered with. Contact us straight
                                away.
                            </span>
                        </motion.p>

                        <motion.div
                            variants={edgeVariants("bottom")}
                            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
                        >
                            {trustPoints.map((point) => (
                                <div key={point.title} className="border-l-2 border-white/20 pl-3">
                                    <p className="text-sm font-semibold text-white">
                                        {point.title}
                                    </p>
                                    <p className="mt-0.5 text-xs text-white/50">{point.detail}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={edgeVariants("right")}
                        className="relative h-[560px] md:h-auto"
                    >
                        <Image
                            src={athleteWoman}
                            alt="Hand holding a verified Maveric Lab Tesamoreline vial"
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b2e]/80 via-[#050b2e]/10 to-transparent md:bg-gradient-to-r md:from-[#050b2e]/70 md:via-[#050b2e]/10 md:to-transparent" />

                        <motion.div
                            variants={container}
                            className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
                        >
                            <motion.div
                                variants={edgeVariants("bottom")}
                                className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-white/25 bg-[#12306e]/30 p-6 shadow-2xl backdrop-blur-xl"
                            >
                                <form onSubmit={handleSubmit}>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                                        Have your codes on hand?
                                    </p>
                                    <p className="mt-1 text-[13px] text-white/50">
                                        Enter both verification codes below.
                                    </p>

                                    <div className="mt-4 flex overflow-hidden rounded-xl border border-white/20">
                                        <label
                                            htmlFor="verify-code-1"
                                            className="flex w-24 flex-shrink-0 items-center justify-center bg-white/10 px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-white"
                                        >
                                            Code 1
                                        </label>
                                        <input
                                            id="verify-code-1"
                                            type="text"
                                            inputMode="text"
                                            autoComplete="off"
                                            placeholder="Enter code"
                                            value={code1}
                                            onChange={(e) => setCode1(e.target.value)}
                                            className="w-full bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:bg-white/10"
                                        />
                                    </div>

                                    <div className="mt-3 flex overflow-hidden rounded-xl border border-white/20">
                                        <label
                                            htmlFor="verify-code-2"
                                            className="flex w-24 flex-shrink-0 items-center justify-center bg-white/10 px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-white"
                                        >
                                            Code 2
                                        </label>
                                        <input
                                            id="verify-code-2"
                                            type="text"
                                            inputMode="text"
                                            autoComplete="off"
                                            placeholder="Enter code"
                                            value={code2}
                                            onChange={(e) => setCode2(e.target.value)}
                                            className="w-full bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:bg-white/10"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={loading}
                                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-[#12306e] shadow-lg transition-transform duration-150 ease-out disabled:opacity-70"
                                    >
                                        {loading ? "Verifying…" : "Verify product"}
                                    </motion.button>

                                    <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300/25 bg-amber-200/10 px-3 py-2 text-[11px] leading-relaxed text-amber-100/90">
                                        <span aria-hidden>⚠</span>
                                        <span>
                                            Each pair of codes can be verified only
                                            once. If they come back as already
                                            verified, do not use the product — contact
                                            us immediately.
                                        </span>
                                    </p>
                                </form>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section data-navbar="light" className="w-full bg-[#eef1f6]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={container}
                    className="mx-auto flex max-w-3xl flex-col items-center px-6 py-18 text-center sm:px-10 md:py-20"
                >
                    <motion.h2
                        variants={edgeVariants("top")}
                        className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#12306e] sm:text-[44px] md:text-[52px]"
                    >
                        Partner with Maveric.
                    </motion.h2>

                    <motion.p
                        variants={edgeVariants("bottom")}
                        className="mt-6 max-w-2xl text-base leading-relaxed text-[#12306e]/70 md:text-lg"
                    >
                        We collaborate with academic institutions, biotech innovators, and
                        patient communities to bring transformative medicines to the world.
                        We also work with established pharmaceutical vendors looking to
                        become official Maveric stockists.
                    </motion.p>

                    <motion.div
                        variants={edgeVariants("bottom")}
                        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
                    >
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#12306e] px-8 text-sm font-semibold text-white shadow-lg transition-transform duration-150 ease-out"
                        >
                            Get in touch
                        </motion.a>

                        <motion.a
                            href="/about"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex h-12 items-center justify-center rounded-full border border-[#12306e]/15 bg-white px-8 text-sm font-semibold text-[#12306e] shadow-sm transition-transform duration-150 ease-out"
                        >
                            About Maveric
                        </motion.a>
                    </motion.div>
                </motion.div>
            </section>

            <VerificationModal
                isOpen={isModalOpen}
                onClose={reset}
                result={result}
                codes={{ code1, code2 }}
            />
        </>
    );
}