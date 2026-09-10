"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import hero1 from "../images/hero1.png";
import heroProduct from "../images/heroproduct.png";
import Navbar from "@/components/Navbar";

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

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const ticking = useRef(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const t = setTimeout(() => setMounted(true), 50);

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearTimeout(t);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    const bgOffset = reducedMotion ? 0 : scrollY * 0.03;
    const girlOffset = reducedMotion ? 0 : scrollY * 0.08;
    const cardOffset = reducedMotion ? 0 : scrollY * 0.14;

    const enter = (delayMs, distance = 16) => ({
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 700ms ease-out ${delayMs}ms, transform 700ms ease-out ${delayMs}ms`,
    });

    return (
        <main className="min-h-screen bg-[#eef1f6] flex items-start md:items-center justify-center p-4 md:p-6">

            {/* ===================== DESKTOP (unchanged) ===================== */}
            <div className="relative hidden md:block h-180 w-full max-w-[1400px] aspect-[16/9] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8]">

                <Navbar />
                <div
                    className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#5b8def]/40 blur-3xl"
                    style={{
                        transform: `translateY(${bgOffset}px)`,
                        opacity: mounted ? 1 : 0,
                        transition: "opacity 900ms ease-out",
                    }}
                />
                <div
                    className="pointer-events-none absolute left-10 bottom-0 h-[320px] w-[320px] rounded-full bg-[#8fb8ff]/30 blur-3xl"
                    style={{
                        transform: `translateY(${bgOffset * -1}px)`,
                        opacity: mounted ? 1 : 0,
                        transition: "opacity 900ms ease-out 100ms",
                    }}
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white via-white/70 to-transparent" />

                <div
                    className="pointer-events-none absolute -right-0 -bottom-[3%] h-[58%] w-[380px]"
                    style={{
                        opacity: mounted ? 0.85 : 0,
                        transform: mounted
                            ? `translateY(${bgOffset * 0.6}px) scale(1)`
                            : "translateY(20px) scale(0.96)",
                        transition: "opacity 900ms ease-out 400ms, transform 900ms ease-out 400ms",
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-white/50 blur-2xl scale-90" />
                    <Image
                        src={heroProduct}
                        alt="Maveric Lab Tesamoreline 10mg"
                        fill
                        sizes="380px"
                        className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
                    />
                </div>

                <div className="absolute left-10 top-50 z-20 flex items-center gap-2" style={enter(300)}>
                    <span className="text-7xl font-black tracking-[0.12em] text-white drop-shadow-md">
                        MAVERICK
                    </span>
                </div>

                <div className="absolute left-10 top-70 bottom-10 w-[430px] flex flex-col justify-between font-sans">
                    <div>
                        <p
                            className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
                            style={enter(500)}
                        >
                            Advanced Peptide Therapy
                        </p>

                        <h1
                            className="mt-4 text-[44px] leading-[1.05] text-white"
                            style={enter(600)}
                        >
                            <span className="font-light">Optimize today.</span>
                            <br />
                            <span className="font-bold">Perform tomorrow.</span>
                        </h1>

                        <p
                            className="mt-5 text-base leading-relaxed text-white/70"
                            style={enter(700)}
                        >
                            Pure. Precise. Performance driven.
                            <br />
                            Unlock your body&apos;s full potential.
                        </p>
                    </div>

                    <div>
                        <div
                            className="flex items-start gap-5 text-white"
                            style={{ ...enter(800), transform: `${enter(800).transform} translateY(${cardOffset}px)` }}
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
                        </div>

                        <button
                            className="mt-8 flex h-14 w-56 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg cursor-pointer transition-transform duration-150 ease-out active:scale-95"
                            style={{ ...enter(900), transform: `${enter(900).transform} translateY(${cardOffset}px)` }}
                        >
                            Explore Products
                            <span aria-hidden>→</span>
                        </button>
                    </div>
                </div>

                <div
                    className="absolute inset-y-0 left-1/2 w-[52%] flex items-end justify-center overflow-hidden"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted
                            ? `translate(-50%, ${girlOffset}px) scale(1)`
                            : "translate(-50%, 40px) scale(1.08)",
                        transition: "opacity 900ms ease-out 200ms, transform 900ms ease-out 200ms",
                    }}
                >
                    {!reducedMotion && (
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <span className="wind-streak wind-streak-1" />
                            <span className="wind-streak wind-streak-2" />
                            <span className="wind-streak wind-streak-3" />
                        </div>
                    )}

                    <div className="pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2 h-6 w-[55%] rounded-full bg-black/20 blur-xl" />

                    <div className="relative h-[88%] w-full">
                        <Image
                            src={hero1}
                            alt=""
                            fill
                            priority
                            sizes="52vw"
                            className="object-contain object-bottom"
                        />
                    </div>
                </div>

            </div>

            {/* ===================== MOBILE (text order updated to match reference) ===================== */}
            <div className="md:hidden relative w-full max-w-[440px] mx-auto rounded-[28px] overflow-hidden bg-gradient-to-b from-[#050b2e] via-[#12306e] to-[#3f7ee8]">

                <div
                    className="pointer-events-none absolute -inset-10 z-0"
                    style={{
                        opacity: mounted ? 0.22 : 0,
                        transition: "opacity 1200ms ease-out 300ms",
                    }}
                >
                    <Image
                        src={heroProduct}
                        alt=""
                        fill
                        sizes="500px"
                        className="object-contain object-center"
                    />
                </div>

                <Navbar />

                <div
                    className="pointer-events-none absolute -left-16 top-24 h-[220px] w-[220px] rounded-full bg-[#5b8def]/30 blur-3xl z-[1]"
                    style={{ opacity: mounted ? 1 : 0, transition: "opacity 900ms ease-out" }}
                />

                <div className="relative z-10 flex flex-col items-start px-4 pt-24 pb-0 font-sans text-left">
                    <p
                        className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
                        style={enter(300)}
                    >
                        Advanced Peptide Therapy
                    </p>

                    <span
                        className="mt-4 text-5xl font-black tracking-[0.1em] text-white drop-shadow-md"
                        style={enter(450)}
                    >
                        MAVERICK
                    </span>

                    <h1 className="mt-5 text-[34px] leading-[1.1] text-white" style={enter(550)}>
                        <span className="font-light">Optimize today.</span>
                        <br />
                        <span className="font-bold">Perform tomorrow.</span>
                    </h1>

                    <p className="mt-4 text-base leading-relaxed text-white/70" style={enter(650)}>
                        Pure. Precise. Performance driven.
                        <br />
                        Unlock your body&apos;s full potential.
                    </p>
                </div>

                {/* Hero image, flush with the bottom of the card — pills + button overlaid on top of it */}
                <div
                    className="relative z-10 mt-6 h-[320px] w-full"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0) scale(1)" : "translateY(20px) scale(1.05)",
                        transition: "opacity 900ms ease-out 200ms, transform 900ms ease-out 200ms",
                    }}
                >
                    <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-[60%] rounded-full bg-black/20 blur-lg" />
                    {/* -inset-x-8 makes the image render bigger than its column width without affecting layout */}
                    <div className="absolute -inset-x-8 inset-y-0">
                        <Image
                            src={hero1}
                            alt=""
                            fill
                            priority
                            sizes="780px"
                            className="object-contain object-bottom"
                        />
                    </div>

                    {/* Feature row — icon over two-line label, with vertical dividers, matching desktop style */}
                    <div
                        className="absolute left-4 right-4 bottom-28 z-20 flex items-start justify-between text-white"
                        style={enter(750)}
                    >
                        {FEATURES.map((f, i) => (
                            <div key={f.label} className="flex items-start">
                                <div className="flex flex-col items-center gap-2 text-center [&_svg]:h-7 [&_svg]:w-7">
                                    {f.icon}
                                    <span className="text-sm font-bold uppercase tracking-wide leading-tight">
                                        {f.label.split(" ").map((word, wi) => (
                                            <span key={wi}>
                                                {word}
                                                {wi < f.label.split(" ").length - 1 && <br />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                                {i < FEATURES.length - 1 && (
                                    <div className="mx-4 mt-3.5 h-9 w-px bg-white/25" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Explore Products button — overlaid near the bottom of the image, not pushing it down */}
                    <div
                        className="absolute inset-x-4 bottom-6 z-20 flex justify-center"
                        style={enter(850)}
                    >
                        <button className="flex h-13 w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold uppercase tracking-wide text-[#12306e] shadow-lg cursor-pointer transition-transform duration-150 ease-out active:scale-95">
                            Explore Products
                            <span aria-hidden>→</span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .idle-breathe {
          animation: breathe 5s ease-in-out infinite;
          animation-delay: 1.2s;
          transform-origin: center bottom;
        }
        @keyframes breathe {
          0% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.006) translateY(-2px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

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

        @media (prefers-reduced-motion: reduce) {
          .idle-breathe {
            animation: none;
          }
        }
      `}</style>
        </main>
    );
}