"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import vial from "../images/styleproduct1.png";

const EASE = [0.16, 1, 0.3, 1];

const RING_MID = "#5b8def";
const RING_LIGHT = "#dbe7ff";
const RING_END = "#3f7ee8";
const SPARKLE = "#cfe0ff";

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

const rand = (i) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
};

const makeSparkles = (count, w, h) =>
    Array.from({ length: count }, (_, i) => {
        const along = rand(i + 1);
        const spread = (rand(i + 50) - 0.5) * h * 0.28;
        return {
            cx: Math.round(w * 0.04 + along * w * 0.92 + (rand(i + 31) - 0.5) * 40),
            cy: Math.round(h * 0.85 - along * h * 0.6 + spread),
            r: Math.round((0.8 + rand(i + 99) * 2.2) * 10) / 10,
            delay: Math.round(rand(i + 7) * 60) / 10,
            dur: Math.round((3 + rand(i + 13) * 4) * 10) / 10,
        };
    });

const DESKTOP = {
    id: "d",
    w: 1200,
    h: 600,
    cx: 300,
    cy: 300,
    sx: 2.05,
    sy: 1.2,
    clip: "M0 600L600 100V600Z",
    sparkles: makeSparkles(90, 1200, 600),
};

const MOBILE = {
    id: "m",
    w: 600,
    h: 520,
    cx: 300,
    cy: 260,
    sx: 1.2,
    sy: 1,
    clip: "M0 520L600 80V520Z",
    sparkles: makeSparkles(40, 600, 520),
};

const RINGS = [
    { rx: 270, ry: 105, rotate: -28, width: 3, speed: 16, offset: 0, dash: 0.5, glow: true },
    { rx: 245, ry: 80, rotate: -46, width: 2.2, speed: 22, offset: 0.35, dash: 0.5, glow: true },
    { rx: 285, ry: 130, rotate: -12, width: 1.6, speed: 28, offset: 0.7, dash: 0.5, glow: true },
    { rx: 290, ry: 60, rotate: -62, width: 2.4, speed: 19, offset: 0.2, dash: 0.35, glow: true },
    { rx: 260, ry: 150, rotate: 8, width: 1.8, speed: 25, offset: 0.55, dash: 0.4, glow: true, reverse: true },
    { rx: 230, ry: 55, rotate: -35, width: 2, speed: 14, offset: 0.9, dash: 0.3, glow: true, reverse: true },
    { rx: 275, ry: 95, rotate: -20, width: 1.1, speed: 11, offset: 0.1, dash: 0.15 },
    { rx: 255, ry: 115, rotate: -55, width: 1, speed: 9, offset: 0.6, dash: 0.12, reverse: true },
    { rx: 295, ry: 75, rotate: -40, width: 0.9, speed: 13, offset: 0.4, dash: 0.18 },
];

