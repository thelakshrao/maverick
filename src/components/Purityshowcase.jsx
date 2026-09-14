"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const rangeVideo = "/videos/animationvid.mp4";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function PurityShowcase() {
    const videoRef = useRef(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.play().catch(() => { });
    }, []);

    return (
        <section className="mx-auto max-w-6xl px-4 py-8 md:py-10">
            <div data-navbar="dark" className="grid grid-cols-1 overflow-hidden rounded-[32px] bg-[#0a1230] shadow-[0_30px_70px_-35px_rgba(18,48,110,0.35)] md:grid-cols-2">
                {/* video — plays once, no loop, so it naturally holds on the last frame */}
                <div className="relative h-[280px] bg-[#0a1230] md:h-auto md:min-h-[480px]">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        onError={() =>
                            console.error(
                                "PurityShowcase: couldn't load",
                                rangeVideo,
                                "— check the file exists at public/videos/animationvid.mp4"
                            )
                        }
                        className="h-full w-full object-cover"
                    >
                        <source src={rangeVideo} type="video/mp4" />
                    </video>
                </div>

                {/* copy — dark panel, animates in on mount rather than waiting on the video */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="flex flex-col justify-center bg-[#0a1230] p-8 md:p-14"
                >
                    <motion.p
                        variants={rise}
                        className="text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                    >
                        Our Range
                    </motion.p>

                    <motion.h2
                        variants={rise}
                        className="mt-4 text-[30px] font-bold leading-tight text-white md:text-[38px]"
                    >
                        Lab-verified purity in{" "}
                        <span className="bg-gradient-to-r from-[#5b8def] to-[#8fb8ff] bg-clip-text text-transparent">
                            every
                        </span>{" "}
                        batch.
                    </motion.h2>

                    <motion.p
                        variants={rise}
                        className="mt-5 max-w-md text-sm leading-relaxed text-white/60"
                    >
                        Precision-dosed products formulated for real protocols. Every batch
                        is independently HPLC-analysed to confirm identity, assay, and
                        purity — so what&apos;s on the label is what&apos;s inside, every
                        time.
                    </motion.p>

                    <motion.div
                        variants={rise}
                        className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                                Lab-Verified Purity
                            </span>
                            <span className="text-2xl font-bold text-white">99.9%</span>
                        </div>

                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99.9%" }}
                                transition={{ duration: 1, ease: EASE, delay: 0.6 }}
                                className="h-full rounded-full bg-gradient-to-r from-[#5b8def] to-[#8fb8ff]"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                            <span className="flex items-center gap-1.5 font-medium text-white">
                                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#8fb8ff]">
                                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Independently verified
                            </span>
                            <span>Third-party HPLC analysis</span>
                        </div>
                    </motion.div>

                    <motion.a
                        href="#"
                        variants={rise}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 text-xs font-semibold uppercase tracking-wide text-[#0a1230] shadow-lg md:text-sm"
                    >
                        See how every batch is verified
                        <span aria-hidden>→</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}