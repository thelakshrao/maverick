"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import hero1 from "../images/hero1.png";
import heroProduct from "../images/heroproduct.png";

const EASE = [0.16, 1, 0.3, 1];

const container = (stagger = 0.12, delay = 0.15) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const fromTop = {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fromBottom = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fromLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fromRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const FEATURES = [
    {
        label: "Lean Muscle",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.2 19.5c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c1.1 0 2.1.4 2.9 1M10.1 11.1 15.3 4" />
                <path d="M15.3 4c.9-.9 2.3-.9 3.1 0 .9.9.9 2.3 0 3.1L13.3 12" />
            </svg>
        ),
    },
    {
        label: "Fat Loss",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c1 3-2 4-2 7a3 3 0 1 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a6 6 0 1 1-12 0c0-4 3-6 6-9z" />
            </svg>
        ),
    },
    {
        label: "Metabolic Health",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" />
                <path d="M12 8v4l3 2" />
            </svg>
        ),
    },
];

const TOTAL_FRAMES = 180;
const PRIORITY_FRAMES = 25;

const getFrameUrl = (index) =>
    `/hero-sequence/ezgif-frame-${String(index).padStart(3, "0")}.webp`;

export default function Home() {
    const reducedMotion = useReducedMotion();

    const desktopWrapperRef = useRef(null);
    const stickyContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef(new Map());
    const currentFrameRef = useRef(1);
    const [, setInitialReady] = useState(false);

    const drawFrame = useCallback((targetIndex) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // Find exact target frame or nearest loaded frame
        let img = imagesRef.current.get(targetIndex);
        if (!img || !img.complete || img.naturalWidth === 0) {
            let nearestIndex = null;
            let minDistance = Infinity;
            for (const [idx, loadedImg] of imagesRef.current.entries()) {
                if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
                    const dist = Math.abs(idx - targetIndex);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestIndex = idx;
                    }
                }
            }
            if (nearestIndex !== null) {
                img = imagesRef.current.get(nearestIndex);
            }
        }

        if (!img || !img.complete || img.naturalWidth === 0) return;

        currentFrameRef.current = targetIndex;

        const cw = canvas.width;
        const ch = canvas.height;
        if (!cw || !ch) return;

        // object-fit: cover math
        const imgW = img.naturalWidth || 1920;
        const imgH = img.naturalHeight || 1080;
        const imgAspect = imgW / imgH;
        const canvasAspect = cw / ch;

        let drawW, drawH, drawX, drawY;
        if (canvasAspect > imgAspect) {
            drawW = cw;
            drawH = cw / imgAspect;
            drawX = 0;
            drawY = (ch - drawH) / 2;
        } else {
            drawH = ch;
            drawW = ch * imgAspect;
            drawX = (cw - drawW) / 2;
            drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = stickyContainerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetW = Math.round(rect.width * dpr);
        const targetH = Math.round(rect.height * dpr);

        if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
        }

        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    const updateFrameFromScroll = useCallback(() => {
        const wrapper = desktopWrapperRef.current;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        if (scrollDistance <= 0) return;

        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / scrollDistance, 0), 1);
        const targetFrame = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
        );

        if (targetFrame !== currentFrameRef.current) {
            drawFrame(targetFrame);
        }
    }, [drawFrame]);

    // Scroll & resize listeners throttled with requestAnimationFrame
    useEffect(() => {
        let rafId = null;

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                updateFrameFromScroll();
            });
        };

        const onResize = () => {
            resizeCanvas();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        updateFrameFromScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [updateFrameFromScroll, resizeCanvas]);

    // Progressive priority image loading
    useEffect(() => {
        let isMounted = true;

        const loadSingleFrame = (index) => {
            return new Promise((resolve) => {
                if (imagesRef.current.has(index)) {
                    resolve(imagesRef.current.get(index));
                    return;
                }
                const img = new window.Image();
                img.src = getFrameUrl(index);
                img.onload = () => {
                    if (!isMounted) return;
                    imagesRef.current.set(index, img);
                    if (index === 1 || index === currentFrameRef.current) {
                        drawFrame(currentFrameRef.current);
                    }
                    resolve(img);
                };
                img.onerror = () => {
                    resolve(null);
                };
            });
        };

        // 1. Preload & paint frame 1 immediately
        loadSingleFrame(1).then(() => {
            if (!isMounted) return;
            resizeCanvas();
            drawFrame(1);
            setInitialReady(true);
        });

        // Eagerly preload frame 180 (final frame) immediately after frame 1
        loadSingleFrame(TOTAL_FRAMES);

        // 2. Eagerly load priority batch (frames 2 to 25)
        const priorityPromises = [];
        for (let i = 2; i <= PRIORITY_FRAMES; i++) {
            priorityPromises.push(loadSingleFrame(i));
        }

        // 3. Asynchronously load remaining frames (26 to 180) in background
        Promise.all(priorityPromises).then(() => {
            if (!isMounted) return;

            let nextIdx = PRIORITY_FRAMES + 1;
            const CHUNK_SIZE = 16;

            const loadNextChunk = () => {
                if (!isMounted || nextIdx > TOTAL_FRAMES) return;
                const chunk = [];
                for (let c = 0; c < CHUNK_SIZE && nextIdx <= TOTAL_FRAMES; c++, nextIdx++) {
                    chunk.push(loadSingleFrame(nextIdx));
                }
                Promise.all(chunk).then(() => {
                    if (!isMounted) return;
                    if (nextIdx <= TOTAL_FRAMES) {
                        if ("requestIdleCallback" in window) {
                            window.requestIdleCallback(loadNextChunk, { timeout: 1200 });
                        } else {
                            setTimeout(loadNextChunk, 40);
                        }
                    }
                });
            };

            loadNextChunk();
        });

        return () => {
            isMounted = false;
        };
    }, [drawFrame, resizeCanvas]);

    // Responsive container resize observer
    useEffect(() => {
        const container = stickyContainerRef.current;
        if (!container || typeof ResizeObserver === "undefined") return;

        const ro = new ResizeObserver(() => {
            resizeCanvas();
        });
        ro.observe(container);

        return () => ro.disconnect();
    }, [resizeCanvas]);

    return (
        <>
            <link
                rel="preload"
                href="/hero-sequence/ezgif-frame-001.webp"
                as="image"
                type="image/webp"
            />
            <main className="min-h-screen bg-[#eef1f6]">

                {/* ===================== DESKTOP ===================== */}
                <div
                    ref={desktopWrapperRef}
                    className="relative hidden md:block h-[170vh] w-full"
                >
                    <div
                        ref={stickyContainerRef}
                        data-navbar="dark"
                        className="sticky top-0 h-screen w-full overflow-hidden bg-[#050b2e]"
                    >
                        {/* Scroll-driven canvas background */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 h-full w-full pointer-events-none object-cover"
                        />

                        {/* Brand gradient and contrast overlays to protect left-aligned text legibility */}
                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#050b2e] via-[#050b2e]/90 via-35% to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 z-10 bg-gradient-to-b from-[#050b2e]/90 via-[#050b2e]/50 to-transparent" />
                        <div className="pointer-events-none absolute left-0 top-1/4 h-[480px] w-[480px] rounded-full bg-[#3f7ee8]/15 blur-3xl z-10" />

                        {/* MAVERICK Wordmark */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fromTop}
                            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
                            className="absolute left-10 top-50 z-20 flex items-center gap-2"
                        >
                            <span className="text-7xl font-black tracking-[0.12em] text-white drop-shadow-md">
                                MAVERICK
                            </span>
                        </motion.div>

                        {/* Left-anchored Text & UI block */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={container(0.14, 0.4)}
                            className="absolute left-10 top-70 bottom-10 w-[430px] flex flex-col justify-between font-sans z-20"
                        >
                            <div>
                                <motion.p
                                    variants={fromLeft}
                                    className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5b8def] drop-shadow-sm"
                                >
                                    Advanced Peptide Therapy
                                </motion.p>

                                <h1 className="mt-4 text-[44px] leading-[1.05] text-white">
                                    <motion.span variants={fromLeft} className="block font-light">
                                        Optimize today.
                                    </motion.span>
                                    <motion.span variants={fromRight} className="block font-bold">
                                        Perform tomorrow.
                                    </motion.span>
                                </h1>

                                <motion.p
                                    variants={fromBottom}
                                    className="mt-5 text-lg leading-relaxed text-white/70"
                                >
                                    Pure. Precise. Performance driven.
                                    <br />
                                    Unlock your body&apos;s full potential.
                                </motion.p>
                            </div>

                            <div>
                                <motion.div
                                    variants={fromBottom}
                                    className="flex items-start gap-5 text-white"
                                >
                                    <div className="flex flex-col items-start gap-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6.5 18.5 L4.5 15.5 M4.5 15.5 H8 L7 18.5 Z M7 14 C7 10 9 6 12.5 6 C16 6 17.5 9 16 12 C14.5 15 15 17 18.5 18" />
                                        </svg>

                                        <span className="text-xs font-medium uppercase tracking-wide leading-tight">
                                            Lean
                                            <br />
                                            Muscle
                                        </span>
                                    </div>
                                    <div className="mt-3 h-8 w-px bg-white/25" />
                                    <div className="flex flex-col items-start gap-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="1.5">
                                            <path d="M12 3c1 3-2 4-2 7a3 3 0 1 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a6 6 0 1 1-12 0c0-4 3-6 6-9z" />
                                        </svg>
                                        <span className="text-xs font-medium uppercase tracking-wide leading-tight">
                                            Fat
                                            <br />
                                            Loss
                                        </span>
                                    </div>
                                    <div className="mt-3 h-8 w-px bg-white/25" />
                                    <div className="flex flex-col items-start gap-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="white" strokeWidth="1.5">
                                            <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" />
                                            <path d="M12 8v4l3 2" />
                                        </svg>
                                        <span className="text-xs font-medium uppercase tracking-wide leading-tight">
                                            Metabolic
                                            <br />
                                            Health
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.button
                                    variants={fromBottom}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-8 flex h-14 w-56 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg cursor-pointer"
                                >
                                    Explore Products
                                    <span aria-hidden>→</span>
                                </motion.button>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* ===================== MOBILE ===================== */}
                <div data-navbar="dark" className="md:hidden relative w-full overflow-hidden bg-gradient-to-b from-[#050b2e] via-[#12306e] to-[#3f7ee8]">

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.3, duration: 1.2 }}
                        className="pointer-events-none absolute -inset-10 z-0 opacity-[0.04]"
                    >
                        <Image
                            src={heroProduct}
                            alt=""
                            fill
                            sizes="500px"
                            className="object-contain object-center"
                        />
                    </motion.div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[420px] bg-gradient-to-b from-[#050b2e] via-[#050b2e]/85 to-transparent" />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="pointer-events-none absolute -left-16 top-24 h-[220px] w-[220px] rounded-full bg-[#5b8def]/30 blur-3xl z-[1]"
                    />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={container(0.12, 0.2)}
                        className="relative z-10 flex flex-col items-start px-4 pt-24 pb-10 font-sans text-left"
                    >
                        <motion.p
                            variants={fromLeft}
                            className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
                        >
                            Advanced Peptide Therapy
                        </motion.p>

                        <motion.span
                            variants={fromTop}
                            className="mt-4 text-5xl font-black tracking-[0.1em] text-white drop-shadow-md"
                        >
                            MAVERICK
                        </motion.span>

                        <h1 className="mt-5 text-[34px] leading-[1.1] text-white">
                            <motion.span variants={fromLeft} className="block font-light">
                                Optimize today.
                            </motion.span>
                            <motion.span variants={fromRight} className="block font-bold">
                                Perform tomorrow.
                            </motion.span>
                        </h1>

                        <motion.p
                            variants={fromBottom}
                            className="mt-4 text-base leading-relaxed text-white/70"
                        >
                            Pure. Precise. Performance driven.
                            <br />
                            Unlock your body&apos;s full potential.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 1.05 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                        className="relative z-10 mt-4 h-[380px] w-full"
                    >
                        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-[60%] rounded-full bg-black/20 blur-lg" />
                        <div className="absolute -inset-x-8 inset-y-0">
                            <Image
                                src={hero1}
                                alt=""
                                fill
                                priority
                                sizes="480px"
                                className="object-contain object-bottom"
                            />
                        </div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fromBottom}
                            transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
                            className="absolute left-4 right-4 bottom-28 z-20 flex items-center justify-between text-white"
                        >
                            {FEATURES.map((f, i) => (
                                <div key={f.label} className="flex items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wide leading-tight whitespace-nowrap">
                                        {f.label}
                                    </span>
                                    {i < FEATURES.length - 1 && (
                                        <div className="mx-3 h-3 w-px bg-white/25" />
                                    )}
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fromBottom}
                            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
                            className="absolute inset-x-4 bottom-6 z-20 flex justify-center"
                        >
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="flex h-13 w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg cursor-pointer"
                            >
                                Explore Products
                                <span aria-hidden>→</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                <style jsx>{`
        .wind-streak {
          position: absolute;
          top: 30%;
          height: 2px;
          width: 40%;
          border-radius: 9999px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          animation: wind-move 3.5s ease-in-out infinite;
        }
        .wind-streak-1 {
          top: 20%;
          left: -10%;
          animation-delay: 0s;
        }
        .wind-streak-2 {
          top: 45%;
          left: -20%;
          width: 55%;
          animation-delay: 1.1s;
        }
        .wind-streak-3 {
          top: 65%;
          left: -15%;
          width: 35%;
          animation-delay: 2.2s;
        }
        @keyframes wind-move {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(220%);
            opacity: 0;
          }
        }
      `}</style>
            </main>
        </>
    );
}