function RingLayer({ config, layer, className, preserve }) {
    const { id, w, h, cx, cy, sx, sy, clip, sparkles } = config;
    const isFront = layer === "front";
    const uid = `${id}-${layer}`;
    const clipD = isFront ? clip : `M-5000 -5000H7000V7000H-5000Z ${clip}`;

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio={preserve}
            className={className}
            aria-hidden
        >
            <defs>
                <linearGradient id={`${uid}-grad`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={RING_END} stopOpacity="0" />
                    <stop offset="45%" stopColor={RING_MID} />
                    <stop offset="75%" stopColor={RING_LIGHT} />
                    <stop offset="100%" stopColor={RING_END} stopOpacity="0" />
                </linearGradient>
                <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
                <clipPath id={`${uid}-clip`}>
                    <path d={clipD} clipRule="evenodd" />
                </clipPath>
            </defs>

            <g clipPath={`url(#${uid}-clip)`}>
                <g transform={`translate(${cx} ${cy}) scale(${sx} ${sy}) translate(${-cx} ${-cy})`}>
                    {RINGS.map((ring, i) => {
                        const dashArray = `${ring.dash} ${1 - ring.dash}`;
                        const animStyle = {
                            animationDuration: `${ring.speed}s`,
                            animationDelay: `${-ring.offset * ring.speed}s`,
                            animationDirection: ring.reverse ? "reverse" : "normal",
                        };

                        return (
                            <g key={i} transform={`rotate(${ring.rotate} ${cx} ${cy})`}>
                                {ring.glow && (
                                    <ellipse
                                        className="purity-ring"
                                        cx={cx}
                                        cy={cy}
                                        rx={ring.rx}
                                        ry={ring.ry}
                                        fill="none"
                                        stroke={RING_MID}
                                        strokeWidth={ring.width * 4}
                                        strokeOpacity="0.55"
                                        pathLength="1"
                                        strokeDasharray={dashArray}
                                        strokeLinecap="round"
                                        filter={`url(#${uid}-blur)`}
                                        style={animStyle}
                                    />
                                )}
                                <ellipse
                                    className="purity-ring"
                                    cx={cx}
                                    cy={cy}
                                    rx={ring.rx}
                                    ry={ring.ry}
                                    fill="none"
                                    stroke={`url(#${uid}-grad)`}
                                    strokeWidth={ring.width}
                                    pathLength="1"
                                    strokeDasharray={dashArray}
                                    strokeLinecap="round"
                                    style={animStyle}
                                />
                            </g>
                        );
                    })}
                </g>
            </g>

            {isFront &&
                sparkles.map((s, i) => (
                    <circle
                        key={i}
                        className="purity-sparkle"
                        cx={s.cx}
                        cy={s.cy}
                        r={s.r}
                        fill={SPARKLE}
                        style={{ animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
                    />
                ))}
        </svg>
    );
}

export default function PurityShowcase() {
    const reduced = useReducedMotion();

    return (
        <section className="mx-auto max-w-6xl bg-[#eef1f6] px-4 py-8 md:py-10">
            <style>{`
                @keyframes purity-ring-run { to { stroke-dashoffset: -1; } }
                @keyframes purity-twinkle { 0%, 100% { opacity: 0.15; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.25); } }
                .purity-ring { animation: purity-ring-run linear infinite; }
                .purity-sparkle { transform-box: fill-box; transform-origin: center; animation: purity-twinkle ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .purity-ring, .purity-sparkle { animation: none; }
                }
            `}</style>

            <div
                data-navbar="dark"
                className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690] shadow-[0_30px_70px_-35px_rgba(18,48,110,0.45)]"
            >
                <RingLayer
                    config={DESKTOP}
                    layer="back"
                    preserve="none"
                    className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
                />
                <RingLayer
                    config={MOBILE}
                    layer="back"
                    preserve="xMidYMid slice"
                    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[340px] w-full md:hidden"
                />

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={edgeVariants("left")}
                        className="relative z-[1] h-[340px] md:h-auto md:min-h-[480px]"
                    >
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(63,126,232,0.35),transparent)]" />

                        <motion.div
                            animate={reduced ? undefined : { y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[8%]"
                        >
                            <Image
                                src={vial}
                                alt="Maverick Lab Test-250 vial"
                                fill
                                sizes="(min-width: 768px) 40vw, 90vw"
                                className="object-contain drop-shadow-[0_30px_50px_rgba(5,11,46,0.6)]"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={container}
                        className="relative z-10 flex flex-col justify-center p-8 md:p-14"
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
                            className="mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm"
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
                            href="/quality"
                            variants={edgeVariants("bottom")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 text-xs font-semibold uppercase tracking-wide text-[#12306e] shadow-lg transition-transform duration-150 ease-out active:scale-95 md:text-sm"
                        >
                            See how every batch is verified
                            <span aria-hidden>→</span>
                        </motion.a>
                    </motion.div>
                </div>

                <RingLayer
                    config={DESKTOP}
                    layer="front"
                    preserve="none"
                    className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full md:block"
                />
                <RingLayer
                    config={MOBILE}
                    layer="front"
                    preserve="xMidYMid slice"
                    className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[340px] w-full md:hidden"
                />
            </div>
        </section>
    );
}