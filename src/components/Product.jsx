"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductModal from "@/components/ProductModal";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

const FEATURED_COUNT = 3;

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Deterministic default so server and client render identical markup on
// first paint — no null/skeleton state, so the page never changes height.
const defaultFeatured = products.slice(0, Math.min(FEATURED_COUNT, products.length));

export default function Product() {
    const [featured, setFeatured] = useState(defaultFeatured);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        // Reshuffle client-side after mount — same 3 cards already on
        // screen, just re-ordered, so there's no layout/height change.
        const count = Math.min(FEATURED_COUNT, products.length);
        setFeatured(shuffle(products).slice(0, count));
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#050b2e] via-[#12306e] to-[#274690] py-20 md:py-28">
            <div className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[#5b8def]/25 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#8fb8ff]/20 blur-3xl" aria-hidden />

            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={container}
                    className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
                >
                    <div>
                        <motion.p
                            variants={rise}
                            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-white/50"
                        >
                            <span className="h-px w-6 bg-white/30" aria-hidden />
                            Our Products
                        </motion.p>
                        <motion.h2
                            variants={rise}
                            className="mt-4 max-w-xl text-[32px] font-bold leading-[1.1] text-white sm:text-[40px] md:text-[48px]"
                        >
                            Precision-dosed, batch-tested.
                        </motion.h2>
                    </div>

                    <motion.a
                        variants={rise}
                        href="/product"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex h-12 flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#12306e] shadow-lg transition-transform duration-150 ease-out"
                    >
                        View all products
                        <span aria-hidden>→</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {featured.map((oil) => (
                        <motion.div
                            key={oil.id}
                            variants={rise}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            onClick={() => setSelected(oil)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && setSelected(oil)}
                            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl"
                        >
                            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                                <Image
                                    src={oil.image}
                                    alt={`${oil.name} — ${oil.compound}`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-5 px-2 pb-2">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8fb8ff]">
                                    {oil.dose}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-white">
                                    {oil.name}
                                </h3>
                                <p className="mt-1 text-sm text-white/60">
                                    {oil.compound}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <ProductModal product={selected} onClose={() => setSelected(null)} />
        </section>
    );
}