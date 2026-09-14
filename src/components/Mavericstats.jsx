"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import man1 from "@/images/man1.png";
import styleproduct1 from "@/images/styleproduct1.png";
import logo from "@/images/logo.png";

const EASE = [0.16, 1, 0.3, 1];

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
        visible: (i = 0) => ({
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.65, ease: EASE, delay: 0.15 + i * 0.12 },
        }),
    };
}

function CoaIcon() {
    return (
        <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="white" strokeOpacity="0.8" strokeWidth="1.4" />
            <rect x="19" y="1" width="8" height="8" rx="1.5" stroke="white" strokeOpacity="0.8" strokeWidth="1.4" />
            <rect x="1" y="19" width="8" height="8" rx="1.5" stroke="white" strokeOpacity="0.8" strokeWidth="1.4" />
            <rect x="12.5" y="12.5" width="3" height="3" fill="white" fillOpacity="0.85" />
            <path
                d="M18 20.5L20.2 22.7L24.5 18"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const allStats = [
    { edge: "left", value: "99%+", title: "Purity", detail: "Tested for quality & consistency" },
    {
        edge: "top",
        value: "50+",
        title: "Performance Products",
        detail: "Peptides · Recovery · Performance · Research",
    },
    { edge: "bottom", value: "+", title: "Lab Tested", detail: "Verified for quality" },
    { edge: "right", icon: true, title: "Batch Verified", detail: "Scan · Verify · Track" },
];

const cornerClass = [
    "rounded-tl-3xl",
    "rounded-tr-3xl",
    "rounded-bl-3xl",
    "rounded-br-3xl",
];

export default function MaverickStats() {
    return (
        <div data-navbar="light" className="w-full max-w-6xl mx-auto">
            {/* heading, outside the box on every breakpoint */}
            <motion.div
                initial={{ opacity: 0, y: -32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 1.4, ease: EASE }}
                className="text-center mb-5 px-4"
            >
                <h3 className="text-lg md:text-xl font-bold mb-1 text-[#12306e]">
                    Why Choose Maveric Lab
                </h3>
                <p className="text-xs md:text-sm text-[#12306e]/70 leading-relaxed">
                    Every batch tested, verified, and traceable — precision you can trust.
                </p>
                <p className="text-xs md:text-sm text-[#12306e]/60 leading-relaxed mt-1 max-w-2xl mx-auto">
                    From raw material sourcing to final packaging, every step is documented
                    and independently verified — so what's on the label is exactly what's
                    in the vial.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-[10px] md:text-xs font-medium uppercase tracking-wide text-[#12306e]/50">
                    <span>Third-Party Tested</span>
                    <span className="hidden sm:inline">•</span>
                    <span>cGMP Compliant</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Full COA on Request</span>
                </div>
            </motion.div>

            {/* ===================== MOBILE: cards only, no box, no man ===================== */}
            <div data-navbar="dark" className="md:hidden grid grid-cols-2 px-4 pb-8">
                {allStats.map((s, i) => {
                    const col = i % 2;
                    const row = Math.floor(i / 2);
                    return (
                        <motion.div
                            key={s.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
                            variants={edgeVariants(s.edge)}
                            whileTap={{ scale: 0.97 }}
                            className={`relative overflow-hidden bg-[#12306e] p-5 h-40 flex flex-col justify-center ${cornerClass[i]}`}
                        >
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${styleproduct1.src})`,
                                    backgroundSize: "200% 200%",
                                    backgroundPosition: `${col * 100}% ${row * 100}%`,
                                    backgroundRepeat: "no-repeat",
                                }}
                            />

                            <div className="relative z-10 text-white">
                                {s.icon ? (
                                    <CoaIcon />
                                ) : (
                                    <div className="text-2xl font-bold leading-none">{s.value}</div>
                                )}
                                <div className="text-xs font-semibold mt-2">{s.title}</div>
                                <div className="text-[10px] opacity-75 mt-1">{s.detail}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ===================== DESKTOP: original rounded section with man ===================== */}
            <section
                data-navbar="dark"
                className="
          hidden md:flex relative w-full overflow-hidden
          rounded-[32px] mb-14
          md:h-[25vh]
          bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#3f7ee8]
        "
            >
                <div className="absolute inset-0 h-full overflow-hidden">
                    <Image
                        src={styleproduct1}
                        alt=""
                        fill
                        className="object-contain object-[5%_bottom] opacity-40"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0 z-[1]"
                    >
                        <Image
                            src={man1}
                            alt=""
                            fill
                            className="object-contain object-[5%_bottom]"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 0.18, scale: 1 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="absolute top-5 right-5 w-[50px] h-[50px] z-[2]"
                >
                    <Image src={logo} alt="" fill className="object-contain" />
                </motion.div>

                <div
                    className="
            relative w-full h-full z-[2]
            absolute inset-y-0 right-0 w-[62%]
            flex items-center justify-end pr-14
          "
                >
                    <div className="flex flex-nowrap justify-center gap-3">
                        {allStats.map((s, i) => (
                            <motion.div
                                key={s.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
                                variants={edgeVariants(s.edge)}
                                whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.5)" }}
                                className="
                  flex-none w-36 h-32 p-4
                  bg-white/[0.08] border border-white/[0.28] rounded-xl
                  text-white backdrop-blur-sm
                  flex flex-col justify-center
                "
                            >
                                {s.icon ? (
                                    <CoaIcon />
                                ) : (
                                    <div className="text-xl font-bold leading-none">{s.value}</div>
                                )}
                                <div className="text-[11px] font-semibold mt-1">{s.title}</div>
                                <div className="text-[9px] opacity-75 mt-1">{s.detail}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}