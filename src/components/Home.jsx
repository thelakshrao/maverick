"use client";

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

export default function Home() {
    const reducedMotion = useReducedMotion();

    return (
        <>
            <main className="min-h-screen bg-[#eef1f6]">

                {/* ===================== DESKTOP ===================== */}
                <div data-navbar="dark" className="relative hidden md:block h-180 w-full overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8]">

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#5b8def]/40 blur-3xl"
                    />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ delay: 0.1 }}
                        className="pointer-events-none absolute left-10 bottom-0 h-[320px] w-[320px] rounded-full bg-[#8fb8ff]/30 blur-3xl"
                    />

                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white via-white/70 to-transparent" />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={scaleIn}
                        transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
                        className="pointer-events-none absolute -right-0 -bottom-[3%] h-[58%] w-[380px]"
                    >
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/50 blur-2xl scale-90" />
                        <Image
                            src={heroProduct}
                            alt="Maveric Lab Tesamoreline 10mg"
                            fill
                            priority
                            sizes="380px"
                            className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
                        />
                    </motion.div>

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

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={container(0.14, 0.4)}
                        className="absolute left-10 top-70 bottom-10 w-[430px] flex flex-col justify-between font-sans"
                    >
                        <div>
                            <motion.p
                                variants={fromLeft}
                                className="text-xs font-medium uppercase tracking-[0.2em] text-white/70"
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
                                className="mt-5 text-base leading-relaxed text-white/70"
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

                    <motion.div
                        initial={{ opacity: 0, x: "-50%", y: 40, scale: 1.08 }}
                        animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                        className="absolute inset-y-0 left-1/2 w-[52%] flex items-end justify-center overflow-hidden"
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
                    </motion.div>

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