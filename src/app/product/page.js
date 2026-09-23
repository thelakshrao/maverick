"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import styleproduct1 from "@/images/styleproduct1.png";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const oilsOnly = products.filter((p) => p.category === "Oils");

export default function ProductPage() {
    const [selected, setSelected] = useState(null);

    return (
        <main
            data-navbar="dark"
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690]"
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
            <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#5b8def]/30 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[380px] w-[380px] rounded-full bg-[#8fb8ff]/20 blur-3xl" aria-hidden />

            <Navbar />

            <section className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 sm:px-10 md:pt-36">
                {/*
                  Hero content: this is above-the-fold, so it should just animate
                  in on mount rather than waiting on a scroll-triggered
                  IntersectionObserver (whileInView). On mobile, a fresh reload
                  can fire the observer's first check before layout/images have
                  settled, so it never reports "in view" — with `once: true`
                  that permanently leaves the content at opacity: 0.
                */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="mx-auto max-w-2xl text-center"
                >
                    <motion.p
                        variants={rise}
                        className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                    >
                        <span className="h-px w-6 bg-white/30" aria-hidden />
                        Injectable Oils
                        <span className="h-px w-6 bg-white/30" aria-hidden />
                    </motion.p>
                    <motion.h1
                        variants={rise}
                        className="mt-6 text-[36px] font-bold leading-[1.1] text-white sm:text-[44px] md:text-[52px]"
                    >
                        Pharmaceutical-grade{" "}
                        <span className="bg-gradient-to-r from-[#8fb8ff] via-[#a9a0ff] to-[#5b8def] bg-clip-text text-transparent">
                            oil compounds.
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={rise}
                        className="mt-6 text-sm leading-relaxed text-white/60 md:text-base"
                    >
                        Every batch is HPLC-tested for identity, purity, and concentration
                        before release. USP/BP grade raw materials, multi-dose sterile
                        vials, tamper-evident seals.
                    </motion.p>
                </motion.div>

                {/*
                  Product grid: kept as a scroll-reveal (it's further down the
                  page and can genuinely be below the fold), but made far more
                  forgiving so it can't get stuck hidden:
                  - lower `amount` threshold (a sliver visible is enough)
                  - negative bottom margin so the observer fires a little
                    before the grid physically enters the viewport
                  - fallback below: if for any reason the observer never
                    fires within 1.2s of mount (e.g. it missed its initial
                    check on some mobile browsers), we animate in anyway.
                */}
                <ProductsGrid oilsOnly={oilsOnly} onSelect={setSelected} />
            </section>

            <Footer />

            <ProductModal product={selected} onClose={() => setSelected(null)} />
        </main>
    );
}

function ProductsGrid({ oilsOnly, onSelect }) {
    const [forceVisible, setForceVisible] = useState(false);

    return (
        <motion.div
            initial="hidden"
            whileInView={!forceVisible ? "visible" : undefined}
            animate={forceVisible ? "visible" : undefined}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -20% 0px" }}
            variants={container}
            onViewportEnter={() => setForceVisible(true)}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {oilsOnly.map((oil, i) => (
                <motion.div
                    key={oil.id}
                    variants={rise}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    onClick={() => onSelect(oil)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onSelect(oil)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl"
                >
                    <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_0_60px_10px_rgba(139,184,255,0.25)] transition-opacity duration-500 group-hover:opacity-100" />

                    {i === 0 && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
                            className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-[#8fb8ff] to-[#5b8def] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b1a4a] shadow-lg"
                        >
                            Popular
                        </motion.span>
                    )}

                    <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                        <Image
                            src={oil.image}
                            alt={`${oil.name} — ${oil.compound}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-1"
                        />
                    </div>

                    <div className="relative mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8fb8ff]">
                            {oil.dose}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">
                            {oil.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/60">{oil.compound}</p>
                        <p className="mt-3 text-xs text-white/40">{oil.size}</p>
                    </div>

                    <motion.button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/contact?product=${encodeURIComponent(oil.name)}`;
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative mt-5 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white text-sm font-semibold text-[#12306e] shadow-lg transition-transform duration-150 ease-out"
                    >
                        Enquire
                        <span aria-hidden>→</span>
                    </motion.button>
                </motion.div>
            ))}
        </motion.div>
    );
}