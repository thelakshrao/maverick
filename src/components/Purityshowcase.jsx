"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const rangeVideo = "/videos/animationvid.mp4";

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

export default function PurityShowcase() {
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const v = videoRef.current;
        const section = sectionRef.current;
        if (!v || !section) return;

        v.muted = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasPlayed) {
                    v.play().catch(() => { });
                    setHasPlayed(true);
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [hasPlayed]);

    return (
        <section ref={sectionRef} className="mx-auto max-w-6xl bg-[#eef1f6] px-4 py-8 md:py-10">
            <div
                data-navbar="dark"
                className="grid grid-cols-1 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690] shadow-[0_30px_70px_-35px_rgba(18,48,110,0.45)] md:grid-cols-2"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={edgeVariants("left")}
                    className="relative h-[280px] md:h-auto md:min-h-[480px]"
                >
                    <video
                        ref={videoRef}
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
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={container}
                    className="flex flex-col justify-center p-8 md:p-14"
                >
                    <motion.p
                        variants={edgeVariants("top")}
                        className="text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                    >
                        Our Range
                    </motion.p>

                    <motion.h2
                        variants={edgeVariants("left")}
                        className="mt-4 text-[30px] font-bold leading-tight text-white md:text-[38px]"
                    >
                        Lab-verified purity in{" "}
                        <span className="bg-gradient-to-r from-[#5b8def] to-[#8fb8ff] bg-clip-text text-transparent">
                            every
                        </span>{" "}
                        batch.
                    </motion.h2>

                    <motion.p
                        variants={edgeVariants("right")}
                        className="mt-5 max-w-md text-sm leading-relaxed text-white/70"
                    >
                        Precision-dosed products formulated for real protocols. Every batch
                        is independently HPLC-analysed to confirm identity, assay, and
                        purity — so what&apos;s on the label is what&apos;s inside, every
                        time.
                    </motion.p>

                    <motion.div
                        variants={edgeVariants("bottom")}
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
                                whileInView={{ width: "99.9%" }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
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
                        variants={edgeVariants("bottom")}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 text-xs font-semibold uppercase tracking-wide text-[#12306e] shadow-lg md:text-sm transition-transform duration-150 ease-out active:scale-95"
                    >
                        See how every batch is verified
                        <span aria-hidden>→</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}